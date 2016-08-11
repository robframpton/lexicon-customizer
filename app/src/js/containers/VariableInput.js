import _ from 'lodash';
import colorString from 'color-string';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {Component, PropTypes} from 'react';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';

import Dropdown from '../components/Dropdown';
import Icon from '../components/Icon';
import {getInheritableVariables, resolveValue} from '../lib/var_util';
import {resetVariable, setVariable} from '../actions/variables';
import {setColorVariableName} from '../actions/colorVariableName';
import {toggleLockedVariable} from '../actions/lockedVariables';

const numberRegex = /^(-)?([0-9]+)$/;

const unitRegex = /^(-)?([0-9\.]+)(px|em|ex|%|in|cm|mm|pt|pc)$/;

class VariableInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			autoCompleteActive: false,
			autoCompleteIndex: 0,
			focused: false
		};
	}

	componentDidUpdate(event) {
		let {autoCompleteActive} = this.state;

		let active = this._isAutoCompleteActive();

		if (autoCompleteActive != active) {
			this.setState({
				autoCompleteActive: active
			});
		}
	}

	render() {
		let {
			disabled,
			label,
			modified,
			name,
			onChange,
			value,
			variables
		} = this.props;

		let {autoCompleteActive, focused} = this.state;

		const resolvedValue = resolveValue(name, value, variables);

		let autoComplete = '';
		let inputPlugin = '';

		if (autoCompleteActive) {
			focused = true;
		}

		if (focused && value && value.length > 1 && value[0] == '$') {
			autoComplete = this.renderAutoComplete(name, value, variables);
		}

		let className = 'form-control';

		if (this._isRange(value)) {
			inputPlugin = this.renderRangePicker(name, value);
		}
		else if (colorString.get(resolvedValue)) {
			className += ' color-input';

			inputPlugin = this.renderColorPickerTrigger(name, resolvedValue);
		}

		let wrapperClassName = 'form-group variable-input';

		if (disabled) {
			wrapperClassName += ' disabled';
		}

		if (modified) {
			label = (
				<span>
					{label}

					<Icon icon="pencil" />
				</span>
			);
		}

		const tooltipId = `${name}_tooltip`;

		return (
			<div className={wrapperClassName}>
				{this.renderDropdown()}

				<label htmlFor={name}>{label}</label>

				<input
					className={className}
					data-for={tooltipId}
					data-tip
					disabled={disabled}
					id={name}
					name={name}
					onBlur={this.handleInputBlur.bind(this)}
					onChange={this.handleInputChange.bind(this)}
					onFocus={this.handleInputFocus.bind(this)}
					onKeyDown={this.handleInputKeyDown.bind(this)}
					ref="input"
					type="text"
					value={value}
				/>

				{autoComplete}

				{inputPlugin}

				{this.renderTooltip(tooltipId, value, resolvedValue)}
			</div>
		);
	}

	renderAutoComplete(name, value, variables) {
		const {sourceVariables} = this.props;

		const inheritableVariables = getInheritableVariables(name, variables, sourceVariables);

		if (inheritableVariables.has(value)) {
			return '';
		}

		let autoCompleteIndex = this.state.autoCompleteIndex;
		let reducedIndex = 0;

		let items = inheritableVariables.toArray().reduce((result, item) => {
			const itemName = item.get('name');

			if (itemName.indexOf(value) == 0) {
				result.push(
					<div
						className="auto-complete-item"
						data-selected={autoCompleteIndex == reducedIndex}
						data-value={itemName}
						key={itemName}
						onClick={this.handleAutoCompleteClick.bind(this)}
					>
						{itemName}
					</div>
				);

				reducedIndex++;
			}

			return result;
		}, []);

		return (
			<div
				className="input-auto-complete-menu"
				onMouseEnter={this.handleAutoCompleteMouseEnter.bind(this)}
				onMouseLeave={this.handleAutoCompleteMouseLeave.bind(this)}
				ref="autoCompleteMenu"
			>
				{items}
			</div>
		);
	}

	renderColorPickerTrigger(name, resolvedValue) {
		return (
			<div className="color-picker-trigger" onClick={this.handleColorPickerTriggerClick.bind(this, name, resolvedValue)}>
				<div className="color-picker-trigger-preview" style={this._getTriggerStyle(resolvedValue)}></div>

				<div className="color-picker-trigger-checkerboard"></div>
			</div>
		);
	}

	renderRangePicker() {
		return (
			<div className="range-picker">
				<a
					className="range-picker-up"
					href="javascript:;"
					onClick={this.handleRangePickerClick.bind(this, true)}
				>
					<Icon icon="angle-up" />
				</a>

				<a
					className="range-picker-down"
					href="javascript:;"
					onClick={this.handleRangePickerClick.bind(this, false)}
				>
					<Icon icon="angle-down" />
				</a>
			</div>
		);
	}

	renderDropdown() {
		return (
			<Dropdown options={this.getDropdownTemplate()}>
				<Icon icon="ellipsis-h" />
			</Dropdown>
		);
	}

	renderTooltip(tooltipId, value, resolvedValue) {
		const {previewPopout} = this.props;

		let place = 'left';
		let content = '';

		if (previewPopout) {
			place = 'bottom';
		}

		if (value != resolvedValue) {
			content = (
				<ReactTooltip
					class="lexicon-customizer-tooltip"
					effect="solid"
					id={tooltipId}
					place={place}
					type="info"
				>
					<span>Resolved value: <strong>{resolvedValue}</strong></span>
				</ReactTooltip>
			);
		}

		return content;
	}

	calculateNumericalChange(number, negative, up, unit) {
		number = _.toNumber(number);

		if (negative) {
			up = !up;
		}

		if (up) {
			number++;
		}
		else {
			number--;
		}

		if (number == 0) {
			negative = false;
		}

		let value = `${negative ? '-' : ''}${number}`;

		if (unit) {
			value += unit;
		}

		return value.toString();
	}

	getDropdownTemplate() {
		const {disabled, modified} = this.props;

		return [
			{
				action: this.handleReset.bind(this),
				disabled: disabled || !modified,
				icon: 'undo',
				label: 'Reset'
			},
			{
				action: this.handleLock.bind(this),
				disabled: !modified,
				icon: disabled ? 'unlock' : 'lock',
				label: disabled ? 'Unlock' : 'Lock'
			}
		];
	}

	handleAutoCompleteClick(event) {
		const value = event.target.getAttribute('data-value');

		const {name, onChange} = this.props;

		this.setState({
			autoCompleteIndex: 0
		});

		onChange(name, value);
	}

	handleAutoCompleteMouseEnter(event) {
		this.setState({
			autoCompleteActive: true
		});
	}

	handleAutoCompleteMouseLeave(event) {
		this.setState({
			autoCompleteActive: false
		});
	}

	handleColorPickerTriggerClick(name, resolvedValue) {
		const {disabled, onColorPickerTriggerClick} = this.props;

		if (disabled) {
			return;
		}

		onColorPickerTriggerClick(name, resolvedValue);
	}

	handleInputBlur(event) {
		this.setState({
			focused: false
		});
	}

	handleInputChange(event) {
		let {onChange, name} = this.props;

		onChange(name, event.currentTarget.value);
	}

	handleInputFocus(event) {
		this.setState({
			focused: true
		});
	}

	handleInputKeyDown(event) {
		let {autoCompleteActive, autoCompleteIndex} = this.state;

		if (!autoCompleteActive) {
			return;
		}

		let key = event.key;

		let autoCompleteList = this._getAutoCompleteMenuList();

		let listLength = autoCompleteList.length;

		if (key == 'Enter') {
			let value = autoCompleteList[autoCompleteIndex].getAttribute('data-value');

			let {name, onChange} = this.props;

			this.setState({
				autoCompleteIndex: 0
			});

			onChange(name, value);
		}
		else if (key == 'ArrowDown') {
			if (autoCompleteIndex + 1 < listLength) {
				this.setState({
					autoCompleteIndex: autoCompleteIndex + 1
				});
			}
		}
		else if (key == 'ArrowUp') {
			if (autoCompleteIndex > 0) {
				this.setState({
					autoCompleteIndex: autoCompleteIndex - 1
				});
			}
		}
	}

	handleLock() {
		const {disabled, name, onLock} = this.props;

		onLock(name, disabled);
	}

	handleRangePickerClick(up) {
		const {disabled, name, onChange, value} = this.props;

		if (disabled) {
			return;
		}

		let numberMatch = value.match(numberRegex);
		let unitMatch = value.match(unitRegex);

		if (unitMatch) {
			let [input, negative, number, unit] = unitMatch;

			onChange(name, this.calculateNumericalChange(number, negative, up, unit));
		}
		else if (numberMatch) {
			let [input, negative, number] = numberMatch;

			onChange(name, this.calculateNumericalChange(number, negative, up));
		}
	}

	handleReset() {
		const {name, onReset} = this.props;

		onReset(name);
	}

	_isAutoCompleteActive() {
		let {autoCompleteMenu} = this.refs;

		return autoCompleteMenu && autoCompleteMenu.children.length;
	}

	_getAutoCompleteMenuList() {
		return this.refs.autoCompleteMenu.children;
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

	_isRange(value) {
		return unitRegex.test(value) || numberRegex.test(value);
	}
}

VariableInput.propTypes = {
	disabled: PropTypes.bool,
	label: PropTypes.string.isRequired,
	modified: PropTypes.bool,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onColorPickerTriggerClick: PropTypes.func.isRequired,
	onLock: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired,
	sourceVariables: ImmutablePropTypes.orderedMap.isRequired,
	value: PropTypes.string.isRequired,
	variables: ImmutablePropTypes.orderedMap.isRequired
};

const mapStateToProps = (state, {name, value}) => {
	const sourceVariables = state.get('sourceVariables');

	return {
		disabled: state.get('lockedVariables').has(name),
		modified: value !== sourceVariables.get(name).get('value'),
		previewPopout: state.get('previewPopout'),
		sourceVariables: state.get('sourceVariables'),
		variables: state.get('variables')
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: (name, value) => {
			dispatch(setVariable(name, value));
		},
		onColorPickerTriggerClick: (name) => {
			dispatch(setColorVariableName(name));
		},
		onLock: (name, locked) => {
			dispatch(toggleLockedVariable(name));
		},
		onReset: (name) => {
			dispatch(resetVariable(name));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(VariableInput);
