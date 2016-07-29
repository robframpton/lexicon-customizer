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

var _LexiconColorPickerPanel = require('../containers/LexiconColorPickerPanel');

var _LexiconColorPickerPanel2 = _interopRequireDefault(_LexiconColorPickerPanel);

var _VariablesGroup = require('../components/VariablesGroup');

var _VariablesGroup2 = _interopRequireDefault(_VariablesGroup);

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
			var _props2 = this.props;
			var selectedComponent = _props2.selectedComponent;
			var variables = _props2.variables;


			var componentVariables = varUtil.filterVariablesByComponent(variables, selectedComponent);

			var groups = ['lexicon', 'bootstrap'];

			return groups.map(function (group) {
				var variablesGroup = '';

				var groupVariables = varUtil.filterVariablesByGroup(componentVariables, group);

				if (!groupVariables.isEmpty()) {
					variablesGroup = _react2.default.createElement(_VariablesGroup2.default, {
						group: group,
						groupVariables: groupVariables,
						header: _lodash2.default.capitalize(group),
						key: group
					});
				}

				return variablesGroup;
			});
		}
	}]);

	return VariablesEditor;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		colorVariableName: state.get('colorVariableName'),
		selectedComponent: state.get('selectedComponent'),
		variables: state.get('variables')
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(VariablesEditor);