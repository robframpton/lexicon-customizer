import React, { Component, PropTypes } from 'react';

class SideMenu extends Component {
	render() {
		return (
			<div className="side-menu">
				<h3>{this.props.header}</h3>

				<ul className="side-menu-list">
					{this.renderMenuListItems(this.props)}
				</ul>
			</div>
		);
	}

	renderMenuListItems({ items, onClick, selectedItem = '' }) {
		return Object.keys(items).map(function(name) {
			var value = items[name];

			var className = 'side-menu-list-item';

			if (name == selectedItem) {
				className += ' selected';
			}

			return (
				<li
					className={className}
					data-value={value}
					key={name}
				>
					<a
						data-name={name}
						data-value={value}
						href="javascript:;"
						onClick={onClick}
					>
						{name}
					</a>
				</li>
			);
		});
	}
};

SideMenu.propTypes = {
	items: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
	selectedItem: PropTypes.string
};

export default SideMenu;
