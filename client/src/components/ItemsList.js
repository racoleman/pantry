import React from 'react';
import { connect } from 'react-redux';
import { addItem, updateItem, deleteItem } from '../store/actions';
import { emitAction } from '../socketClient';
import Item from './Item';
import NewItem from './NewItem';

function mapStateToProps(state) {
	return { items: state };
}

function mapDispatchToProps(dispatch) {
	return {
		onAddClick(item) {
			dispatch(emitAction(addItem(item)));
		},
		onChange(item) {
			dispatch(emitAction(updateItem(item)));
		},
		onDeleteClick(item) {
			dispatch(emitAction(deleteItem(item)));
		}
	}
}

const ItemsList = ({ items, onAddClick, onChange, onDeleteClick }) => (
	<div>
		<header className="row">
			<p className="seven columns">Item</p>
			<p className="two columns">Quantity</p>
		</header>
		<ul className="c-List">
			{items.map((item, index) => (
				<Item
						key={index}
						{...item}
						onChange={onChange}
						onDeleteClick={onDeleteClick} />
			))}
			<NewItem onAddClick={onAddClick} />
		</ul>
	</div>
);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);