import { actionConstants } from './actionConstants';

const reducer = (state = [], { type, data }) => {
	const items = state.map((item) => Object.assign({}, item));
	switch (type) {
		case actionConstants.SET_ITEMS:
			return data;
		case actionConstants.ADD_ITEM:
			items.push(data);
			return items;
		case actionConstants.UPDATE_ITEM: {
			const updateIdx = items.findIndex((item) => item._id === data._id);
			items[updateIdx] = data;
			return items;
		}
		case actionConstants.DELETE_ITEM: {
			const deleteIdx = items.findIndex((item) => item._id === data._id);
			items.splice(deleteIdx, 1);
			return items;
		}
		default:
			return state;
	}
};

export default reducer;