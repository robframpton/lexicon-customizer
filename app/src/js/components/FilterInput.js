import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';

class FilterInput extends Component {
	render() {
		const {onChange, value, ...others} = this.props;

		const icon = value ? 'times' : 'search';

		return (
			<div className="form-group side-menu-filter">
				<input
					className="form-control side-menu-filter-input"
					onChange={this.handleFilterInputChange.bind(this)}
					ref="filterInput"
					value={value}
					{...others}
				/>

				<a href="javascript:;" onClick={this.handleFilterIconClick.bind(this)}><Icon icon={icon} /></a>
			</div>
		);
	}

	handleFilterIconClick(event) {
		const {onChange, value} = this.props;

		if (value) {
			onChange('');
		}
		else {
			this.refs.filterInput.focus();
		}
	}

	handleFilterInputChange(event) {
		this.props.onChange(event.currentTarget.value);
	}
};

FilterInput.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default FilterInput;
