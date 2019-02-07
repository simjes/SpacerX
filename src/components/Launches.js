import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLaunches } from '../state/launch';

class Launches extends Component {
  componentDidMount() {
    const { launches, loadLaunches } = this.props;

    if (!launches) {
      loadLaunches();
    }
  }

  render() {
    return <div>launches</div>;
  }
}

const mapStateToProps = state => {
  return {
    launches: state.launches.all,
    isLoading: state.launches.loadingAll,
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
