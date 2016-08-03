import ColorPicker from 'react-color';
import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';

class VariableInput extends Component {
	render() {
		const {name, value} = this.props;

		return (
			<div className="color-picker-panel">
				<div className="card color-picker-panel-inner">
					<div className="color-picker-panel-header">
						<span className="color-picker-panel-name">{name}</span>

						<a className="color-picker-panel-close" href="javascript:;" onClick={this.props.onClose}>
							<Icon icon="times" />
						</a>
					</div>

					<div className="color-picker-panel-body">
						<ColorPicker color={value} onChange={this.handleChange.bind(this)} type="chrome" />
					</div>
				</div>
			</div>
		);
	}

	handleChange(color) {
		let value;

		if (color.rgb.a < 1) {
			let {a, b, g, r} = color.rgb;

			value = `rgba(${r}, ${g}, ${b}, ${a})`;
		}
		else {
			value = `#${color.hex.toUpperCase()}`;
		}

		this.props.onChange(value, this.props.name);
	}
}

VariableInput.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default VariableInput;
