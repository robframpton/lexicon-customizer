'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _componentScraper = require('../../../../lib/component-scraper');

var _componentScraper2 = _interopRequireDefault(_componentScraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VariablesEditor = function (_Component) {
	_inherits(VariablesEditor, _Component);

	function VariablesEditor(props) {
		_classCallCheck(this, VariablesEditor);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VariablesEditor).call(this, props));

		var variableNames = Object.keys(props.variables);

		_this.state = {
			suggestions: _this._getSuggestions(''),
			variableNames: variableNames
		};
		return _this;
	}

	_createClass(VariablesEditor, [{
		key: 'render',
		value: function render() {
			var instance = this;

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
			var instance = this;

			var componentVariableMap = _componentScraper2.default.getComponentVariables(this.props.componentName, 'lexicon-base') || [];

			var variableMap = this.props.variables;

			return Object.keys(componentVariableMap).map(function (variableName) {
				var value = variableMap[variableName];

				var colorVariable = instance._isColorVariable(variableName, value);

				var inputProps = {
					'data-color-variable': colorVariable,
					className: 'form-control',
					name: variableName,
					onChange: instance.handleInput.bind(instance),
					value: variableMap[variableName]
				};

				var getSuggestionValue = function getSuggestionValue(suggestion) {
					store.dispatch({
						name: variableName,
						type: 'SET_VARIABLE',
						value: suggestion
					});

					return suggestion;
				};

				var renderSuggestion = function renderSuggestion(suggestion) {
					return _react2.default.createElement(
						'a',
						{ href: 'javascript:;' },
						suggestion
					);
				};

				var onSuggestionsUpdateRequested = function onSuggestionsUpdateRequested(_ref) {
					var value = _ref.value;
					var reason = _ref.reason;

					instance.setState({
						suggestions: instance._getSuggestions(value)
					});
				};

				var shouldRenderSuggestions = function shouldRenderSuggestions(value) {
					return value && value.indexOf('$') == 0;
				};

				return _react2.default.createElement(
					'div',
					{ className: 'form-group', key: variableName + '_wrapper' },
					_react2.default.createElement(
						'label',
						{ htmlFor: variableName },
						variableName
					),
					_react2.default.createElement(_reactAutosuggest2.default, {
						getSuggestionValue: getSuggestionValue,
						inputProps: inputProps,
						onSuggestionsUpdateRequested: onSuggestionsUpdateRequested,
						ref: variableName,
						renderSuggestion: renderSuggestion,
						shouldRenderSuggestions: shouldRenderSuggestions,
						suggestions: instance.state.suggestions
					})
				);
			});
		}
	}, {
		key: 'getVariableMap',
		value: function getVariableMap() {
			return _lodash2.default.reduce(this.refs, function (result, item, index) {
				result[index] = item.input.value;

				return result;
			}, {});
		}
	}, {
		key: 'handleInput',
		value: function handleInput(event) {
			var currentTarget = event.currentTarget;

			store.dispatch({
				name: currentTarget.getAttribute('name'),
				type: 'SET_VARIABLE',
				value: currentTarget.value
			});
		}
	}, {
		key: '_getSuggestions',
		value: function _getSuggestions(value) {
			value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

			if (value == '') {
				return [];
			}

			var regex = new RegExp('^' + value, 'i');

			var suggestions = [];

			this.state.variableNames.some(function (name, index) {
				if (regex.test(name)) suggestions.push(name);

				if (suggestions.length > 7) return true;
			});

			return suggestions;
		}
	}, {
		key: '_isColorVariable',
		value: function _isColorVariable(variableName, variableValue) {
			var colorVariable = false;

			if (variableName.indexOf('-bg') != -1 || variableName.indexOf('color') != -1) {
				colorVariable = true;
			}

			return colorVariable;
		}
	}]);

	return VariablesEditor;
}(_react.Component);

;

exports.default = VariablesEditor;