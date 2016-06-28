import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as varUtil from '../lib/var_util';
import VariableInput from '../components/VariableInput';
import { createVariablesFile, setVariable } from '../actions/index';

class VariablesEditor extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="variables-editor">
				<h3>Variables</h3>

				<form>
					{this.renderInputs()}
				</form>
			</div>
		);
	}

	renderInputs() {
		let { group, selectedComponent, variables } = this.props;
		let handleChange = this.handleChange.bind(this);
		let isColor = this._isColor.bind(this);

		let componentVariables = varUtil.getComponentVariablesMap(variables, group, selectedComponent);

		return componentVariables.toArray().map(variable => {
			let name = variable.get('name');
			let value = variable.get('value');

			return (
				<VariableInput
					color={isColor(name)}
					key={name}
					label={name}
					name={name}
					onChange={handleChange}
					value={value}
					variables={variables}
				/>
			);
		});
	}

	handleChange(name, value) {
		let { dispatch, group, selectedComponent } = this.props;

		dispatch(setVariable(group, selectedComponent, name, value));
	}

	_isColor(variableName) {
		var color = false;

		if (variableName.indexOf('-bg') > -1 ||
			variableName.indexOf('color') > -1 ||
			_.endsWith(variableName, '-border') ||
			_.endsWith(variableName, '-text')) {
			color = true;
		}

		return color;
	}
};

const mapStateToProps = (state, ownProps) => {
	let group = state.get('group');
	let sassError = state.get('sassError');
	let selectedComponent = state.get('selectedComponent');
	let variables = state.get('variables');

	return {
		group,
		sassError,
		selectedComponent,
		variables
	};
};

export default connect(mapStateToProps)(VariablesEditor);
