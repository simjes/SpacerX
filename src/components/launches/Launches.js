import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getLaunches } from '../../state/launch';
import {
  filterFailedLaunches,
  filterSuccessfulLaunches,
  filterLaunchesWithLandingIntent,
  filterLaunchesWithoutLandingIntent
} from '../../utils/launchUtils';
import LaunchPieChart from './LaunchPieChart';
import Loading from '../Loading';

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
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <Charts>
            <LaunchPieChart title='Launch Attempts' data={successFailData} />

            <LaunchPieChart title='Landing Intent' data={landingIntentData} />
          </Charts>
        )}
      </div>
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
