import React, { Component, PropTypes } from 'react';
import ColorPicker from 'react-color';

class VariableInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			colorPickerVisible: false
		};
	}

	render() {
		let { label, name, onChange, value, variables } = this.props;

		var colorPicker = '';

		if (this.props.color) {
			var handleColorPickerClick = this.handleColorPickerClick.bind(this);

			var colorPickerOverlay = '';

			if (this.state.colorPickerVisible) {
				colorPickerOverlay = (
					<div className="color-picker-overlay" ref="colorPickerOverlay">
						<ColorPicker color={value} onChange={this.handleColorPickerChange.bind(this)} type="chrome" />
					</div>
				);
			}

			var triggerStyle = {
				backgroundColor: this._resolveColorValue(name, value, variables)
			};

			colorPicker = (
				<div className="color-picker">
					<div className="color-picker-trigger" onClick={handleColorPickerClick} style={triggerStyle}></div>

					{colorPickerOverlay}
				</div>
			);
		}

		return (
			<div className="form-group variable-input">
				<label htmlFor={name}>{name}</label>

				<input
					className="form-control"
					name={name}
					onChange={this.handleInputChange.bind(this)}
					type="text"
					value={value}
				/>

				{colorPicker}
			</div>
		);
	}

	handleInputChange(event) {
		let { onChange, name } = this.props;

		onChange(name, event.currentTarget.value);
	}

	handleColorPickerChange(color) {
		let { onChange, name } = this.props;
		let value;

		if (color.rgb.a < 1) {
			let { a, b, g, r } = color.rgb;

			value = `rgba(${r}, ${g}, ${b}, ${a})`
		}
		else {
			value = `#${color.hex.toUpperCase()}`
		}

		onChange(name, value);
	}

	handleColorPickerClick(event) {
		this.setState({
			colorPickerVisible: !this.state.colorPickerVisible
		});
	}

	_resolveColorValue(name, value, variables = {}) {
		if (variables[value] && variables[value] != name) {
			return this._resolveColorValue(name, variables[value], variables);
		}

		return value;
	}
}

VariableInput.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default VariableInput;
