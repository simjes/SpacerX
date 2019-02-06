import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GET_LANDING_PADS, GET_LAUNCH_PADS } from '../../state/locations';
import LocationSection from './LocationSection';

const Root = styled.div`
  > * {
    &:not(:first-child) {
      margin-top: 6rem;
    }
  }
`;

class Locations extends Component {
  componentDidMount() {
    const {
      landingPads,
      launchPads,
      loadLandingPads,
      loadLaunchPads
    } = this.props;

    if (!landingPads) {
      loadLandingPads();
    }

    if (!launchPads) {
      loadLaunchPads();
    }
  }

  render() {
    const {
      landingPads,
      launchPads,
      landingPadsLoading,
      launchPadsLoading
    } = this.props;

    return (
      <Root>
        <LocationSection
          locations={landingPads}
          title='Landing Pads'
          locationType='landings'
          isLoading={landingPadsLoading}
        />

        <LocationSection
          locations={launchPads}
          title='Launch Pads'
          locationType='launches'
          isLoading={launchPadsLoading}
        />
      </Root>
    );
  }
}

const mapStateToProps = state => {
  return {
    landingPads: state.locations.landingPads,
    landingPadsLoading: state.locations.landingPadsLoading,
    launchPads: state.locations.launchPads,
    launchPadsLoading: state.locations.launchPadsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLandingPads: () => dispatch({ type: GET_LANDING_PADS }),
    loadLaunchPads: () => dispatch({ type: GET_LAUNCH_PADS })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Locations);
