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

var _DevTools = require('../containers/DevTools');

var _DevTools2 = _interopRequireDefault(_DevTools);

var _ErrorPopup = require('../components/ErrorPopup');

var _ErrorPopup2 = _interopRequireDefault(_ErrorPopup);

var _Header = require('../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _LexiconPreview = require('../containers/LexiconPreview');

var _LexiconPreview2 = _interopRequireDefault(_LexiconPreview);

var _VariablesEditor = require('../containers/VariablesEditor');

var _VariablesEditor2 = _interopRequireDefault(_VariablesEditor);

var _index = require('../actions/index');

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
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props;
			var dispatch = _props.dispatch;
			var selectedComponent = _props.selectedComponent;


			dispatch((0, _index.renderPreview)(selectedComponent));
		}
	}, {
		key: 'render',
		value: function render() {
			var errors = [];

			var _props2 = this.props;
			var previewPopout = _props2.previewPopout;
			var sassError = _props2.sassError;


			if (sassError) {
				errors.push(sassError);
			}

			var className = 'lexicon-customizer';
			var lexiconPreview = '';

			if (previewPopout) {
				className += ' has-popout-preview';
			} else {
				lexiconPreview = _react2.default.createElement(_LexiconPreview2.default, null);
			}

			return _react2.default.createElement(
				'div',
				{
					className: className,
					'data-group': this.props.group
				},
				_react2.default.createElement(_Header2.default, null),
				_react2.default.createElement(_ErrorPopup2.default, { errors: errors }),
				_react2.default.createElement(
					'div',
					{ className: 'lexicon-customizer-content' },
					_react2.default.createElement(_ComponentSideMenu2.default, { header: 'Components' }),
					lexiconPreview,
					_react2.default.createElement(_VariablesEditor2.default, null)
				),
				_react2.default.createElement(_DevTools2.default, null)
			);
		}
	}]);

	return LexiconCustomizer;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var group = state.get('group');
	var previewPopout = state.get('previewPopout');
	var sassError = state.get('sassError');
	var selectedComponent = state.get('selectedComponent');

	return {
		group: group,
		previewPopout: previewPopout,
		sassError: sassError,
		selectedComponent: selectedComponent
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		dispatch: dispatch
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LexiconCustomizer);