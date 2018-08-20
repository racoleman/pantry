import React, { Component } from 'react';

class NewItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			quantity: ''
		};
	}

	onAddClick() {
		this.props.onAddClick(this.state);
	}

	render() {
		return (
			<li className="c-List_Item row">
				<input
						type="text"
						value={this.state.name}
						onChange={({ target }) => this.setState({ name: target.value })}
						placeholder="Item Name"
						className="seven columns" />
				<input
						type="number"
						value={this.state.quantity}
						onChange={({ target }) => this.setState({ quantity: parseInt(target.value, 10) })}
						placeholder="Qty"
						className="two columns" />
				<button
						onClick={() => this.onAddClick()}
						className="button-primary three columns">
					Add
				</button>
			</li>
		);
	}
}

export default NewItem;