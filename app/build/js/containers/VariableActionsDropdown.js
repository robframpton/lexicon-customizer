'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dropdown = require('../components/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _import_export = require('../lib/system/import_export');

var _variables = require('../actions/variables');

var _lockedVariables = require('../actions/lockedVariables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariableActionsDropdown = function (_Component) {
	_inherits(VariableActionsDropdown, _Component);

	function VariableActionsDropdown() {
		_classCallCheck(this, VariableActionsDropdown);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(VariableActionsDropdown).apply(this, arguments));
	}

	_createClass(VariableActionsDropdown, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_Dropdown2.default,
				{ direction: 'bottom', options: this.getDropdownTemplate() },
				_react2.default.createElement(
					_Button2.default,
					{ icon: 'ellipsis-h' },
					'Variable Actions'
				)
			);
		}
	}, {
		key: 'getDropdownTemplate',
		value: function getDropdownTemplate() {
			var _props = this.props;
			var customDir = _props.customDir;
			var dispatch = _props.dispatch;


			var separator = {
				separator: true
			};

			return [{
				action: function action() {
					(0, _import_export.importVariables)(dispatch);
				},
				icon: 'import-export',
				label: 'Import'
			}, {
				action: function action() {
					(0, _import_export.exportVariables)(customDir);
				},
				icon: 'import-export',
				label: 'Export'
			}, separator, {
				action: function action() {
					dispatch((0, _variables.resetVariables)());
				},
				icon: 'reload',
				label: 'Reset All'
			}, {
				action: function action() {
					dispatch((0, _variables.resetComponentVariables)());
				},
				icon: 'reload',
				label: 'Reset Component'
			}, separator, {
				action: function action() {
					dispatch((0, _lockedVariables.unlockAllVariables)());
				},
				icon: 'unlock',
				label: 'Unlock All'
			}];
		}
	}]);

	return VariableActionsDropdown;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		customDir: state.get('lexiconDirs').customDir
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(VariableActionsDropdown);