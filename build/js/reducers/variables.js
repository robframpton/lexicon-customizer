'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	OVERRIDE_VARIABLES: function OVERRIDE_VARIABLES(state, _ref) {
		var variables = _ref.variables;

		if (_immutable.OrderedMap.isOrderedMap(variables)) {
			return variables;
		} else {
			return state;
		}
	},

	SET_VARIABLE: function SET_VARIABLE(state, action) {
		var name = action.name;
		var value = action.value;


		var variable = state.get(name);

		return state.set(name, variable.set('value', value));
	},

	SET_VARIABLES: function SET_VARIABLES(state, _ref2) {
		var variables = _ref2.variables;

		if (!_immutable.OrderedMap.isOrderedMap(variables)) {
			return state;
		}

		return state.map(function (variable, key) {
			if (variables.has(key)) {
				variable = variable.set('value', variables.get(key).get('value'));
			}

			return variable;
		});
	}
};

exports.default = (0, _redux_util.createReducer)((0, _immutable.OrderedMap)(), actionHandlers);