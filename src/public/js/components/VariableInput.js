import React, { Component, PropTypes } from 'react';

class VariableInput extends Component {
	render() {
		let { label, name, onChange, value } = this.props;

		return (
			<div className="form-group">
				<label htmlFor={name}>{name}</label>

				<input
					className="form-control"
					name={name}
					onChange={onChange}
					type="text"
					value={value}
				/>
			</div>
		);
	}
}

VariableInput.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default VariableInput;
