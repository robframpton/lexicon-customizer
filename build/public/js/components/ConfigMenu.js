"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfigMenu = function (_Component) {
	_inherits(ConfigMenu, _Component);

	function ConfigMenu() {
		_classCallCheck(this, ConfigMenu);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ConfigMenu).apply(this, arguments));
	}

	_createClass(ConfigMenu, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"header",
				{ className: "lexicon-customizer-header" },
				_react2.default.createElement(
					"h1",
					null,
					"Lexicon Customizer"
				),
				_react2.default.createElement(
					"div",
					{ className: "lexicon-customizer-actions" },
					_react2.default.createElement(
						"a",
						{ className: "config-panel-toggle-btn", href: "javascript:;" },
						_react2.default.createElement("img", { src: "../images/cog_white.svg" })
					),
					_react2.default.createElement(
						"div",
						{ className: "lexicon-customizer-config-panel open" },
						_react2.default.createElement(
							"div",
							{ className: "radio" },
							_react2.default.createElement(
								"label",
								null,
								_react2.default.createElement("input", { checked: true, name: "baseLexiconTheme", type: "radio", value: "lexiconBase" }),
								"Lexicon Base"
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "radio" },
							_react2.default.createElement(
								"label",
								null,
								_react2.default.createElement("input", { checked: false, name: "baseLexiconTheme", type: "radio", value: "atlasTheme" }),
								"Atlas Theme"
							)
						),
						_react2.default.createElement(
							"span",
							null,
							"Current theme:"
						),
						_react2.default.createElement(
							"button",
							{ className: "btn btn-default" },
							"Reset"
						),
						_react2.default.createElement(
							"button",
							{ className: "btn btn-default" },
							"Clear Theme"
						)
					)
				)
			);
		}
	}]);

	return ConfigMenu;
}(_react.Component);

exports.default = ConfigMenu;