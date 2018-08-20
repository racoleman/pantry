import { actionConstants } from './actionConstants';

export function setItems(data) {
	return { type: actionConstants.SET_ITEMS, data };
}

export function addItem(data) {
	return { type: actionConstants.ADD_ITEM, data };
}

export function updateItem(data) {
	return { type: actionConstants.UPDATE_ITEM, data };
}

export function deleteItem(data) {
	return { type: actionConstants.DELETE_ITEM, data };
}