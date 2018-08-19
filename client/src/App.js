import React, { Component } from 'react';
import io from 'socket.io-client';
import Item from './Item';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };

    const socket = io('http://localhost:3001');
    socket.on('items', (items) => {
     this.setState({ items });
    });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.items.map((item) => (
              <Item key={item._id} name={item.name} quantity={item.quantity} />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
