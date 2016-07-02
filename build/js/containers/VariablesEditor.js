'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _var_util = require('../lib/var_util');

var varUtil = _interopRequireWildcard(_var_util);

var _VariableInput = require('../components/VariableInput');

var _VariableInput2 = _interopRequireDefault(_VariableInput);

var _index = require('../actions/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariablesEditor = function (_Component) {
	_inherits(VariablesEditor, _Component);

	function VariablesEditor(props) {
		_classCallCheck(this, VariablesEditor);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(VariablesEditor).call(this, props));
	}

	_createClass(VariablesEditor, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'variables-editor' },
				_react2.default.createElement(
					'h3',
					null,
					'Variables'
				),
				_react2.default.createElement(
					'form',
					null,
					this.renderInputs()
				)
			);
		}
	}, {
		key: 'renderInputs',
		value: function renderInputs() {
			var _props = this.props;
			var group = _props.group;
			var selectedComponent = _props.selectedComponent;
			var variables = _props.variables;

			var handleChange = this.handleChange.bind(this);
			var isColor = this._isColor.bind(this);

			var componentVariables = varUtil.getComponentVariablesMap(variables, group, selectedComponent);

			return componentVariables.toArray().map(function (variable) {
				var name = variable.get('name');
				var value = variable.get('value');

				return _react2.default.createElement(_VariableInput2.default, {
					color: isColor(name),
					key: name,
					label: name,
					name: name,
					onChange: handleChange,
					value: value,
					variables: variables
				});
			});
		}
	}, {
		key: 'handleChange',
		value: function handleChange(name, value) {
			var _props2 = this.props;
			var dispatch = _props2.dispatch;
			var group = _props2.group;
			var selectedComponent = _props2.selectedComponent;


			dispatch((0, _index.setVariable)(group, selectedComponent, name, value));
		}
	}, {
		key: '_isColor',
		value: function _isColor(variableName) {
			var color = false;

			if (variableName.indexOf('-bg') > -1 || variableName.indexOf('color') > -1 || _lodash2.default.endsWith(variableName, '-border') || _lodash2.default.endsWith(variableName, '-text')) {
				color = true;
			}

			return color;
		}
	}]);

	return VariablesEditor;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var group = state.get('group');
	var sassError = state.get('sassError');
	var selectedComponent = state.get('selectedComponent');
	var variables = state.get('variables');

	return {
		group: group,
		sassError: sassError,
		selectedComponent: selectedComponent,
		variables: variables
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(VariablesEditor);