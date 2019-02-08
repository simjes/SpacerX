import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getLaunches } from '../../state/launch';
import {
  filterFailedLaunches,
  filterLaunchesWithLandingIntent,
  filterLaunchesWithoutLandingIntent,
  filterSuccessfulLaunches
} from '../../utils/launchUtils';
import Loading from '../Loading';
import LaunchList from './LauchList';
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

  getLaunchSuccessAndFails = launches => {
    return [
      {
        id: 'Success',
        label: 'Success',
        value: filterSuccessfulLaunches(launches).length,
        color: '#b2df8a'
      },
      {
        id: 'Failed',
        label: 'Failed',
        value: filterFailedLaunches(launches).length,
        color: '#fb9a99'
      }
    ];
  };

  getLaunchesWithLandingIntent = launches => {
    return [
      {
        id: 'Intent',
        label: 'Landing Intent',
        value: filterLaunchesWithLandingIntent(launches).length,
        color: '#b2df8a'
      },
      {
        id: 'No Intent',
        label: 'No Landing Intent',
        value: filterLaunchesWithoutLandingIntent(launches).length,
        color: '#fb9a99'
      }
    ];
  };

  render() {
    const { launches, isLoading } = this.props;
    let successFailData = [];
    let landingIntentData = [];

    if (launches) {
      successFailData = this.getLaunchSuccessAndFails(launches);
      landingIntentData = this.getLaunchesWithLandingIntent(launches);
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

            {launches && <LaunchList launches={launches} />}
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
)(Launches);
