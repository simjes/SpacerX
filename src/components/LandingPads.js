import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_LANDINGPADS, GET_LANDINGPAD } from '../state/landingPads';

class LandingPads extends Component {
  componentDidMount() {
    if (!this.props.landingPads.length) {
      this.props.loadLandingPads();
    }
  }

  loadDetails = (e, id) => {
    e.preventDefault();

    this.props.loadLandingPad(id);
  };

  render() {
    return this.props.landingPads ? (
      this.props.landingPads.map(pad => (
        <button key={pad.id} onClick={e => this.loadDetails(e, pad.id)}>
          {pad.id}
        </button>
      ))
    ) : (
      <p>no pads</p>
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
