import { actionConstants } from './actions';

const reducer = (state = [], action) => {
	switch (action.type) {
		case actionConstants.SET_ITEMS:
			return action.items;
		default:
			return state;
	}
};

export default reducer;