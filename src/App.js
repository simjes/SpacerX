import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Launches from './components/launches/Launches';
import Locations from './components/locations/Locations';
import { theme } from './theme';

const Main = styled.main`
  margin: 0 auto;
  margin-top: 3rem;
  max-width: ${props => props.theme.maxWidth};
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <>
            <Header />

            <Main>
              <Route exact path='/' component={Home} />
              <Route exact path='/locations' component={Locations} />
              <Route exact path='/launches' component={Launches} />
            </Main>
          </>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
