'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactColor = require('react-color');

var _reactColor2 = _interopRequireDefault(_reactColor);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariableInput = function (_Component) {
	_inherits(VariableInput, _Component);

	function VariableInput() {
		_classCallCheck(this, VariableInput);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(VariableInput).apply(this, arguments));
	}

	_createClass(VariableInput, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var name = _props.name;
			var value = _props.value;


			return _react2.default.createElement(
				'div',
				{ className: 'color-picker-panel' },
				_react2.default.createElement(
					'div',
					{ className: 'card color-picker-panel-inner' },
					_react2.default.createElement(
						'div',
						{ className: 'color-picker-panel-header' },
						_react2.default.createElement(
							'span',
							{ className: 'color-picker-panel-name' },
							name
						),
						_react2.default.createElement(
							'a',
							{ className: 'color-picker-panel-close', href: 'javascript:;', onClick: this.props.onClose },
							_react2.default.createElement(_Icon2.default, { icon: 'times' })
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'color-picker-panel-body' },
						_react2.default.createElement(_reactColor2.default, { color: value, onChange: this.handleChange.bind(this), type: 'chrome' })
					)
				)
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

			this.props.onChange(value, this.props.name);
		}
	}]);

	return VariableInput;
}(_react.Component);

VariableInput.propTypes = {
	name: _react.PropTypes.string.isRequired,
	onChange: _react.PropTypes.func.isRequired,
	onClose: _react.PropTypes.func.isRequired,
	value: _react.PropTypes.string.isRequired
};

exports.default = VariableInput;