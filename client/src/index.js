import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { setItems } from './actions';
import reducer from './reducer';
import './index.css';
import App from './components/App';

const store = createStore(reducer);

const socket = io('http://localhost:3001');
socket.on('items', (items) => {
 store.dispatch(setItems(items));
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);