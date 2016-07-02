'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_SELECTED_COMPONENT: function SET_SELECTED_COMPONENT(state, _ref) {
		var component = _ref.component;

		return component;
	}
};

exports.default = (0, _redux_util.createReducer)('cards', actionHandlers);