import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Icon from '../components/Button';
import {exportVariables, importVariables} from '../lib/system/import_export';
import {resetComponentVariables, resetVariables} from '../actions/variables';
import {unlockAllVariables} from '../actions/lockedVariables';

class VariableActionsDropdown extends Component {
	render() {
		return (
			<Dropdown direction="bottom" options={this.getDropdownTemplate()}>
				<Button icon="ellipsis-h">
					Variable Actions
				</Button>
			</Dropdown>
		);
	}

	getDropdownTemplate() {
		const {customDir, dispatch} = this.props;

		const separator = {
			separator: true
		};

		return [
			{
				action: () => {
					importVariables(dispatch);
				},
				icon: 'import-export',
				label: 'Import'
			},
			{
				action: () => {
					exportVariables(customDir);
				},
				icon: 'import-export',
				label: 'Export'
			},
			separator,
			{
				action: () => {
					dispatch(resetVariables());
				},
				icon: 'reload',
				label: 'Reset All'
			},
			{
				action: () => {
					dispatch(resetComponentVariables());
				},
				icon: 'reload',
				label: 'Reset Component'
			},
			separator,
			{
				action: () => {
					dispatch(unlockAllVariables());
				},
				icon: 'unlock',
				label: 'Unlock All'
			}
		];
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		customDir: state.get('lexiconDirs').customDir
	};
};

export default connect(mapStateToProps)(VariableActionsDropdown);
