import { actionConstants } from './actionConstants';

const reducer = (state = [], { type, data }) => {
	switch (type) {
		case actionConstants.SET_ITEMS:
			return data;
		default:
			return state;
	}
};

export default reducer;