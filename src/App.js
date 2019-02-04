import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPads from './components/LandingPads';
import Landing from './pages/Landing';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header />

          <main>
            <Route exact path='/' component={Landing} />
            <Route exact path='/landingPads' component={LandingPads} />
          </main>
        </>
      </Router>
    );
  }
}

export default App;
