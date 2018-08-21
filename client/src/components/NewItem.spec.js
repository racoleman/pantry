import test from 'tape';
import React from 'react';
import { mount } from 'enzyme';
import NewItem from './NewItem';

function getComponent(onAddClick = () => {}) {
	return mount(<NewItem onAddClick={onAddClick} />);
}

test('Entered values are passed to add handler', (t) => {
	const expectedItem = {
		name: 'test',
		quantity: 2
	};
	let addedItem = {};
	const mockOnAddClick = (item) => addedItem = item;
	const newItem = getComponent(mockOnAddClick);

	const nameField = newItem.find('.qa-List_ItemName');
	nameField.simulate('change', { target: { value: expectedItem.name }});
	const qtyField = newItem.find('.qa-List_ItemQty');
	qtyField.simulate('change', { target: { value: expectedItem.quantity.toString() }});
	newItem.find('.qa-List_AddBtn').simulate('click');

	t.deepEqual(addedItem, expectedItem, 'Passed values are correct');
	t.end();
});

test('State is reset after add', (t) => {
	const newItem = getComponent();
	newItem.setState({
		name: 'test',
		quantity: 5
	});
	newItem.instance().onAddClick();

	const { name, quantity } = newItem.state();
	t.equal(name, '', 'Name field is empty');
	t.equal(quantity, '', 'Quantity field is empty');
	t.end();
});

test('Add button is disabled when no name is entered', (t) => {
	const newItem = getComponent();
	const addBtn = newItem.find('.qa-List_AddBtn');
	t.ok(addBtn.prop('disabled'), 'Add button is disabled');
	t.end();
});

test('Add button is enabled when name is entered', (t) => {
	const newItem = getComponent();
	const nameField = newItem.find('.qa-List_ItemName');
	nameField.simulate('change', { target: { value: 'test' }});

	const addBtn = newItem.find('.qa-List_AddBtn');
	t.notOk(addBtn.prop('disabled'), 'Add button is enabled');
	t.end();
});

test('Quantity is set to 0 when not entered', (t) => {
	let addedItem = {};
	const mockOnAddClick = (item) => addedItem = item;
	const newItem = getComponent(mockOnAddClick);

	newItem.setState({ name: 'test' });
	newItem.instance().onAddClick();

	t.equal(addedItem.quantity, 0, 'Quantity is set to 0');
	t.end();
});