'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var variables = function variables() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'RESET_VARIABLES':
			// TODO: need a way to reset state to original set of variables
			return state;
		case 'SET_VARIABLE':
			var newVariables = {};

			newVariables[action.name] = action.value;

			return Object.assign({}, state, newVariables);
		case 'SET_VARIABLES':
			return Object.assign({}, state, action.variables);
		default:
			return state;
	}
};

exports.default = variables;