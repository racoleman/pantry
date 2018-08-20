import React, { Component } from 'react';
import ItemsList from './ItemsList';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h1 class="c-Title">Pantry</h1>
        <ItemsList />
      </div>
    );
  }
}

export default App;
