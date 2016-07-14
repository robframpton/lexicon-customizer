'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FilterInput = require('../components/FilterInput');

var _FilterInput2 = _interopRequireDefault(_FilterInput);

var _Icon = require('../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideMenu = function (_Component) {
	_inherits(SideMenu, _Component);

	function SideMenu(props) {
		_classCallCheck(this, SideMenu);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SideMenu).call(this, props));

		_this.state = {
			filterText: ''
		};
		return _this;
	}

	_createClass(SideMenu, [{
		key: 'render',
		value: function render() {
			var getDisplayName = this._getDisplayName;

			var _props = this.props;
			var onClick = _props.onClick;
			var selectedItem = _props.selectedItem;


			var componentArray = this._getComponentArray();

			return _react2.default.createElement(
				'div',
				{ className: 'side-menu' },
				_react2.default.createElement(
					'h3',
					null,
					this.props.header
				),
				_react2.default.createElement(_FilterInput2.default, { onChange: this.handleFilterInputChange.bind(this), value: this.state.filterText }),
				_react2.default.createElement(
					'ul',
					{ className: 'side-menu-list' },
					componentArray.map(function (item, index) {
						var className = 'side-menu-list-item';

						if (item === selectedItem) {
							className += ' selected';
						}

						return _react2.default.createElement(
							'li',
							{
								className: className,
								key: item
							},
							_react2.default.createElement(
								'a',
								{
									'data-name': item,
									href: 'javascript:;',
									onClick: onClick
								},
								getDisplayName(item)
							)
						);
					})
				)
			);
		}
	}, {
		key: 'handleFilterInputChange',
		value: function handleFilterInputChange(value) {
			this.setState({
				filterText: value
			});
		}
	}, {
		key: '_getComponentArray',
		value: function _getComponentArray() {
			var components = this.props.components;
			var filterText = this.state.filterText;


			var componentsArray = components.toArray().sort();

			if (filterText) {
				componentsArray = componentsArray.filter(function (component) {
					return component.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
				});
			}

			return componentsArray;
		}
	}, {
		key: '_getDisplayName',
		value: function _getDisplayName(name) {
			var displayName = name.replace(/-/g, ' ');

			return displayName[0].toUpperCase() + displayName.slice(1, displayName.length);
		}
	}]);

	return SideMenu;
}(_react.Component);

;

SideMenu.propTypes = {
	components: _reactImmutableProptypes2.default.list.isRequired,
	onClick: _react.PropTypes.func.isRequired,
	selectedItem: _react.PropTypes.string
};

exports.default = SideMenu;