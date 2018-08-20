import React from 'react';
import { connect } from 'react-redux';
import { updateItem, deleteItem } from '../store/actions';
import Item from './Item';

function mapStateToProps(state) {
	return { items: state };
}

function mapDispatchToProps(dispatch) {
	return {
		onChange(item) {
			dispatch(updateItem(item));
		},
		onDeleteClick(item) {
			dispatch(deleteItem(item));
		}
	}
}

const ItemsList = ({ items, onChange, onDeleteClick }) => (
	<ul className="c-List">
		{items.map((item) => (
			<Item
					key={item._id}
					{...item}
					onChange={onChange}
					onDeleteClick={onDeleteClick} />
		))}
	</ul>
);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);