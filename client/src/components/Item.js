import React, { Component } from 'react';

class Item extends Component {
	render() {
		return (
			<li className="c-List_Item row">
				<span className="ten columns">{this.props.name}</span>
				<span className="two columns">{this.props.quantity}</span>
			</li>
		);
	}
}

export default Item;