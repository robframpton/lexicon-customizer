'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_SASS_ERROR: function SET_SASS_ERROR(state, _ref) {
		var error = _ref.error;

		return error;
	},

	CLEAR_SASS_ERROR: function CLEAR_SASS_ERROR(state, action) {
		return null;
	}
};

exports.default = (0, _redux_util.createReducer)('', actionHandlers);