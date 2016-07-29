'use strict';

import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {Component, PropTypes} from 'react';

import FilterInput from '../components/FilterInput';
import VariableInput from '../containers/VariableInput';

class VariablesGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: false,
			filterText: ''
		};
	}

	render() {
		const {header, group} = this.props;
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
		const variablesArray = this.filterVariablesArray();

		return variablesArray.map(variable => {
			let name = variable.get('name');

			return (
				<VariableInput
					key={name}
					label={name}
					name={name}
					value={variable.get('value')}
				/>
			);
		});
	}

	filterVariablesArray() {
		const {filterText} = this.state;

		let variablesArray = this.props.groupVariables.toArray();

		if (filterText) {
			variablesArray = variablesArray.filter(variable => {
				const name = variable.get('name');

				return name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
			});
		}

		return variablesArray;
	}

	handleFilterInputChange(value) {
		this.setState({
			filterText: value
		});
	}

	handleHeaderClick() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}
};

VariablesGroup.propTypes = {
	group: PropTypes.string.isRequired,
	groupVariables: ImmutablePropTypes.orderedMap.isRequired,
	header: PropTypes.string.isRequired
};

export default VariablesGroup;
