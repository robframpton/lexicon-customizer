import React, { Component, PropTypes } from 'react';

class SideMenu extends Component {
	render() {
		var instance = this;

		return (
			<div className="side-menu">
				<h3>{this.props.header}</h3>

				{this.props.groups.map(function(item, index) {
					return (
						<div className="side-menu-group" key={item.id}>
							<h4>{item.title}</h4>

							<ul className="side-menu-list">
								{instance.renderMenuListItems(item, instance.props)}
							</ul>
						</div>
					);
				})}
			</div>
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
};

SideMenu.propTypes = {
	groups: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
	selectedItem: PropTypes.string
};

export default SideMenu;
