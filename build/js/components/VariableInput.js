'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ColorPicker = require('./ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _color = require('../lib/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariableInput = function (_Component) {
	_inherits(VariableInput, _Component);

	function VariableInput(props) {
		_classCallCheck(this, VariableInput);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VariableInput).call(this, props));

		_this.state = {
			autoCompleteActive: false,
			autoCompleteIndex: 0,
			colorPickerVisible: false,
			focused: false
		};
		return _this;
	}

	_createClass(VariableInput, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var label = _props.label;
			var name = _props.name;
			var onChange = _props.onChange;
			var value = _props.value;
			var variables = _props.variables;
			var _state = this.state;
			var autoCompleteActive = _state.autoCompleteActive;
			var focused = _state.focused;


			var autoComplete = '';
			var colorPickerTrigger = '';

			var className = 'form-control';

			if (autoCompleteActive) {
				focused = true;
			}

			if (focused && value && value.length > 1 && value[0] == '$') {
				autoComplete = this._renderAutoComplete(name, value, variables);
			}

			if (this.props.color) {
				className += ' color-input';

				var resolvedValue = (0, _color.resolveColorValue)(name, value, variables);

				colorPickerTrigger = _react2.default.createElement(
					'div',
					{ className: 'color-picker-trigger', onClick: this.props.onColorPickerTriggerClick.bind(null, name) },
					_react2.default.createElement('div', { className: 'color-picker-trigger-preview', style: this._getTriggerStyle(value) }),
					_react2.default.createElement('div', { className: 'color-picker-trigger-checkerboard' })
				);
			}

			return _react2.default.createElement(
				'div',
				{ className: 'form-group variable-input' },
				_react2.default.createElement(
					'label',
					{ htmlFor: name },
					name
				),
				_react2.default.createElement('input', {
					className: className,
					name: name,
					onBlur: this.handleInputBlur.bind(this),
					onChange: this.handleInputChange.bind(this),
					onFocus: this.handleInputFocus.bind(this),
					onKeyDown: this.handleInputKeyDown.bind(this),
					ref: 'input',
					type: 'text',
					value: value
				}),
				autoComplete,
				colorPickerTrigger
			);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(event) {
			var autoCompleteActive = this.state.autoCompleteActive;


			var active = this._isAutoCompleteActive();

			if (autoCompleteActive != active) {
				this.setState({
					autoCompleteActive: active
				});
			}
		}
	}, {
		key: 'handleAutoCompleteClick',
		value: function handleAutoCompleteClick(event) {
			var value = event.target.getAttribute('data-value');

			var _props2 = this.props;
			var name = _props2.name;
			var onChange = _props2.onChange;


			this.setState({
				autoCompleteIndex: 0
			});

			onChange(name, value);
		}
	}, {
		key: 'handleAutoCompleteMouseEnter',
		value: function handleAutoCompleteMouseEnter(event) {
			this.setState({
				autoCompleteActive: true
			});
		}
	}, {
		key: 'handleAutoCompleteMouseLeave',
		value: function handleAutoCompleteMouseLeave(event) {
			this.setState({
				autoCompleteActive: false
			});
		}
	}, {
		key: 'handleColorPickerChange',
		value: function handleColorPickerChange(value) {
			var _props3 = this.props;
			var onChange = _props3.onChange;
			var name = _props3.name;


			onChange(name, value);
		}
	}, {
		key: 'handleInputBlur',
		value: function handleInputBlur(event) {
			this.setState({
				focused: false
			});
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var _props4 = this.props;
			var onChange = _props4.onChange;
			var name = _props4.name;


			onChange(name, event.currentTarget.value);
		}
	}, {
		key: 'handleInputFocus',
		value: function handleInputFocus(event) {
			this.setState({
				focused: true
			});
		}
	}, {
		key: 'handleInputKeyDown',
		value: function handleInputKeyDown(event) {
			var _state2 = this.state;
			var autoCompleteActive = _state2.autoCompleteActive;
			var autoCompleteIndex = _state2.autoCompleteIndex;


			if (!autoCompleteActive) {
				return;
			}

			var key = event.key;

			var autoCompleteList = this._getAutoCompleteMenuList();

			var listLength = autoCompleteList.length;

			if (key == 'Enter') {
				var value = autoCompleteList[autoCompleteIndex].getAttribute('data-value');

				var _props5 = this.props;
				var name = _props5.name;
				var onChange = _props5.onChange;


				this.setState({
					autoCompleteIndex: 0
				});

				onChange(name, value);
			} else if (key == 'ArrowDown') {
				if (autoCompleteIndex + 1 < listLength) {
					this.setState({
						autoCompleteIndex: autoCompleteIndex + 1
					});
				}
			} else if (key == 'ArrowUp') {
				if (autoCompleteIndex > 0) {
					this.setState({
						autoCompleteIndex: autoCompleteIndex - 1
					});
				}
			}

			this.setState({
				colorPickerVisible: false
			});
		}
	}, {
		key: '_isAutoCompleteActive',
		value: function _isAutoCompleteActive() {
			var autoCompleteMenu = this.refs.autoCompleteMenu;


			return autoCompleteMenu && autoCompleteMenu.children.length;
		}
	}, {
		key: '_getAutoCompleteMenuList',
		value: function _getAutoCompleteMenuList() {
			return this.refs.autoCompleteMenu.children;
		}
	}, {
		key: '_getTriggerStyle',
		value: function _getTriggerStyle(resolvedValue) {
			var triggerStyle = {
				backgroundColor: resolvedValue
			};

			resolvedValue = resolvedValue.toLowerCase();

			if (resolvedValue == '#fff' || resolvedValue == '#ffffff') {
				triggerStyle.border = '1px solid #EEE';
			}

			return triggerStyle;
		}
	}, {
		key: '_renderAutoComplete',
		value: function _renderAutoComplete(name, value, variables) {
			var _this2 = this;

			if (variables.has(value)) {
				return '';
			}

			variables = variables.takeUntil(function (value, key) {
				return key === name;
			});

			var autoCompleteIndex = this.state.autoCompleteIndex;
			var reducedIndex = 0;

			var items = variables.toArray().reduce(function (result, item) {
				var itemName = item.get('name');

				if (itemName.indexOf(value) == 0) {
					result.push(_react2.default.createElement(
						'div',
						{
							className: 'auto-complete-item',
							'data-selected': autoCompleteIndex == reducedIndex,
							'data-value': itemName,
							key: itemName,
							onClick: _this2.handleAutoCompleteClick.bind(_this2)
						},
						itemName
					));

					reducedIndex++;
				}

				return result;
			}, []);

			return _react2.default.createElement(
				'div',
				{
					className: 'input-auto-complete-menu',
					onMouseEnter: this.handleAutoCompleteMouseEnter.bind(this),
					onMouseLeave: this.handleAutoCompleteMouseLeave.bind(this),
					ref: 'autoCompleteMenu'
				},
				items
			);
		}
	}]);

	return VariableInput;
}(_react.Component);

VariableInput.propTypes = {
	label: _react.PropTypes.string.isRequired,
	name: _react.PropTypes.string.isRequired,
	onChange: _react.PropTypes.func.isRequired,
	onColorPickerTriggerClick: _react.PropTypes.func.isRequired,
	value: _react.PropTypes.string.isRequired
};

exports.default = (0, _reactClickOutside2.default)(VariableInput);