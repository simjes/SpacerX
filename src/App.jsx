import React, { Component } from 'react';
import styled from 'styled-components/macro';
import './App.css';
import logo from './logo.svg';

const We = styled.div`
  background: hotpink;
`;

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <We>
            Edit <code>src/App.js</code> and save to reload.
          </We>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
