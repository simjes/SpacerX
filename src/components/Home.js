import { format } from 'date-fns';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GET_NEXT_LAUNCH } from '../state/launches';

const Jumbo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: url('https://home.bt.com/images/4-aerospace-firms-that-could-rival-spacex-and-launch-humans-into-space-136424900977002601-180207175048.jpg')
    no-repeat;
  background-size: cover;
  height: 50vh;

  color: white;

  div {
    background: #000000aa;
    text-align: center;
    padding: 1rem;
  }
`;

const Header = styled.h1`
  margin: 0;
`;

const SubHeader = styled.h2`
  margin: 0;
  margin-top: 1rem;
`;

class Home extends Component {
  componentDidMount() {
    const { nextLaunch, loadNextLaunch } = this.props;

    if (!nextLaunch) {
      loadNextLaunch();
    }
  }

  render() {
    const { nextLaunch, isLoading } = this.props;

    return (
      <Jumbo>
        {isLoading ? null : (
          <div>
            {nextLaunch ? (
              <>
                <Header>Next launch:</Header>
                <SubHeader>{nextLaunch.mission_name}</SubHeader>
                <SubHeader>
                  {format(nextLaunch.launch_date_utc, 'DD MMM YYYY')}
                </SubHeader>
              </>
            ) : (
              <Header>'No scheduled launches'</Header>
            )}
          </div>
        )}
      </Jumbo>
    );
  }
}

const mapStateToProps = state => {
  return {
    nextLaunch: state.launches.next,
    isLoading: state.launches.next_loading,
    isError: state.launches.next_error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadNextLaunch: () => dispatch({ type: GET_NEXT_LAUNCH })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
