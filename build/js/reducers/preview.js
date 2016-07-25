'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_PREVIEW: function SET_PREVIEW(state, _ref) {
		var preview = _ref.preview;

		return preview;
	},

	TOGGLE_DEV_TOOLS: function TOGGLE_DEV_TOOLS(state) {
		var devToolsOpen = state.devToolsOpen;


		state.devToolsOpen = !devToolsOpen;

		return Object.assign({}, state);
	}
};

exports.default = (0, _redux_util.createReducer)({}, actionHandlers);