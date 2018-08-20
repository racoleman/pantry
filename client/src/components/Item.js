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

	onDeleteClick() {
		this.props.onDeleteClick({ _id: this.props._id });
	}

	render() {
		return (
			<li className="c-List_Item row">
				<input
						type="text"
						value={this.props.name}
						onChange={({ target }) => this.onNameChange(target.value)}
						className="seven columns" />
				<input
						type="number"
						value={this.props.quantity}
						onChange={({ target }) => this.onQuantityChange(parseInt(target.value, 10))}
						className="two columns" />
				<button
						onClick={() => this.onDeleteClick()}
						className="three columns">
					Delete
				</button>
			</li>
		);
	}
}

export default Item;