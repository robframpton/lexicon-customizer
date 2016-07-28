'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _var_util = require('../lib/var_util');

var varUtil = _interopRequireWildcard(_var_util);

var _FilterInput = require('../components/FilterInput');

var _FilterInput2 = _interopRequireDefault(_FilterInput);

var _VariableInput = require('../components/VariableInput');

var _VariableInput2 = _interopRequireDefault(_VariableInput);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariablesGroup = function (_Component) {
	_inherits(VariablesGroup, _Component);

	function VariablesGroup(props) {
		_classCallCheck(this, VariablesGroup);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VariablesGroup).call(this, props));

		_this.state = {
			collapsed: false,
			filterText: ''
		};
		return _this;
	}

	_createClass(VariablesGroup, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var header = _props.header;
			var group = _props.group;
			var groupVariables = _props.groupVariables;
			var variables = _props.variables;
			var _state = this.state;
			var collapsed = _state.collapsed;
			var filterText = _state.filterText;


			var className = 'variables-editor-section';

			if (collapsed) {
				className += ' collapsed';
			}

			return _react2.default.createElement(
				'div',
				{ className: className, 'data-group': group },
				_react2.default.createElement(
					'h4',
					{
						className: 'variables-editor-section-header',
						onClick: this.handleHeaderClick.bind(this)
					},
					header
				),
				_react2.default.createElement(
					'div',
					{ className: 'variables-editor-section-variables' },
					_react2.default.createElement(_FilterInput2.default, {
						onChange: this.handleFilterInputChange.bind(this),
						placeholder: 'Filter variables...',
						value: filterText
					}),
					this.renderInputs()
				)
			);
		}
	}, {
		key: 'renderInputs',
		value: function renderInputs() {
			var _props2 = this.props;
			var dropdownTemplate = _props2.dropdownTemplate;
			var groupVariables = _props2.groupVariables;
			var variables = _props2.variables;


			var handleVariableChange = this.handleVariableChange.bind(this);
			var handleColorPickerTriggerClick = this.handleColorPickerTriggerClick.bind(this);

			var variablesArray = this.filterVariablesArray();

			return variablesArray.map(function (variable) {
				var name = variable.get('name');

				return _react2.default.createElement(_VariableInput2.default, {
					dropdownTemplate: dropdownTemplate,
					key: name,
					label: name,
					name: name,
					onChange: handleVariableChange,
					onColorPickerTriggerClick: handleColorPickerTriggerClick,
					value: variable.get('value'),
					variables: variables
				});
			});
		}
	}, {
		key: 'filterVariablesArray',
		value: function filterVariablesArray() {
			var filterText = this.state.filterText;
			var groupVariables = this.props.groupVariables;


			var variablesArray = groupVariables.toArray();

			if (filterText) {
				variablesArray = variablesArray.filter(function (variable) {
					var name = variable.get('name');

					return name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
				});
			}

			return variablesArray;
		}
	}, {
		key: 'handleColorPickerTriggerClick',
		value: function handleColorPickerTriggerClick(name) {
			this.props.onColorPickerTriggerClick(name);
		}
	}, {
		key: 'handleHeaderClick',
		value: function handleHeaderClick() {
			this.setState({
				collapsed: !this.state.collapsed
			});
		}
	}, {
		key: 'handleFilterInputChange',
		value: function handleFilterInputChange(value) {
			this.setState({
				filterText: value
			});
		}
	}, {
		key: 'handleVariableChange',
		value: function handleVariableChange(name, value) {
			this.props.onVariableChange(name, value);
		}
	}, {
		key: 'handleVariableReset',
		value: function handleVariableReset(name) {
			this.props.onVariableReset(name);
		}
	}]);

	return VariablesGroup;
}(_react.Component);

;

VariablesGroup.propTypes = {
	dropdownTemplate: _react.PropTypes.array,
	group: _react.PropTypes.string.isRequired,
	groupVariables: _reactImmutableProptypes2.default.orderedMap.isRequired,
	header: _react.PropTypes.string.isRequired,
	onColorPickerTriggerClick: _react.PropTypes.func.isRequired,
	onVariableChange: _react.PropTypes.func.isRequired,
	onVariableReset: _react.PropTypes.func.isRequired,
	variables: _reactImmutableProptypes2.default.orderedMap.isRequired
};

exports.default = VariablesGroup;