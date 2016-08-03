'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterInput = function (_Component) {
	_inherits(FilterInput, _Component);

	function FilterInput() {
		_classCallCheck(this, FilterInput);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(FilterInput).apply(this, arguments));
	}

	_createClass(FilterInput, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var onChange = _props.onChange;
			var value = _props.value;

			var others = _objectWithoutProperties(_props, ['onChange', 'value']);

			var icon = value ? 'times' : 'search';

			return _react2.default.createElement(
				'div',
				{ className: 'form-group side-menu-filter' },
				_react2.default.createElement('input', _extends({
					className: 'form-control side-menu-filter-input',
					onChange: this.handleFilterInputChange.bind(this),
					ref: 'filterInput',
					value: value
				}, others)),
				_react2.default.createElement(
					'a',
					{ href: 'javascript:;', onClick: this.handleFilterIconClick.bind(this) },
					_react2.default.createElement(_Icon2.default, { icon: icon })
				)
			);
		}
	}, {
		key: 'handleFilterIconClick',
		value: function handleFilterIconClick(event) {
			var _props2 = this.props;
			var onChange = _props2.onChange;
			var value = _props2.value;


			if (value) {
				onChange('');
			} else {
				this.refs.filterInput.focus();
			}
		}
	}, {
		key: 'handleFilterInputChange',
		value: function handleFilterInputChange(event) {
			this.props.onChange(event.currentTarget.value);
		}
	}]);

	return FilterInput;
}(_react.Component);

;

FilterInput.propTypes = {
	value: _react.PropTypes.string,
	onChange: _react.PropTypes.func.isRequired
};

exports.default = FilterInput;