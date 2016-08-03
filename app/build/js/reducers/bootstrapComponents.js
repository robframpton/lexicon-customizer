'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_BOOTSTRAP_COMPONENTS: function SET_BOOTSTRAP_COMPONENTS(state, _ref) {
		var components = _ref.components;

		return components;
	}
};

exports.default = (0, _redux_util.createReducer)({}, actionHandlers);