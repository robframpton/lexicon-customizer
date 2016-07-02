'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _ComponentSideMenu = require('../containers/ComponentSideMenu');

var _ComponentSideMenu2 = _interopRequireDefault(_ComponentSideMenu);

var _ErrorPopup = require('../components/ErrorPopup');

var _ErrorPopup2 = _interopRequireDefault(_ErrorPopup);

var _Header = require('../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _PreviewBox = require('../containers/PreviewBox');

var _PreviewBox2 = _interopRequireDefault(_PreviewBox);

var _VariablesEditor = require('../containers/VariablesEditor');

var _VariablesEditor2 = _interopRequireDefault(_VariablesEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LexiconCustomizer = function (_Component) {
	_inherits(LexiconCustomizer, _Component);

	function LexiconCustomizer(props) {
		_classCallCheck(this, LexiconCustomizer);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LexiconCustomizer).call(this, props));

		_this.state = {
			hovering: false
		};
		return _this;
	}

	_createClass(LexiconCustomizer, [{
		key: 'render',
		value: function render() {
			var errors = [];

			if (this.props.sassError) {
				errors.push(this.props.sassError);
			}

			return _react2.default.createElement(
				'div',
				{
					className: 'lexicon-customizer',
					'data-group': this.props.group
				},
				_react2.default.createElement(_Header2.default, null),
				_react2.default.createElement(_ErrorPopup2.default, { errors: errors }),
				_react2.default.createElement(
					'div',
					{ className: 'lexicon-customizer-content' },
					_react2.default.createElement(_ComponentSideMenu2.default, { header: 'Components' }),
					_react2.default.createElement(_PreviewBox2.default, null),
					_react2.default.createElement(_VariablesEditor2.default, null)
				)
			);
		}
	}]);

	return LexiconCustomizer;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var group = state.get('group');
	var sassError = state.get('sassError');

	return {
		group: group,
		sassError: sassError
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(LexiconCustomizer);