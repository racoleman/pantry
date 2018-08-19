const initialState = [];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'setItems':
			return action.items;
		default:
			return state;
	}
};

export default reducer;