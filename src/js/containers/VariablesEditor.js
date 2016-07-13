import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as varUtil from '../lib/var_util';
import ColorPickerPanel from '../components/ColorPickerPanel';
import LexiconColorPickerPanel from '../containers/LexiconColorPickerPanel';
import VariableInput from '../components/VariableInput';
import {createVariablesFile} from '../actions/index';
import {setColorVariableName} from '../actions/colorVariableName';
import {setVariable} from '../actions/variables';

class VariablesEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsedGroups: []
		};
	}

	render() {
		const {selectedComponent, variables} = this.props;

		let componentVariables = varUtil.filterVariablesByComponent(variables, selectedComponent);

		return (
			<div className="variables-editor">
				<h3>Variables</h3>

				<form>
					{this.renderGroup(componentVariables, 'lexicon', 'Lexicon')}

					{this.renderGroup(componentVariables, 'bootstrap', 'Bootstrap')}

					{this.renderColorPickerPanel()}
				</form>
			</div>
		);
	}

	renderColorPickerPanel() {
		const {colorVariableName} = this.props;

		if (!colorVariableName) {
			return '';
		}

		return (
			<LexiconColorPickerPanel />
		);
	}

	renderGroup(componentVariables, group, title) {
		let groupContent = '';

		const groupVariables = varUtil.filterVariablesByGroup(componentVariables, group);

		if (!groupVariables.isEmpty()) {
			let className = 'variables-editor-section';
			let {collapsedGroups} = this.state;

			if (collapsedGroups.includes(group)) {
				className += ' collapsed';
			}

			groupContent = (
				<div className={className} data-group={group}>
					<h4
						className="variables-editor-section-header"
						onClick={this._handleHeaderClick.bind(this, group)}
					>
						{title}
					</h4>

					<div className="variables-editor-section-variables">
						{this.renderInputs(groupVariables)}
					</div>
				</div>
			);
		}

		return groupContent;
	}

	renderInputs(groupVariables) {
		const handleChange = this._handleChange.bind(this);
		const handleColorPickerTriggerClick = this._handleColorPickerTriggerClick.bind(this);
		const isColor = this._isColor.bind(this);
		const {variables} = this.props;

		return groupVariables.toArray().map(variable => {
			let name = variable.get('name');
			let value = variable.get('value');

			return (
				<VariableInput
					color={isColor(name)}
					key={name}
					label={name}
					name={name}
					onChange={handleChange}
					onColorPickerTriggerClick={handleColorPickerTriggerClick}
					value={value}
					variables={variables}
				/>
			);
		});
	}

	_handleChange(name, value) {
		const {dispatch} = this.props;

		dispatch(setVariable(name, value));
	}

	_handleColorPickerTriggerClick(name) {
		const {dispatch} = this.props;

		dispatch(setColorVariableName(name));
	}

	_handleHeaderClick(group) {
		let {collapsedGroups} = this.state;

		let groupIndex = collapsedGroups.indexOf(group);

		if (groupIndex > -1) {
			collapsedGroups.splice(groupIndex, 1);
		}
		else {
			collapsedGroups.push(group);
		}

		this.setState({
			collapsedGroups
		});
	}

	_isColor(variableName) {
		var color = false;

		if (variableName.indexOf('-bg') > -1 ||
			variableName.indexOf('brand') > -1 ||
			variableName.indexOf('color') > -1 ||
			variableName.indexOf('gray') > -1 ||
			_.endsWith(variableName, '-border') ||
			_.endsWith(variableName, '-text')) {
			color = true;
		}

		return color;
	}
};

const mapStateToProps = (state, ownProps) => {
	const colorVariableName = state.get('colorVariableName');
	const sassError = state.get('sassError');
	const selectedComponent = state.get('selectedComponent');
	const variables = state.get('variables');

	return {
		colorVariableName,
		sassError,
		selectedComponent,
		variables
	};
};

export default connect(mapStateToProps)(VariablesEditor);
