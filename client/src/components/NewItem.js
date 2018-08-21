import React, { Component } from 'react';

function getInitialState() {
	return {
		name: '',
		quantity: ''
	};
}

class NewItem extends Component {
	constructor(props) {
		super(props);
		this.state = getInitialState();
	}

	onAddClick() {
		const item = Object.assign({}, this.state);
		if (item.quantity === '') item.quantity = 0;
		this.props.onAddClick(item);
		this.setState(getInitialState());
	}

	render() {
		return (
			<li className="c-List_Item c-List_Item-new">
				<input
						type="text"
						value={this.state.name}
						onChange={({ target }) => this.setState({ name: target.value })}
						placeholder="Item Name"
						className="c-List_ItemField c-List_ItemField-name qa-List_ItemName" />
				<input
						type="number"
						value={this.state.quantity}
						min="1"
						onChange={({ target }) => this.setState({ quantity: parseInt(target.value, 10) })}
						placeholder="Qty"
						className="c-List_ItemField c-List_ItemField-qty qa-List_ItemQty" />
				<button
						onClick={() => this.onAddClick()}
						className="c-List_ItemBtn qa-List_AddBtn button-primary"
						disabled={!this.state.name.length}>
					Add
				</button>
			</li>
		);
	}
}

export default NewItem;