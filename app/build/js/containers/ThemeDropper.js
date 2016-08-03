'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _FileDropper = require('../components/FileDropper');

var _FileDropper2 = _interopRequireDefault(_FileDropper);

var _ThemeLabel = require('../containers/ThemeLabel');

var _ThemeLabel2 = _interopRequireDefault(_ThemeLabel);

var _theme = require('../actions/theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThemeDropper = function (_Component) {
	_inherits(ThemeDropper, _Component);

	function ThemeDropper(props) {
		_classCallCheck(this, ThemeDropper);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ThemeDropper).call(this, props));
	}

	_createClass(ThemeDropper, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_FileDropper2.default,
				{ onDrop: this.handleDrop.bind(this) },
				_react2.default.createElement(_ThemeLabel2.default, null)
			);
		}
	}, {
		key: 'handleDrop',
		value: function handleDrop(files) {
			var file = files[0];

			this.props.dispatch((0, _theme.setTheme)(file.path));
		}
	}]);

	return ThemeDropper;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		dispatch: dispatch
	};
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ThemeDropper);