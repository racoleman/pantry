import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addItem, updateItem, deleteItem } from '../store/actions';
import { emitAction } from '../socketClient';
import Item from './Item';
import NewItem from './NewItem';

function mapStateToProps(state) {
	return { items: state };
}

function mapDispatchToProps(dispatch) {
	return {
		onAddClick(item) {
			dispatch(emitAction(addItem(item)));
		},
		onChange(item) {
			dispatch(emitAction(updateItem(item)));
		},
		onDeleteClick(item) {
			dispatch(emitAction(deleteItem(item)));
		}
	}
}

const ItemsList = ({ items, onAddClick, onChange, onDeleteClick }) => (
	<div>
		<header className="c-List_Header">
			<span className="c-List_NameHeading">Item</span>
			<span className="c-List_QtyHeading">Quantity</span>
		</header>
		<TransitionGroup component="ul" className="c-List">
				{items.map((item, index) => (
					<CSSTransition
						key={item.name}
						classNames="c-List_Item"
						timeout={300}>
						<Item
								{...item}
								onChange={onChange}
								onDeleteClick={onDeleteClick} />
					</CSSTransition>
				))}
			<NewItem onAddClick={onAddClick} />
		</TransitionGroup>
	</div>
);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);