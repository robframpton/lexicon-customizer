'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_SOURCE_VARIABLES: function SET_SOURCE_VARIABLES(state, _ref) {
		var variables = _ref.variables;

		if (_immutable.OrderedMap.isOrderedMap(variables)) {
			return variables;
		} else {
			return state;
		}
	}
};

exports.default = (0, _redux_util.createReducer)((0, _immutable.OrderedMap)(), actionHandlers);