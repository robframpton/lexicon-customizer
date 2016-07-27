import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {Component, PropTypes} from 'react';

import FilterInput from '../components/FilterInput';
import Icon from '../components/Icon';

class SideMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filterText: ''
		};
	}

	render() {
		const getDisplayName = this._getDisplayName;

		const {onClick, selectedItem} = this.props;

		const componentArray = this.filterComponentsArray();

		return (
			<div className="side-menu">
				<h3>{this.props.header}</h3>

				<FilterInput
					onChange={this.handleFilterInputChange.bind(this)}
					value={this.state.filterText}
					placeholder="Filter components..."
				/>

				<ul className="side-menu-list">
					{componentArray.map((item, index) => {
						let className = 'side-menu-list-item';

						if (item === selectedItem) {
							className += ' selected';
						}

						return (
							<li
								className={className}
								key={item}
							>
								<a
									data-name={item}
									href="javascript:;"
									onClick={onClick}
								>
									{getDisplayName(item)}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}

	filterComponentsArray() {
		const {components} = this.props;
		const {filterText} = this.state;

		let componentsArray = components.toArray().sort();

		if (filterText) {
			componentsArray = componentsArray.filter(component => {
				return component.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
			});
		}

		return componentsArray;
	}

	handleFilterInputChange(value) {
		this.setState({
			filterText: value
		});
	}

	_getDisplayName(name) {
		var displayName = name.replace(/-/g, ' ');

		return displayName[0].toUpperCase() + displayName.slice(1, displayName.length);
	}
};

SideMenu.propTypes = {
	components: ImmutablePropTypes.list.isRequired,
	onClick: PropTypes.func.isRequired,
	selectedItem: PropTypes.string
};

export default SideMenu;
