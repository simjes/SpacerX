import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_LANDINGPADS, GET_LANDINGPAD } from '../state/landingPads';
import LandingPadCard from './LandingPadCard';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const Card = styled(LandingPadCard)``;

class LandingPads extends Component {
  componentDidMount() {
    if (!this.props.landingPads.length) {
      this.props.loadLandingPads();
    }
  }

  // loadDetails = (e, id) => {
  //   e.preventDefault();

  //   this.props.loadLandingPad(id);
  // };

  render() {
    return this.props.landingPads ? (
      <CardContainer>
        {this.props.landingPads.map(pad => (
          <Card
            key={pad.id}
            title={pad.full_name}
            status={pad.status}
            successfulLandings={pad.successful_landings}
            attemptedLandings={pad.attempted_landings}
          />
        ))}
      </CardContainer>
    ) : (
      <p>No landingpads</p>
    );
  }
}

const mapStateToProps = state => {
  return {
    landingPads: state.landingPads.overviews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLandingPads: () => dispatch({ type: GET_LANDINGPADS }),
    loadLandingPad: id => dispatch({ type: GET_LANDINGPAD, id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPads);
