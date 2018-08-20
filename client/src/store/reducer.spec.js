import test from 'tape';
import reducer from './reducer';
import { actionConstants } from './actionConstants';

test('Updates the appropriate item', (t) => {
	const initialState = [
		{
			_id: 1,
			name: 'Apple',
			quantity: 2
		},
		{
			_id: 2,
			name: 'Orange',
			quantity: 3
		},
	];
	const update = {
		_id: 1,
		name: 'Apple',
		quantity: 3
	};
	const newState = reducer(initialState, {
		type: actionConstants.UPDATE_ITEM,
		data: update
	});
	const updatedItem = newState.find((item) => item._id === update._id);
	const initialItem = initialState.find((item) => item._id === update._id);

	t.deepEqual(updatedItem, update, 'Item is updated');
	t.notDeepEqual(initialItem, update, 'Update was immutable');
	t.end();
});