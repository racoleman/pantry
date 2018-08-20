import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { setItems, updateItem } from './store/actions';
import reducer from './store/reducer';
import { actionConstants } from './store/actionConstants';
import './index.css';
import App from './components/App';

const store = createStore(reducer);

const socket = io('http://localhost:3001');
socket.on('action', ({ type, data }) => {
	switch(type) {
		case actionConstants.SET_ITEMS:
			store.dispatch(setItems(data));
			break;
		case actionConstants.UPDATE_ITEM:
			store.dispatch(updateItem(data));
			break;
	}
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);