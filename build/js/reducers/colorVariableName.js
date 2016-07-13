'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_COLOR_VARIABLE_NAME: function SET_COLOR_VARIABLE_NAME(state, _ref) {
		var name = _ref.name;

		return name;
	}
};

exports.default = (0, _redux_util.createReducer)('$alert-default-bg', actionHandlers);