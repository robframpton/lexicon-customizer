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
		let { selectedComponent, variables } = this.props;
		let handleChange = this.handleChange.bind(this);

		let componentVariables = variables[selectedComponent];

		return Object.keys(componentVariables).map(function(variableName) {
			return (
				<VariableInput
					key={variableName}
					label={variableName}
					name={variableName}
					onChange={handleChange}
					value={componentVariables[variableName]}
				/>
			);
		});
	}

	handleChange(event) {
		let { dispatch, selectedComponent } = this.props;

		let { currentTarget } = event;

		dispatch(setVariable(selectedComponent, currentTarget.getAttribute('name'), currentTarget.value));
		dispatch(createVariablesFile());
	}
};

const mapStateToProps = (state, ownProps) => {
	let { selectedComponent, variables } = state;

	return {
		selectedComponent,
		variables
	};
};

export default connect(mapStateToProps)(VariablesEditor);
