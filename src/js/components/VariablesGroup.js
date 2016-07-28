'use strict';

import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {Component, PropTypes} from 'react';

import * as varUtil from '../lib/var_util';
import FilterInput from '../components/FilterInput';
import VariableInput from '../components/VariableInput';

class VariablesGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: false,
			filterText: ''
		};
	}

	render() {
		const {header, group, groupVariables, variables} = this.props;
		const {collapsed, filterText} = this.state;

		let className = 'variables-editor-section';

		if (collapsed) {
			className += ' collapsed';
		}

		return (
			<div className={className} data-group={group}>
				<h4
					className="variables-editor-section-header"
					onClick={this.handleHeaderClick.bind(this)}
				>
					{header}
				</h4>

				<div className="variables-editor-section-variables">
					<FilterInput
						onChange={this.handleFilterInputChange.bind(this)}
						placeholder="Filter variables..."
						value={filterText}
					/>

					{this.renderInputs()}
				</div>
			</div>
		);
	}

	renderInputs() {
		const {dropdownTemplate, groupVariables, variables} = this.props;

		const handleVariableChange = this.handleVariableChange.bind(this);
		const handleColorPickerTriggerClick = this.handleColorPickerTriggerClick.bind(this);

		const variablesArray = this.filterVariablesArray();

		return variablesArray.map(variable => {
			let name = variable.get('name');

			return (
				<VariableInput
					dropdownTemplate={dropdownTemplate}
					key={name}
					label={name}
					name={name}
					onChange={handleVariableChange}
					onColorPickerTriggerClick={handleColorPickerTriggerClick}
					value={variable.get('value')}
					variables={variables}
				/>
			);
		});
	}

	filterVariablesArray() {
		const {filterText} = this.state;
		const {groupVariables} = this.props;

		let variablesArray = groupVariables.toArray();

		if (filterText) {
			variablesArray = variablesArray.filter(variable => {
				const name = variable.get('name');

				return name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
			});
		}

		return variablesArray;
	}

	handleColorPickerTriggerClick(name) {
		this.props.onColorPickerTriggerClick(name);
	}

	handleHeaderClick() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	handleFilterInputChange(value) {
		this.setState({
			filterText: value
		});
	}

	handleVariableChange(name, value) {
		this.props.onVariableChange(name, value);
	}

	handleVariableReset(name) {
		this.props.onVariableReset(name);
	}
};

VariablesGroup.propTypes = {
	dropdownTemplate: PropTypes.array,
	group: PropTypes.string.isRequired,
	groupVariables: ImmutablePropTypes.orderedMap.isRequired,
	header: PropTypes.string.isRequired,
	onColorPickerTriggerClick: PropTypes.func.isRequired,
	onVariableChange: PropTypes.func.isRequired,
	onVariableReset: PropTypes.func.isRequired,
	variables: ImmutablePropTypes.orderedMap.isRequired
};

export default VariablesGroup;
