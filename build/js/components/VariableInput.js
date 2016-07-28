'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('../components/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Icon = require('../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _color = require('../lib/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var numberRegex = /^([0-9]+)$/;

var unitRegex = /^(-)?([0-9\.]+)(px|em|ex|%|in|cm|mm|pt|pc)$/;

var VariableInput = function (_Component) {
	_inherits(VariableInput, _Component);

	function VariableInput(props) {
		_classCallCheck(this, VariableInput);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VariableInput).call(this, props));

		_this.state = {
			autoCompleteActive: false,
			autoCompleteIndex: 0,
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
			var inputPlugin = '';

			var className = 'form-control';

			if (autoCompleteActive) {
				focused = true;
			}

			if (focused && value && value.length > 1 && value[0] == '$') {
				autoComplete = this._renderAutoComplete(name, value, variables);
			}

			if (this._isColor(name)) {
				className += ' color-input';

				inputPlugin = this.renderColorPickerTrigger(name, value, variables);
			} else if (this._isRange(value)) {
				inputPlugin = this.renderRangePicker(name, value);
			}

			return _react2.default.createElement(
				'div',
				{ className: 'form-group variable-input' },
				this.renderDropdown(),
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
				inputPlugin
			);
		}
	}, {
		key: 'renderAutoComplete',
		value: function renderAutoComplete(name, value, variables) {
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
	}, {
		key: 'renderColorPickerTrigger',
		value: function renderColorPickerTrigger(name, value, variables) {
			var resolvedValue = (0, _color.resolveColorValue)(name, value, variables);

			return _react2.default.createElement(
				'div',
				{ className: 'color-picker-trigger', onClick: this.props.onColorPickerTriggerClick.bind(null, name, resolvedValue) },
				_react2.default.createElement('div', { className: 'color-picker-trigger-preview', style: this._getTriggerStyle(resolvedValue) }),
				_react2.default.createElement('div', { className: 'color-picker-trigger-checkerboard' })
			);
		}
	}, {
		key: 'renderRangePicker',
		value: function renderRangePicker() {
			return _react2.default.createElement(
				'div',
				{ className: 'range-picker' },
				_react2.default.createElement(
					'a',
					{
						className: 'range-picker-up',
						href: 'javascript:;',
						onClick: this.handleRangePickerClick.bind(this, true)
					},
					_react2.default.createElement(_Icon2.default, { icon: 'angle-up' })
				),
				_react2.default.createElement(
					'a',
					{
						className: 'range-picker-down',
						href: 'javascript:;',
						onClick: this.handleRangePickerClick.bind(this, false)
					},
					_react2.default.createElement(_Icon2.default, { icon: 'angle-down' })
				)
			);
		}
	}, {
		key: 'renderDropdown',
		value: function renderDropdown() {
			var _props2 = this.props;
			var dropdownTemplate = _props2.dropdownTemplate;
			var name = _props2.name;


			dropdownTemplate = _.map(dropdownTemplate, function (item) {
				return _.assign({}, item, {
					name: name
				});
			});

			return _react2.default.createElement(
				_Dropdown2.default,
				{ options: dropdownTemplate },
				_react2.default.createElement(_Icon2.default, { icon: 'ellipsis-h' })
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

			var _props3 = this.props;
			var name = _props3.name;
			var onChange = _props3.onChange;


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
		}
	}, {
		key: 'handleRangePickerClick',
		value: function handleRangePickerClick(up) {
			var _props6 = this.props;
			var name = _props6.name;
			var onChange = _props6.onChange;
			var value = _props6.value;


			var numberMatch = value.match(numberRegex);
			var unitMatch = value.match(unitRegex);

			if (unitMatch) {
				var _unitMatch = _slicedToArray(unitMatch, 4);

				var input = _unitMatch[0];
				var negative = _unitMatch[1];
				var amount = _unitMatch[2];
				var unit = _unitMatch[3];


				amount = _.toNumber(amount);

				if (negative) {
					up = !up;
				}

				if (up) {
					amount++;
				} else {
					amount--;
				}

				if (amount == 0) {
					negative = false;
				}

				input = '' + (negative ? '-' : '') + amount + unit;

				onChange(name, input);
			} else if (numberMatch) {
				var _amount = _.toNumber(numberMatch[1]);

				if (up) {
					_amount++;
				} else {
					_amount--;
				}

				onChange(name, _amount.toString());
			}
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
		key: '_isColor',
		value: function _isColor(name) {
			var color = false;

			if (name.indexOf('-bg') > -1 || name.indexOf('brand') > -1 || name.indexOf('color') > -1 || name.indexOf('gray') > -1 || _.endsWith(name, '-border') || _.endsWith(name, '-text')) {
				color = true;
			}

			return color;
		}
	}, {
		key: '_isRange',
		value: function _isRange(value) {
			return unitRegex.test(value) || numberRegex.test(value);
		}
	}]);

	return VariableInput;
}(_react.Component);

VariableInput.propTypes = {
	dropdownTemplate: _react.PropTypes.array,
	label: _react.PropTypes.string.isRequired,
	name: _react.PropTypes.string.isRequired,
	onChange: _react.PropTypes.func.isRequired,
	onColorPickerTriggerClick: _react.PropTypes.func.isRequired,
	value: _react.PropTypes.string.isRequired
};

exports.default = (0, _reactClickOutside2.default)(VariableInput);