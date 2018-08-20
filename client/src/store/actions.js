export const actionConstants = {
	SET_ITEMS: 'setItems'
};

export function setItems(items) {
	return { type: actionConstants.SET_ITEMS, items };
}