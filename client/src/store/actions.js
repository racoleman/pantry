import { actionConstants } from './actionConstants';

export function setItems(data) {
	return { type: actionConstants.SET_ITEMS, data };
}

export function updateItem(data) {
	return { type: actionConstants.UPDATE_ITEM, data };
}