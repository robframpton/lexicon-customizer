'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_THEME: function SET_THEME(state, _ref) {
		var path = _ref.path;

		return path;
	}
};

exports.default = (0, _redux_util.createReducer)('', actionHandlers);