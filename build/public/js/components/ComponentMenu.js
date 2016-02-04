'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _componentScraper = require('../../../../lib/component-scraper');

var _componentScraper2 = _interopRequireDefault(_componentScraper);

var _sass = require('../../../../lib/sass');

var _sass2 = _interopRequireDefault(_sass);

var _theme = require('../../../../lib/theme');

var _theme2 = _interopRequireDefault(_theme);

var _user_config = require('../../../../lib/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComponentMenu = function (_Component) {
	_inherits(ComponentMenu, _Component);

	function ComponentMenu() {
		_classCallCheck(this, ComponentMenu);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ComponentMenu).apply(this, arguments));
	}

	_createClass(ComponentMenu, [{
		key: 'render',
		value: function render() {
			_react2.default.createElement(
				'div',
				{ className: 'component-menu' },
				_react2.default.createElement(
					'h3',
					null,
					'Componenets'
				),
				_react2.default.createElement(
					'ul',
					{ className: 'component-list' },
					this.renderComponentList()
				)
			);
		}
	}, {
		key: 'renderComponentList',
		value: function renderComponentList() {
			var instance = this;

			var components = this.props.components;

			return Object.keys(components).map(function (name) {
				var file = components[name];

				var className = 'component-item';

				if (name == instance.props.selectedComponent) {
					className += ' selected';
				}

				return _react2.default.createElement(
					'li',
					{
						className: className,
						'data-file': file,
						key: name
					},
					_react2.default.createElement(
						'a',
						{ href: 'javascript:;', 'data-file': file, 'data-name': name, onClick: instance.handleClick.bind(instance) },
						name
					)
				);
			});
		}
	}, {
		key: 'handleClick',
		value: function handleClick(event) {
			this.props.onUserClick(event);
		}
	}]);

	return ComponentMenu;
}(_react.Component);

// ComponentMenu.propTypes = {
// 	components: PropTypes.object.isRequired,
// 	onUserClick: PropTypes.func.isRequired,
// 	selectedComponent: PropTypes.string
// }

exports.default = ComponentMenu;