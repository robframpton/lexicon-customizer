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
		let { group, selectedComponent, variables } = this.props;
		let handleChange = this.handleChange.bind(this);

		let componentVariables = variables[group][selectedComponent];
		let isColor = this._isColor.bind(this);

		variables = this._flattenVariables(variables);

		return Object.keys(componentVariables).map(function(variableName) {
			return (
				<VariableInput
					color={isColor(variableName)}
					key={variableName}
					label={variableName}
					name={variableName}
					onChange={handleChange}
					value={componentVariables[variableName]}
					variables={variables}
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

		if (variableName.indexOf('-bg') > -1 || variableName.indexOf('color') > -1) {
			color = true;
		}

		return color;
	}

	_flattenVariables(variables) {
		var instance = this;

		return _.reduce(variables, (result, item, index) => {
			if (index == 'bootstrap' || index == 'lexicon') {
				item = instance._flattenVariables(item);
			}

			_.assign(result, item);

			return result;
		}, {});
	}
};

const mapStateToProps = (state, ownProps) => {
	let { group, selectedComponent, variables } = state;

	return {
		group,
		selectedComponent,
		variables
	};
};

export default connect(mapStateToProps)(VariablesEditor);
