'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ClearThemeButton = require('../containers/ClearThemeButton');

var _ClearThemeButton2 = _interopRequireDefault(_ClearThemeButton);

var _ResetButton = require('../containers/ResetButton');

var _ResetButton2 = _interopRequireDefault(_ResetButton);

var _ThemeLabel = require('../containers/ThemeLabel');

var _ThemeLabel2 = _interopRequireDefault(_ThemeLabel);

var _ThemeRadio = require('../containers/ThemeRadio');

var _ThemeRadio2 = _interopRequireDefault(_ThemeRadio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfigPanel = function (_Component) {
	_inherits(ConfigPanel, _Component);

	function ConfigPanel() {
		_classCallCheck(this, ConfigPanel);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ConfigPanel).apply(this, arguments));
	}

	_createClass(ConfigPanel, [{
		key: 'render',
		value: function render() {
			var className = 'lexicon-customizer-config-panel';

			if (this.props.open) {
				className += ' open';
			}

			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement(_ThemeRadio2.default, { label: 'Lexicon Base', value: 'lexiconBase' }),
				_react2.default.createElement(_ThemeRadio2.default, { label: 'Atlas Theme', value: 'atlasTheme' }),
				_react2.default.createElement(_ThemeLabel2.default, null),
				_react2.default.createElement(_ResetButton2.default, null),
				_react2.default.createElement(_ClearThemeButton2.default, null)
			);
		}
	}]);

	return ConfigPanel;
}(_react.Component);

exports.default = ConfigPanel;