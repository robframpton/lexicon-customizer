'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideMenu = function (_Component) {
	_inherits(SideMenu, _Component);

	function SideMenu(props) {
		_classCallCheck(this, SideMenu);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SideMenu).call(this, props));

		var instance = _this;

		_this.state = {};

		props.groups.forEach(function (item, index) {
			instance.state[instance._getListRef(item)] = true;
		});
		return _this;
	}

	_createClass(SideMenu, [{
		key: 'render',
		value: function render() {
			var instance = this;

			return _react2.default.createElement(
				'div',
				{ className: 'side-menu' },
				_react2.default.createElement(
					'h3',
					null,
					this.props.header
				),
				this.props.groups.map(function (item, index) {
					var listRef = instance._getListRef(item);

					var listContent = instance.state[listRef] ? instance.renderMenuList(item, instance.props) : '';

					return _react2.default.createElement(
						'div',
						{ className: 'side-menu-group', 'data-id': item.id, key: item.id },
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', onClick: instance.onSideMenuHeaderClick.bind(instance, listRef) },
							_react2.default.createElement(
								'h4',
								null,
								item.title
							)
						),
						listContent
					);
				})
			);
		}
	}, {
		key: 'renderMenuList',
		value: function renderMenuList(item, props) {
			var listRef = this._getListRef(item);

			return _react2.default.createElement(
				'ul',
				{ className: 'side-menu-list' },
				this.renderMenuListItems(item, props)
			);
		}
	}, {
		key: 'renderMenuListItems',
		value: function renderMenuListItems(item, _ref) {
			var onClick = _ref.onClick;
			var _ref$selectedItem = _ref.selectedItem;
			var selectedItem = _ref$selectedItem === undefined ? '' : _ref$selectedItem;

			return item.items.map(function (name) {
				var className = 'side-menu-list-item';

				if (name == selectedItem) {
					className += ' selected';
				}

				var displayName = name.replace('-', ' ');

				displayName = displayName[0].toUpperCase() + displayName.slice(1, displayName.length);

				return _react2.default.createElement(
					'li',
					{
						className: className,
						key: item.it + '_' + name
					},
					_react2.default.createElement(
						'a',
						{
							'data-group-id': item.id,
							'data-name': name,
							href: 'javascript:;',
							onClick: onClick
						},
						displayName
					)
				);
			});
		}
	}, {
		key: 'onSideMenuHeaderClick',
		value: function onSideMenuHeaderClick(listRef) {
			var newState = {};

			newState[listRef] = !this.state[listRef];

			this.setState(newState);
		}
	}, {
		key: '_getListRef',
		value: function _getListRef(group) {
			return group.id + 'List';
		}
	}]);

	return SideMenu;
}(_react.Component);

;

SideMenu.propTypes = {
	groups: _react.PropTypes.array.isRequired,
	onClick: _react.PropTypes.func.isRequired,
	selectedItem: _react.PropTypes.string
};

exports.default = SideMenu;