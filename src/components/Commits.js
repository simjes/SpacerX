import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLandingPads } from '../state/landingPads';

class Commits extends Component {
  componentDidMount() {
    this.props.loadPads();
  }

  render() {
    return this.props.landingPads ? (
      this.props.landingPads.map(pad => <p key={pad}>{pad}</p>)
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
  return { loadPads: () => dispatch(getLandingPads()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Commits);
