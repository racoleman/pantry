import { actionConstants } from './actionConstants';

export function setItems(data) {
	return { type: actionConstants.SET_ITEMS, data };
}