import { actionConstants } from './actionConstants';

const reducer = (state = [], { type, data }) => {
	switch (type) {
		case actionConstants.SET_ITEMS:
			return data;
		case actionConstants.UPDATE_ITEM:
			const items = state.map((item) => Object.assign({}, item));
			const updateIdx = items.findIndex((item) => item._id === data._id);
			items[updateIdx] = data;
			return items;
		default:
			return state;
	}
};

export default reducer;