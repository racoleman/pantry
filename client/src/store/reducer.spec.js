import test from 'tape';
import reducer from './reducer';
import { actionConstants } from './actionConstants';

function getInitialState() {
	return [
		{
			_id: 1,
			name: 'Apple',
			quantity: 2
		},
		{
			_id: 2,
			name: 'Orange',
			quantity: 3
		}
	];
}

function findItemById(state, id) {
	return state.find((item) => item._id === id);
}

test('Adds the item', (t) => {
	const initialState = getInitialState();
	const newItem = {
		_id: 3,
		name: 'Pear',
		quantity: 5
	}
	const newState = reducer(initialState, {
		type: actionConstants.ADD_ITEM,
		data: newItem
	});

	const addedItem = findItemById(newState, newItem._id);
	t.ok(addedItem, 'Item was added');
	t.notDeepEqual(initialState, newState, 'Add was immutable');
	t.end();
});

test('Updates the appropriate item', (t) => {
	const initialState = getInitialState();
	const update = {
		_id: 1,
		name: 'Apple',
		quantity: 3
	};
	const newState = reducer(initialState, {
		type: actionConstants.UPDATE_ITEM,
		data: update
	});

	const updatedItem = findItemById(newState, update._id);
	const initialItem = findItemById(initialState, update._id);
	t.deepEqual(updatedItem, update, 'Item is updated');
	t.notDeepEqual(initialItem, update, 'Update was immutable');
	t.end();
});

test('Deletes the appropriate item', (t) => {
	const initialState = getInitialState();
	const itemToRemove = {
		_id: 2,
		name: 'Orange',
		quantity: 3
	}
	const newState = reducer(initialState, {
		type: actionConstants.DELETE_ITEM,
		data: itemToRemove
	});

	const deletedItem = findItemById(newState, itemToRemove._id);
	t.notOk(deletedItem, 'Item was deleted');
	t.notDeepEqual(initialState, newState, 'Delete was immutable');
	t.end();
});