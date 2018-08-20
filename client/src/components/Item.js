import React, { Component } from 'react';

class Item extends Component {
	onNameChange(name) {
		this.props.onChange({
			_id: this.props._id,
			name
		});
	}

	onQuantityChange(quantity) {
		this.props.onChange({
			_id: this.props._id,
			quantity
		});
	}

	render() {
		return (
			<li className="c-List_Item row">
				<input
						type="text"
						value={this.props.name}
						onChange={({ target }) => this.onNameChange(target.value)}
						className="ten columns" />
				<input
						type="number"
						value={this.props.quantity}
						onChange={({ target }) => this.onQuantityChange(target.value)}
						className="two columns" />
			</li>
		);
	}
}

export default Item;