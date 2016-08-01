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

var _VariableInput = require('../containers/VariableInput');

var _VariableInput2 = _interopRequireDefault(_VariableInput);

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
			var _state = this.state;
			var collapsed = _state.collapsed;
			var filterText = _state.filterText;


			var className = 'card variables-editor-section';

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
			var variablesArray = this.filterVariablesArray();

			return variablesArray.map(function (variable) {
				var name = variable.get('name');

				return _react2.default.createElement(_VariableInput2.default, {
					key: name,
					label: name,
					name: name,
					value: variable.get('value')
				});
			});
		}
	}, {
		key: 'filterVariablesArray',
		value: function filterVariablesArray() {
			var filterText = this.state.filterText;


			var variablesArray = this.props.groupVariables.toArray();

			if (filterText) {
				variablesArray = variablesArray.filter(function (variable) {
					var name = variable.get('name');

					return name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
				});
			}

			return variablesArray;
		}
	}, {
		key: 'handleFilterInputChange',
		value: function handleFilterInputChange(value) {
			this.setState({
				filterText: value
			});
		}
	}, {
		key: 'handleHeaderClick',
		value: function handleHeaderClick() {
			this.setState({
				collapsed: !this.state.collapsed
			});
		}
	}]);

	return VariablesGroup;
}(_react.Component);

;

VariablesGroup.propTypes = {
	group: _react.PropTypes.string.isRequired,
	groupVariables: _reactImmutableProptypes2.default.orderedMap.isRequired,
	header: _react.PropTypes.string.isRequired
};

exports.default = VariablesGroup;