'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	LOCK_VARIABLE: function LOCK_VARIABLE(state, _ref) {
		var name = _ref.name;

		return state.add(name);
	},

	UNLOCK_VARIABLE: function UNLOCK_VARIABLE(state, _ref2) {
		var name = _ref2.name;

		return state.delete(name);
	}
};

exports.default = (0, _redux_util.createReducer)((0, _immutable.Set)(), actionHandlers);