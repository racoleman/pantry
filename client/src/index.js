import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
socket.on('items', (items) => {
	console.log(items);
});

ReactDOM.render(<App />, document.getElementById('root'));