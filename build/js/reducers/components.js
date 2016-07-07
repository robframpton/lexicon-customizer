'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_COMPONENTS: function SET_COMPONENTS(state, _ref) {
		var components = _ref.components;

		return components;
	}
};

exports.default = (0, _redux_util.createReducer)((0, _immutable.List)(), actionHandlers);