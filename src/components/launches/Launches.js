import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { getLaunches } from '../../state/launch';
import {
  filterFailedLaunches,
  filterLaunchesWithLandingIntent,
  filterLaunchesWithoutLandingIntent,
  filterSuccessfulLaunches
} from '../../utils/launchUtils';
import Loading from '../Loading';
import LaunchList from './LauchList';
import LaunchBulletChart from './LaunchBulletChart';
import LaunchPieChart from './LaunchPieChart';

const Root = styled.div`
  > * {
    &:not(:first-child) {
      margin-top: 5rem;
    }
  }
`;

const Charts = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;

    > * {
      &:not(:first-child) {
        margin-top: 3rem;
      }
    }
  }
`;

class Launches extends Component {
  componentDidMount() {
    const { launches, loadLaunches } = this.props;

    if (!launches) {
      loadLaunches();
    }
  }

  launchSuccessAndFails = (launches, theme) => {
    return [
      {
        id: 'Success',
        label: 'Success',
        value: filterSuccessfulLaunches(launches).length,
        color: theme.successColor
      },
      {
        id: 'Failed',
        label: 'Failed',
        value: filterFailedLaunches(launches).length,
        color: theme.failColor
      }
    ];
  };

  launchesWithLandingIntent = (launches, theme) => {
    return [
      {
        id: 'Intent',
        label: 'Landing Intent',
        value: filterLaunchesWithLandingIntent(launches).length,
        color: theme.successColor
      },
      {
        id: 'No Intent',
        label: 'No Landing Intent',
        value: filterLaunchesWithoutLandingIntent(launches).length,
        color: theme.failColor
      }
    ];
  };

  launchStats = (launches, theme) => {
    const rangeGap = launches.length / 4;

    return [
      {
        id: 'Launches',
        ranges: [0, rangeGap, rangeGap * 2, rangeGap * 3, launches.length],
        measures: [10], // Todo: Should be successful landings
        markers: [filterLaunchesWithLandingIntent(launches).length]
      }
    ];
  };

  render() {
    const { launches, theme, isLoading } = this.props;
    let successFailData = [];
    let landingIntentData = [];
    let launchBulletData = [];

    if (launches) {
      successFailData = this.launchSuccessAndFails(launches, theme);
      landingIntentData = this.launchesWithLandingIntent(launches, theme);
      launchBulletData = this.launchStats(launches, theme);
    }

    return (
      <Root>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Charts>
              <LaunchPieChart title='Launch Attempts' data={successFailData} />

              <LaunchPieChart title='Landing Intent' data={landingIntentData} />
            </Charts>

            {launches && (
              <>
                <LaunchBulletChart launches={launchBulletData} />

                <LaunchList launches={launches} />
              </>
            )}
          </>
        )}
      </Root>
    );
  }
}

const mapStateToProps = state => {
  return {
    launches: state.launches.all,
    isLoading: state.launches.requestingAll,
    isError: state.launches.errorAll
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLaunches: () => dispatch(getLaunches())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Launches));
