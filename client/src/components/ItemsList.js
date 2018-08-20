import React from 'react';
import { connect } from 'react-redux';
import { updateItem } from '../store/actions';
import Item from './Item';

function mapStateToProps(state) {
	return { items: state };
}

function mapDispatchToProps(dispatch) {
	return {
		onChange(item) {
			dispatch(updateItem(item));
		}
	}
}

const ItemsList = ({ items, onChange }) => (
	<ul className="c-List">
		{items.map((item) => (
			<Item
					key={item._id}
					{...item}
					onChange={onChange} />
		))}
	</ul>
);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);