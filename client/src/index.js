import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { setItems, addItem, updateItem, deleteItem } from './store/actions';
import reducer from './store/reducer';
import { actionConstants } from './store/actionConstants';
import socketClient from './socketClient';
import './index.css';
import App from './components/App';

const store = createStore(reducer, [], applyMiddleware(thunk));

socketClient.on('action', ({ type, data }) => {
	switch(type) {
		case actionConstants.SET_ITEMS:
			store.dispatch(setItems(data));
			break;
		case actionConstants.ADD_ITEM:
			store.dispatch(addItem(data));
			break;
		case actionConstants.UPDATE_ITEM:
			store.dispatch(updateItem(data));
			break;
		case actionConstants.DELETE_ITEM:
			store.dispatch(deleteItem(data));
			break;
	}
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);