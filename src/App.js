import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Commits from './components/Commits';
import Header from './components/Header';
import Landing from './pages/Landing';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header />

          <main>
            <Route exact path='/' component={Landing} />
            <Route exact path='/commits' component={Commits} />
          </main>
        </>
      </Router>
    );
  }
}

export default App;
