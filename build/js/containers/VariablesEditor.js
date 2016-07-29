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

var _FilterInput = require('../components/FilterInput');

var _FilterInput2 = _interopRequireDefault(_FilterInput);

var _LexiconColorPickerPanel = require('../containers/LexiconColorPickerPanel');

var _LexiconColorPickerPanel2 = _interopRequireDefault(_LexiconColorPickerPanel);

var _VariableInput = require('../components/VariableInput');

var _VariableInput2 = _interopRequireDefault(_VariableInput);

var _VariablesGroup = require('../components/VariablesGroup');

var _VariablesGroup2 = _interopRequireDefault(_VariablesGroup);

var _index = require('../actions/index');

var _variables = require('../actions/variables');

var _colorVariableName = require('../actions/colorVariableName');

var _lockedVariables = require('../actions/lockedVariables');

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
			collapsed: false,
			filterText: ''
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
						this.renderGroups(),
						this.renderColorPickerPanel()
					)
				)
			);
		}
	}, {
		key: 'renderColorPickerPanel',
		value: function renderColorPickerPanel() {
			var colorPickerPanel = '';

			if (this.props.colorVariableName) {
				colorPickerPanel = _react2.default.createElement(_LexiconColorPickerPanel2.default, null);
			}

			return colorPickerPanel;
		}
	}, {
		key: 'renderGroups',
		value: function renderGroups() {
			var _this2 = this;

			var _props2 = this.props;
			var lockedVariables = _props2.lockedVariables;
			var selectedComponent = _props2.selectedComponent;
			var variables = _props2.variables;


			var handleColorPickerTriggerClick = this.handleColorPickerTriggerClick.bind(this);
			var handleVariableChange = this.handleVariableChange.bind(this);
			var handleVariableReset = this.handleVariableReset.bind(this);

			var componentVariables = varUtil.filterVariablesByComponent(variables, selectedComponent);

			var groups = ['lexicon', 'bootstrap'];

			return groups.map(function (group) {
				var variablesGroup = '';

				var groupVariables = varUtil.filterVariablesByGroup(componentVariables, group);

				if (!groupVariables.isEmpty()) {
					variablesGroup = _react2.default.createElement(_VariablesGroup2.default, {
						dropdownTemplate: _this2.getDropdownTemplate(),
						group: group,
						groupVariables: groupVariables,
						header: _lodash2.default.capitalize(group),
						key: group,
						lockedVariables: lockedVariables,
						onColorPickerTriggerClick: handleColorPickerTriggerClick,
						onVariableChange: handleVariableChange,
						onVariableReset: handleVariableReset,
						variables: variables
					});
				}

				return variablesGroup;
			});
		}
	}, {
		key: 'getDropdownTemplate',
		value: function getDropdownTemplate() {
			return [{
				action: this.handleVariableReset.bind(this),
				icon: 'reload',
				label: 'Reset',
				value: 'reset'
			}, {
				action: this.handleVariableLock.bind(this),
				icon: 'lock',
				label: 'Lock',
				value: 'lock'
			}];
		}
	}, {
		key: 'handleColorPickerTriggerClick',
		value: function handleColorPickerTriggerClick(name) {
			var _props3 = this.props;
			var colorVariableName = _props3.colorVariableName;
			var dispatch = _props3.dispatch;


			if (colorVariableName === name) {
				name = null;
			}

			dispatch((0, _colorVariableName.setColorVariableName)(name));
		}
	}, {
		key: 'handleVariableChange',
		value: function handleVariableChange(name, value) {
			var dispatch = this.props.dispatch;


			dispatch((0, _variables.setVariable)(name, value));
		}
	}, {
		key: 'handleVariableLock',
		value: function handleVariableLock(_ref) {
			var name = _ref.name;

			this.props.dispatch((0, _lockedVariables.toggleLockedVariable)(name));
		}
	}, {
		key: 'handleVariableReset',
		value: function handleVariableReset(_ref2) {
			var name = _ref2.name;

			this.props.dispatch((0, _variables.resetVariable)(name));
		}
	}]);

	return VariablesEditor;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		colorVariableName: state.get('colorVariableName'),
		lockedVariables: state.get('lockedVariables'),
		sassError: state.get('sassError'),
		selectedComponent: state.get('selectedComponent'),
		variables: state.get('variables')
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(VariablesEditor);