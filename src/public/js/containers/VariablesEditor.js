import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import VariableInput from '../components/VariableInput';
import { createVariablesFile, setVariable } from '../actions/index';

class VariablesEditor extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var instance = this;

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
		let { group, selectedComponent, modifiedVariables } = this.props;
		let handleChange = this.handleChange.bind(this);

		let componentVariables = modifiedVariables[group][selectedComponent];
		let isColor = this._isColor.bind(this);

		modifiedVariables = this._flattenVariables(modifiedVariables);

		return Object.keys(componentVariables).map(function(variableName) {
			return (
				<VariableInput
					color={isColor(variableName)}
					key={variableName}
					label={variableName}
					name={variableName}
					onChange={handleChange}
					value={componentVariables[variableName]}
					modifiedVariables={modifiedVariables}
				/>
			);
		});
	}

	handleChange(name, value) {
		let { dispatch, group, selectedComponent } = this.props;

		dispatch(setVariable(group, selectedComponent, name, value));
		dispatch(createVariablesFile());
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

	_flattenVariables(modifiedVariables) {
		var instance = this;

		return _.reduce(modifiedVariables, (result, item, index) => {
			if (index == 'bootstrap' || index == 'lexicon') {
				item = instance._flattenVariables(item);
			}

			_.assign(result, item);

			return result;
		}, {});
	}
};

const mapStateToProps = (state, ownProps) => {
	let { group, selectedComponent, modifiedVariables } = state;

	return {
		group,
		selectedComponent,
		modifiedVariables
	};
};

export default connect(mapStateToProps)(VariablesEditor);
