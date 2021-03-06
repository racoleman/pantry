import { actionConstants } from './actionConstants';

const reducer = (state = [], { type, data }) => {
	const items = state.map((item) => Object.assign({}, item));
	switch (type) {
		case actionConstants.SET_ITEMS:
			return data;
		case actionConstants.ADD_ITEM:
			const existingItem = items.find(({ name }) => name === data.name);
			if (!existingItem) items.push(data);
			return items;
		case actionConstants.UPDATE_ITEM: {
			const updateIdx = items.findIndex(({ _id }) => _id === data._id);
			items[updateIdx] = Object.assign({}, items[updateIdx], data);
			return items;
		}
		case actionConstants.DELETE_ITEM: {
			const deleteIdx = items.findIndex(({ _id }) => _id === data._id);
			if (deleteIdx >= 0) items.splice(deleteIdx, 1);
			return items;
		}
		default:
			return state;
	}
};

export default reducer;