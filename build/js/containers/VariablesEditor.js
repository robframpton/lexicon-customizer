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

var _ColorPickerPanel = require('../components/ColorPickerPanel');

var _ColorPickerPanel2 = _interopRequireDefault(_ColorPickerPanel);

var _LexiconColorPickerPanel = require('../containers/LexiconColorPickerPanel');

var _LexiconColorPickerPanel2 = _interopRequireDefault(_LexiconColorPickerPanel);

var _VariableInput = require('../components/VariableInput');

var _VariableInput2 = _interopRequireDefault(_VariableInput);

var _index = require('../actions/index');

var _variables = require('../actions/variables');

var _colorVariableName = require('../actions/colorVariableName');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariablesEditor = function (_Component) {
	_inherits(VariablesEditor, _Component);

	function VariablesEditor(props) {
		_classCallCheck(this, VariablesEditor);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VariablesEditor).call(this, props));

		_this.state = {
			collapsedGroups: []
		};
		return _this;
	}

	_createClass(VariablesEditor, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var colorVariableName = _props.colorVariableName;
			var selectedComponent = _props.selectedComponent;
			var variables = _props.variables;


			var componentVariables = varUtil.filterVariablesByComponent(variables, selectedComponent);

			var className = 'variables-editor';

			if (colorVariableName) {
				className += ' has-color-picker-panel';
			}

			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement(
					'div',
					{ className: 'variables-editor-inner' },
					_react2.default.createElement(
						'h3',
						null,
						'Variables'
					),
					_react2.default.createElement(
						'form',
						null,
						this.renderGroup(componentVariables, 'lexicon', 'Lexicon'),
						this.renderGroup(componentVariables, 'bootstrap', 'Bootstrap'),
						this.renderColorPickerPanel()
					)
				)
			);
		}
	}, {
		key: 'renderColorPickerPanel',
		value: function renderColorPickerPanel() {
			var colorVariableName = this.props.colorVariableName;


			if (!colorVariableName) {
				return '';
			}

			return _react2.default.createElement(_LexiconColorPickerPanel2.default, null);
		}
	}, {
		key: 'renderGroup',
		value: function renderGroup(componentVariables, group, title) {
			var groupContent = '';

			var groupVariables = varUtil.filterVariablesByGroup(componentVariables, group);

			if (!groupVariables.isEmpty()) {
				var className = 'variables-editor-section';
				var collapsedGroups = this.state.collapsedGroups;


				if (collapsedGroups.includes(group)) {
					className += ' collapsed';
				}

				groupContent = _react2.default.createElement(
					'div',
					{ className: className, 'data-group': group },
					_react2.default.createElement(
						'h4',
						{
							className: 'variables-editor-section-header',
							onClick: this._handleHeaderClick.bind(this, group)
						},
						title
					),
					_react2.default.createElement(
						'div',
						{ className: 'variables-editor-section-variables' },
						this.renderInputs(groupVariables)
					)
				);
			}

			return groupContent;
		}
	}, {
		key: 'renderInputs',
		value: function renderInputs(groupVariables) {
			var handleChange = this._handleChange.bind(this);
			var handleColorPickerTriggerClick = this._handleColorPickerTriggerClick.bind(this);
			var isColor = this._isColor.bind(this);
			var variables = this.props.variables;


			var toolbar = [{
				action: this._handleResetVariable.bind(this),
				icon: 'reload'
			}];

			return groupVariables.toArray().map(function (variable) {
				var name = variable.get('name');
				var value = variable.get('value');

				return _react2.default.createElement(_VariableInput2.default, {
					color: isColor(name),
					key: name,
					label: name,
					name: name,
					onChange: handleChange,
					onColorPickerTriggerClick: handleColorPickerTriggerClick,
					toolbar: toolbar,
					value: value,
					variables: variables
				});
			});
		}
	}, {
		key: '_handleChange',
		value: function _handleChange(name, value) {
			var dispatch = this.props.dispatch;


			dispatch((0, _variables.setVariable)(name, value));
		}
	}, {
		key: '_handleColorPickerTriggerClick',
		value: function _handleColorPickerTriggerClick(name) {
			var _props2 = this.props;
			var colorVariableName = _props2.colorVariableName;
			var dispatch = _props2.dispatch;


			if (colorVariableName === name) {
				name = null;
			}

			dispatch((0, _colorVariableName.setColorVariableName)(name));
		}
	}, {
		key: '_handleHeaderClick',
		value: function _handleHeaderClick(group) {
			var collapsedGroups = this.state.collapsedGroups;


			var groupIndex = collapsedGroups.indexOf(group);

			if (groupIndex > -1) {
				collapsedGroups.splice(groupIndex, 1);
			} else {
				collapsedGroups.push(group);
			}

			this.setState({
				collapsedGroups: collapsedGroups
			});
		}
	}, {
		key: '_handleResetVariable',
		value: function _handleResetVariable(name) {
			var dispatch = this.props.dispatch;


			if (confirm('Are you sure you want to reset ' + name + ' to it\'s default value?')) {
				dispatch((0, _variables.resetVariable)(name));
			}
		}
	}, {
		key: '_isColor',
		value: function _isColor(variableName) {
			var color = false;

			if (variableName.indexOf('-bg') > -1 || variableName.indexOf('brand') > -1 || variableName.indexOf('color') > -1 || variableName.indexOf('gray') > -1 || _lodash2.default.endsWith(variableName, '-border') || _lodash2.default.endsWith(variableName, '-text')) {
				color = true;
			}

			return color;
		}
	}]);

	return VariablesEditor;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var colorVariableName = state.get('colorVariableName');
	var sassError = state.get('sassError');
	var selectedComponent = state.get('selectedComponent');
	var variables = state.get('variables');

	return {
		colorVariableName: colorVariableName,
		sassError: sassError,
		selectedComponent: selectedComponent,
		variables: variables
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(VariablesEditor);