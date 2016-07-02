"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createReducer = createReducer;
function createReducer(initialState, actionHandlers) {
	return function () {
		var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
		var action = arguments[1];

		var handler = actionHandlers[action.type];

		return handler ? handler(state, action) : state;
	};
};