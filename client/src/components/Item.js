import React, { Component } from 'react';

class Item extends Component {
	constructor(props) {
		super(props);
		this.state = { quantityChanged: false };
	}

	onNameChange(name) {
		this.props.onChange({
			_id: this.props._id,
			name
		});
	}

	onIncrementClick() {
		this.triggerQuantityChange(this.props.quantity + 1);
	}

	onDecrementClick() {
		const { quantity } = this.props;
		if (!quantity) return;

		this.triggerQuantityChange(quantity - 1);
	}

	triggerQuantityChange(quantity) {
		this.props.onChange({
			_id: this.props._id,
			quantity
		});
	}

	onDeleteClick() {
		this.props.onDeleteClick({ _id: this.props._id });
	}

	getQtyClasses() {
		let classes = 'c-List_ItemValue';
		if (this.state.quantityChanged) classes += ' c-List_ItemValue-changed';
		return classes;
	}

	componentWillReceiveProps({ quantity }) {
		if (quantity !== this.props.quantity) {
			this.setState({ quantityChanged: true });
			setTimeout(() => this.setState({ quantityChanged: false }), 200);
		}
	}

	render() {
		return (
			<li className="c-List_Item">
				<input
						type="text"
						value={this.props.name}
						onChange={({ target }) => this.onNameChange(target.value)}
						className="c-List_ItemField c-List_ItemField-name" />
				<button
						className="c-List_ItemBtn-small button-primary"
						onClick={() => this.onDecrementClick()}
						disabled={!this.props.quantity}>
					-
				</button>
				<span className={this.getQtyClasses()}>{this.props.quantity}</span>
				<button
						className="c-List_ItemBtn-small button-primary"
						onClick={() => this.onIncrementClick()}>
					+
				</button>
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