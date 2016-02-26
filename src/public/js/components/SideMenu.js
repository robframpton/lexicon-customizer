import React, { Component, PropTypes } from 'react';

class SideMenu extends Component {
	constructor(props) {
		super(props);

		const instance = this;

		this.state = {};

		props.groups.forEach(function(item, index) {
			instance.state[instance._getListRef(item)] = true;
		});
	}

	render() {
		const instance = this;

		return (
			<div className="side-menu">
				<h3>{this.props.header}</h3>

				{this.props.groups.map(function(item, index) {
					let listRef = instance._getListRef(item);

					let listContent = instance.state[listRef] ? instance.renderMenuList(item, instance.props) : '';

					return (
						<div className="side-menu-group" key={item.id}>
							<a href="javascript:;" onClick={instance.onSideMenuHeaderClick.bind(instance, listRef)}><h4>{item.title}</h4></a>

							{listContent}
						</div>
					);
				})}
			</div>
		);
	}

	renderMenuList(item, props) {
		let listRef = this._getListRef(item);

		return (
			<ul className="side-menu-list">
				{this.renderMenuListItems(item, props)}
			</ul>
		);
	}

	renderMenuListItems(item, { onClick, selectedItem = '' }) {
		return item.items.map(function(name) {
			var className = 'side-menu-list-item';

			if (name == selectedItem) {
				className += ' selected';
			}

			return (
				<li
					className={className}
					key={`${item.it}_${name}`}
				>
					<a
						data-group-id={item.id}
						data-name={name}
						href="javascript:;"
						onClick={onClick}
					>
						{name}
					</a>
				</li>
			);
		});
	}

	onSideMenuHeaderClick(listRef) {
		let newState = {};

		newState[listRef] = !this.state[listRef];

		this.setState(newState);
	}

	_getListRef(group) {
		return group.id + 'List';
	}
};

SideMenu.propTypes = {
	groups: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
	selectedItem: PropTypes.string
};

export default SideMenu;
