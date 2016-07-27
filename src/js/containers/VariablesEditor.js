import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as varUtil from '../lib/var_util';
import ColorPickerPanel from '../components/ColorPickerPanel';
import FilterInput from '../components/FilterInput';
import LexiconColorPickerPanel from '../containers/LexiconColorPickerPanel';
import VariableInput from '../components/VariableInput';
import VariablesGroup from '../components/VariablesGroup';
import {createVariablesFile} from '../actions/index';
import {resetVariable, setVariable} from '../actions/variables';
import {setColorVariableName} from '../actions/colorVariableName';

class VariablesEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: false,
			filterText: ''
		};
	}

	render() {
		const {colorVariableName, selectedComponent, variables} = this.props;

		let componentVariables = varUtil.filterVariablesByComponent(variables, selectedComponent);

		let className = 'variables-editor';

		if (colorVariableName) {
			className += ' has-color-picker-panel';
		}

		return (
			<div className={className}>
				<div className="variables-editor-inner">
					<h3>Variables</h3>

					<form>
						{this.renderGroups()}

						{this.renderColorPickerPanel()}
					</form>
				</div>
			</div>
		);
	}

	renderColorPickerPanel() {
		let colorPickerPanel = '';

		if (this.props.colorVariableName) {
			colorPickerPanel = (
				<LexiconColorPickerPanel />
			);
		}

		return colorPickerPanel;
	}

	renderGroups() {
		const {selectedComponent, variables} = this.props;

		const handleColorPickerTriggerClick = this.handleColorPickerTriggerClick.bind(this);
		const handleVariableChange = this.handleVariableChange.bind(this);
		const handleVariableReset = this.handleVariableReset.bind(this);

		const componentVariables = varUtil.filterVariablesByComponent(variables, selectedComponent);

		const groups = ['lexicon', 'bootstrap'];

		return groups.map((group) => {
			let variablesGroup = '';

			const groupVariables = varUtil.filterVariablesByGroup(componentVariables, group);

			if (!groupVariables.isEmpty()) {
				variablesGroup = (
					<VariablesGroup
						group={group}
						groupVariables={groupVariables}
						header={_.capitalize(group)}
						key={group}
						onColorPickerTriggerClick={handleColorPickerTriggerClick}
						onVariableChange={handleVariableChange}
						onVariableReset={handleVariableReset}
						variables={variables}
					/>
				);
			}

			return variablesGroup;
		});
	}

	handleVariableChange(name, value) {
		const {dispatch} = this.props;

		dispatch(setVariable(name, value));
	}

	handleColorPickerTriggerClick(name) {
		const {colorVariableName, dispatch} = this.props;

		if (colorVariableName === name) {
			name = null;
		}

		dispatch(setColorVariableName(name));
	}

	handleVariableReset(name) {
		this.props.dispatch(resetVariable(name));
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		colorVariableName: state.get('colorVariableName'),
		sassError: state.get('sassError'),
		selectedComponent: state.get('selectedComponent'),
		variables: state.get('variables')
	};
};

export default connect(mapStateToProps)(VariablesEditor);
