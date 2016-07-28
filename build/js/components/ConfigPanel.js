'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ClearThemeButton = require('../containers/action_buttons/ClearThemeButton');

var _ClearThemeButton2 = _interopRequireDefault(_ClearThemeButton);

var _ConfigPanelGroup = require('../components/ConfigPanelGroup');

var _ConfigPanelGroup2 = _interopRequireDefault(_ConfigPanelGroup);

var _ExportButton = require('../containers/action_buttons/ExportButton');

var _ExportButton2 = _interopRequireDefault(_ExportButton);

var _ImportButton = require('../containers/action_buttons/ImportButton');

var _ImportButton2 = _interopRequireDefault(_ImportButton);

var _OpenDevToolsButton = require('../components/OpenDevToolsButton');

var _OpenDevToolsButton2 = _interopRequireDefault(_OpenDevToolsButton);

var _ResetButton = require('../containers/action_buttons/ResetButton');

var _ResetButton2 = _interopRequireDefault(_ResetButton);

var _ResetComponentButton = require('../containers/action_buttons/ResetComponentButton');

var _ResetComponentButton2 = _interopRequireDefault(_ResetComponentButton);

var _ThemeDropper = require('../containers/ThemeDropper');

var _ThemeDropper2 = _interopRequireDefault(_ThemeDropper);

var _ThemeRadio = require('../containers/ThemeRadio');

var _ThemeRadio2 = _interopRequireDefault(_ThemeRadio);

var _Icon = require('../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _PopoutPreviewButton = require('../containers/action_buttons/PopoutPreviewButton');

var _PopoutPreviewButton2 = _interopRequireDefault(_PopoutPreviewButton);

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
				_react2.default.createElement(
					_ConfigPanelGroup2.default,
					{ label: 'Variables' },
					_react2.default.createElement(_ThemeRadio2.default, { label: 'Lexicon Base', value: 'lexiconBase' }),
					_react2.default.createElement(_ThemeRadio2.default, { label: 'Atlas Theme', value: 'atlasTheme' }),
					_react2.default.createElement(
						_ExportButton2.default,
						null,
						'Export Variables'
					),
					_react2.default.createElement(
						_ImportButton2.default,
						null,
						'Import Variables'
					),
					_react2.default.createElement(
						_ResetButton2.default,
						null,
						'Reset All'
					),
					_react2.default.createElement(
						_ResetComponentButton2.default,
						null,
						'Reset Component'
					)
				),
				_react2.default.createElement(
					_ConfigPanelGroup2.default,
					{ label: 'Preview Frame' },
					_react2.default.createElement(
						_OpenDevToolsButton2.default,
						null,
						'Inspect Preview'
					),
					_react2.default.createElement(
						_PopoutPreviewButton2.default,
						null,
						'Popout Preview'
					)
				),
				_react2.default.createElement(
					_ConfigPanelGroup2.default,
					{ label: 'Theme' },
					_react2.default.createElement(_ThemeDropper2.default, null),
					_react2.default.createElement(
						_ClearThemeButton2.default,
						null,
						'Clear Theme'
					)
				)
			);
		}
	}]);

	return ConfigPanel;
}(_react.Component);

exports.default = ConfigPanel;