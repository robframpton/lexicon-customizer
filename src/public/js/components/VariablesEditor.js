import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import _ from 'lodash';

import componentScraper from '../../../../lib/component-scraper';

class VariablesEditor extends Component {
	constructor(props) {
		super(props);

		var variableNames = Object.keys(props.variables);

		this.state = {
			suggestions: this._getSuggestions(''),
			variableNames
		};
	}

	render() {
		var instance = this;

		return (
			<div className="variables-editor">
				<h3>Variables</h3>

				<form>
					{this.renderInputs()}
				</form>
			</div>
		);
	}

	renderInputs() {
		var instance = this;

		var componentVariableMap = componentScraper.getComponentVariables(this.props.componentName, 'lexicon-base') || [];

		var variableMap = this.props.variables;

		return Object.keys(componentVariableMap).map(function(variableName) {
			var value = variableMap[variableName];

			var colorVariable = instance._isColorVariable(variableName, value);

			var inputProps = {
				'data-color-variable': colorVariable,
				className: 'form-control',
				name: variableName,
				onChange: instance.handleInput.bind(instance),
				value: variableMap[variableName]
			};

			var getSuggestionValue = function(suggestion) {
				store.dispatch({
					name: variableName,
					type: 'SET_VARIABLE',
					value: suggestion
				});

				return suggestion;
			};

			var renderSuggestion = function(suggestion) {
				return (<a href="javascript:;">{suggestion}</a>);
			};

			var onSuggestionsUpdateRequested = function({ value, reason }) {
				instance.setState({
					suggestions: instance._getSuggestions(value)
				});
			};

			var shouldRenderSuggestions = value => {
				return value && value.indexOf('$') == 0;
			}

			return (
				<div className="form-group" key={variableName + '_wrapper'}>
					<label htmlFor={variableName}>{variableName}</label>

					<Autosuggest
						getSuggestionValue={getSuggestionValue}
						inputProps={inputProps}
						onSuggestionsUpdateRequested={onSuggestionsUpdateRequested}
						ref={variableName}
						renderSuggestion={renderSuggestion}
						shouldRenderSuggestions={shouldRenderSuggestions}
						suggestions={instance.state.suggestions}
					/>
				</div>
			);
		});
	}

	getVariableMap() {
		return _.reduce(this.refs, function(result, item, index) {
			result[index] = item.input.value;

			return result;
		}, {});
	}

	handleInput(event) {
		var currentTarget = event.currentTarget;

		store.dispatch({
			name: currentTarget.getAttribute('name'),
			type: 'SET_VARIABLE',
			value: currentTarget.value
		});
	}

	_getSuggestions(value) {
		value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

		if (value == '') {
			return [];
		}

		var regex = new RegExp('^' + value, 'i');

		var suggestions = [];

		this.state.variableNames.some((name, index) => {
			if (regex.test(name)) suggestions.push(name);

			if (suggestions.length > 7) return true;
		});

		return suggestions;
	}

	_isColorVariable(variableName, variableValue) {
		var colorVariable = false;

		if ((variableName.indexOf('-bg') != -1) || (variableName.indexOf('color') != -1)) {
			colorVariable = true;
		}

		return colorVariable;
	}
};

export default VariablesEditor