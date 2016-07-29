import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as varUtil from '../lib/var_util';
import LexiconColorPickerPanel from '../containers/LexiconColorPickerPanel';
import VariablesGroup from '../components/VariablesGroup';

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
					/>
				);
			}

			return variablesGroup;
		});
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		colorVariableName: state.get('colorVariableName'),
		selectedComponent: state.get('selectedComponent'),
		variables: state.get('variables')
	};
};

export default connect(mapStateToProps)(VariablesEditor);
