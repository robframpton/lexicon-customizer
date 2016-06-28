import ColorPicker from 'react-color';
import enhanceWithClickOutside from 'react-click-outside';
import React, {Component, PropTypes} from 'react';

class VariableInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showOverlay: false
		};
	}

	render() {
		const {value} = this.props;

		let colorPickerOverlay = '';

		if (this.state.showOverlay) {
			colorPickerOverlay = (
				<div className="color-picker-overlay" ref="colorPickerOverlay">
					<ColorPicker color={value} onChange={this.handleChange.bind(this)} type="chrome" />
				</div>
			);
		}

		return (
			<div className="color-picker">
				<div className="color-picker-trigger" onClick={this.handleTriggerClick.bind(this)}>
					<div className="color-picker-trigger-preview" style={this._getTriggerStyle(value)}></div>

					<div className="color-picker-trigger-checkerboard"></div>
				</div>

				{colorPickerOverlay}
			</div>
		);
	}

	handleChange(color) {
		let value;

		if (color.rgb.a < 1) {
			let {a, b, g, r} = color.rgb;

			value = `rgba(${r}, ${g}, ${b}, ${a})`
		}
		else {
			value = `#${color.hex.toUpperCase()}`
		}

		this.props.onChange(value);
	}

	handleClickOutside() {
		this.setState({
			showOverlay: false
		});
	}

	handleTriggerClick(event) {
		this.setState({
			showOverlay: !this.state.showOverlay
		});
	}

	_getTriggerStyle(resolvedValue) {
		let triggerStyle = {
			backgroundColor: resolvedValue
		};

		resolvedValue = resolvedValue.toLowerCase();

		if (resolvedValue == '#fff' || resolvedValue == '#ffffff') {
			triggerStyle.border = '1px solid #EEE';
		}

		return triggerStyle;
	}
}

VariableInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default enhanceWithClickOutside(VariableInput);
