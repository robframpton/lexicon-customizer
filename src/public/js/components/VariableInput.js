import React, { Component, PropTypes } from 'react';
import ColorPicker from 'react-color';

const regexDarken = /darken\((.*),(.*)\)/;

const regexLighten = /lighten\((.*),(.*)\)/;

class VariableInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			colorPickerVisible: false
		};
	}

	render() {
		let { label, name, onChange, value, variables } = this.props;

		let colorPicker = '';

		if (this.props.color) {
			let handleColorPickerClick = this.handleColorPickerClick.bind(this);

			let colorPickerOverlay = '';
			let resolvedValue = this._resolveColorValue(name, value, variables);

			if (this.state.colorPickerVisible) {
				colorPickerOverlay = (
					<div className="color-picker-overlay" ref="colorPickerOverlay">
						<ColorPicker color={resolvedValue} onChange={this.handleColorPickerChange.bind(this)} type="chrome" />
					</div>
				);
			}

			var triggerStyle = {
				backgroundColor: resolvedValue
			};

			resolvedValue = resolvedValue.toLowerCase();

			if (resolvedValue == '#fff' || resolvedValue == '#ffffff') {
				triggerStyle.border = '1px solid #EEE';
			}

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

	_adjustColor(color, percentage) {
		var pound = false;

		if (color[0] == '#') {
			color = color.slice(1);
			pound = true;
		}

		var num = parseInt(color, 16);

		var r = this._normalizeRGBAValue((num >> 16) + percentage);
		var b = this._normalizeRGBAValue(((num >> 8) & 0x00FF) + percentage);
		var g = this._normalizeRGBAValue((num & 0x0000FF) + percentage);

		return (pound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
	}

	_resolveSassColor(name, value, variables, darken) {
		let regex = darken ? regexDarken : regexLighten;

		let match = value.match(regex);

		let color = match[1];

		if (color.indexOf('$') > -1) {
			color = this._resolveColorValue(name, color, variables);
		}

		let percentage = parseInt(match[2]);

		if (darken) {
			percentage = percentage * -1;
		}

		return this._adjustColor(color, percentage);
	}

	_normalizeRGBAValue(value) {
		if (value > 255) {
			value = 255;
		}
		else if (value < 0) {
			value = 0;
		}

		return value;
	}

	_resolveColorValue(name, value, variables = {}) {
		var resolvedValue = variables[value];

		if (resolvedValue && resolvedValue != name) {
			return this._resolveColorValue(name, resolvedValue, variables);
		}
		else if (regexDarken.test(value)) {
			value = this._resolveSassColor(name, value, variables, true);
		}
		else if (regexLighten.test(value)) {
			value = this._resolveSassColor(name, value, variables, false);
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
