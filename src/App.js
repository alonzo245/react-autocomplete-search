import React, { Component } from 'react';
import './App.scss';
import SearchBar from './components/SearchBar/SearchBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: []
    };
  }

  render() {
    return (
      <div className="app-wrapper">
        <SearchBar />
      </div>
    )
  }
}

export default App;
