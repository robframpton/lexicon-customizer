import React, { Component, PropTypes } from 'react';

import fs from 'fs';
import path from 'path';

import componentScraper from '../../../../lib/component-scraper';
import sass from '../../../../lib/sass';
import themeUtil from '../../../../lib/theme';
import UserConfig from '../../../../lib/user_config';

class ComponentMenu extends Component {
	render() {
		<div className="component-menu">
			<h3>Componenets</h3>

			<ul className="component-list">
				{this.renderComponentList()}
			</ul>
		</div>
	}

	renderComponentList() {
		var instance = this;

		var components = this.props.components;

		return Object.keys(components).map(function(name) {
			var file = components[name];

			var className = 'component-item';

			if (name == instance.props.selectedComponent) {
				className += ' selected';
			}

			return (<li
				className={className}
				data-file={file}
				key={name}
			>
				<a href="javascript:;" data-file={file} data-name={name} onClick={instance.handleClick.bind(instance)}>{name}</a>
			</li>);
		});
	}

	handleClick(event) {
		this.props.onUserClick(event);
	}
}

// ComponentMenu.propTypes = {
// 	components: PropTypes.object.isRequired,
// 	onUserClick: PropTypes.func.isRequired,
// 	selectedComponent: PropTypes.string
// }

export default ComponentMenu