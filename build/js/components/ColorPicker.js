'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactColor = require('react-color');

var _reactColor2 = _interopRequireDefault(_reactColor);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
			showOverlay: false
		};
		return _this;
	}

	_createClass(VariableInput, [{
		key: 'render',
		value: function render() {
			var value = this.props.value;


			var colorPickerOverlay = '';

			if (this.state.showOverlay) {
				colorPickerOverlay = _react2.default.createElement(
					'div',
					{ className: 'color-picker-overlay', ref: 'colorPickerOverlay' },
					_react2.default.createElement(_reactColor2.default, { color: value, onChange: this.handleChange.bind(this), type: 'chrome' })
				);
			}

			return _react2.default.createElement(
				'div',
				{ className: 'color-picker' },
				_react2.default.createElement(
					'div',
					{ className: 'color-picker-trigger', onClick: this.handleTriggerClick.bind(this) },
					_react2.default.createElement('div', { className: 'color-picker-trigger-preview', style: this._getTriggerStyle(value) }),
					_react2.default.createElement('div', { className: 'color-picker-trigger-checkerboard' })
				),
				colorPickerOverlay
			);
		}
	}, {
		key: 'handleChange',
		value: function handleChange(color) {
			var value = void 0;

			if (color.rgb.a < 1) {
				var _color$rgb = color.rgb;
				var a = _color$rgb.a;
				var b = _color$rgb.b;
				var g = _color$rgb.g;
				var r = _color$rgb.r;


				value = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
			} else {
				value = '#' + color.hex.toUpperCase();
			}

			this.props.onChange(value);
		}
	}, {
		key: 'handleClickOutside',
		value: function handleClickOutside() {
			this.setState({
				showOverlay: false
			});
		}
	}, {
		key: 'handleTriggerClick',
		value: function handleTriggerClick(event) {
			this.setState({
				showOverlay: !this.state.showOverlay
			});
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
	}]);

	return VariableInput;
}(_react.Component);

VariableInput.propTypes = {
	onChange: _react.PropTypes.func.isRequired,
	value: _react.PropTypes.string.isRequired
};

exports.default = (0, _reactClickOutside2.default)(VariableInput);