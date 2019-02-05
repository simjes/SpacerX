import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GET_LANDING_PADS } from '../state/locations';
import LocationCard from './LocationCard';

const Header = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const CardContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

class Locations extends Component {
  componentDidMount() {
    if (!this.props.landingPads.length) {
      this.props.loadLandingPads();
    }
  }

  render() {
    return this.props.landingPads ? (
      <>
        <Header>Landing Pads</Header>

        <CardContainer>
          {this.props.landingPads.map(pad => (
            <LocationCard
              key={pad.id}
              title={pad.full_name}
              status={pad.status}
              numberOfSuccesses={pad.successful_landings}
              numberOfAttempts={pad.attempted_landings}
              padType='landing'
            />
          ))}
        </CardContainer>
      </>
    ) : (
      <p>No landingpads</p> /* TODO: no results found component */
    );
  }
}

const mapStateToProps = state => {
  return {
    landingPads: state.locations.landingPads
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLandingPads: () => dispatch({ type: GET_LANDING_PADS })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Locations);
