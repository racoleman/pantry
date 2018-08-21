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
			<li className="c-List_Item">
				<input
						type="text"
						value={this.props.name}
						onChange={({ target }) => this.onNameChange(target.value)}
						className="c-List_ItemField c-List_ItemField-name" />
				<input
						type="number"
						value={this.props.quantity}
						min="1"
						onChange={({ target }) => this.onQuantityChange(parseInt(target.value, 10))}
						className="c-List_ItemField c-List_ItemField-qty" />
				<button
						onClick={() => this.onDeleteClick()}
						className="c-List_ItemBtn">
					Delete
				</button>
			</li>
		);
	}
}

export default Item;