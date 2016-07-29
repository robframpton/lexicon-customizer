'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
	_inherits(Dropdown, _Component);

	function Dropdown(props) {
		_classCallCheck(this, Dropdown);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).call(this, props));

		_this.state = {
			open: false
		};
		return _this;
	}

	_createClass(Dropdown, [{
		key: 'render',
		value: function render() {
			var children = this.props.children;


			return _react2.default.createElement(
				'div',
				{ className: 'dropdown' },
				_react2.default.createElement(
					'a',
					{ className: 'dropdown-trigger', href: 'javascript:;', onClick: this.handleTriggerClick.bind(this) },
					children
				),
				this.renderOptions()
			);
		}
	}, {
		key: 'renderOptions',
		value: function renderOptions() {
			var instance = this;

			var open = this.state.open;
			var options = this.props.options;


			var className = 'dropdown-options';

			if (open) {
				className += ' open';
			}

			return _react2.default.createElement(
				'div',
				{ className: className },
				options.map(function (option, index) {
					var disabled = option.disabled;
					var icon = option.icon;
					var label = option.label;


					var optionClassName = 'dropdown-option';

					if (disabled) {
						optionClassName += ' disabled';
					}

					return _react2.default.createElement(
						'div',
						{ className: optionClassName },
						_react2.default.createElement(
							'a',
							{
								className: 'dropdown-option-link',
								href: 'javascript:;',
								onClick: instance.handleOptionClick.bind(instance, option)
							},
							_react2.default.createElement(_Icon2.default, { icon: icon }),
							label
						)
					);
				})
			);
		}
	}, {
		key: 'close',
		value: function close() {
			this.setState({
				open: false
			});
		}
	}, {
		key: 'handleClickOutside',
		value: function handleClickOutside() {
			this.close();
		}
	}, {
		key: 'handleOptionClick',
		value: function handleOptionClick(option) {
			var action = option.action;
			var disabled = option.disabled;


			if (disabled) {
				return;
			}

			var handleOptionClick = this.props.handleOptionClick;


			this.close();

			if (action) {
				action(option);
			} else if (handleOptionClick) {
				handleOptionClick(option);
			}
		}
	}, {
		key: 'handleTriggerClick',
		value: function handleTriggerClick(event) {
			this.setState({
				open: !this.state.open
			});
		}
	}]);

	return Dropdown;
}(_react.Component);

Dropdown.propTypes = {
	handleOptionClick: _react.PropTypes.func,
	options: _react.PropTypes.array.isRequired
};

exports.default = (0, _reactClickOutside2.default)(Dropdown);