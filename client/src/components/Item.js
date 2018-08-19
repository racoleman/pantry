import React, { Component } from 'react';

class Item extends Component {
	render() {
		return (
			<li>
				<span>{this.props.name} - {this.props.quantity}</span>
			</li>
		);
	}
}

export default Item;