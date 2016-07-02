'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_FILE_PATH: function SET_FILE_PATH(state, _ref) {
		var name = _ref.name;
		var path = _ref.path;

		return state.set(name, path);
	}
};

exports.default = (0, _redux_util.createReducer)((0, _immutable.Map)(), actionHandlers);