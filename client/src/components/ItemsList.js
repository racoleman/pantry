import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';

function mapStateToProps(state) {
	return { items: state };
}

const ItemsList = ({ items }) => (
	<ul className="c-List">
		{items.map((item) => (
			<Item key={item._id} name={item.name} quantity={item.quantity} />
		))}
	</ul>
);

export default connect(mapStateToProps)(ItemsList);