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

	SET_PREVIEW_PATHS: function SET_PREVIEW_PATHS(state, _ref2) {
		var preview = _ref2.preview;

		return Object.assign({}, state, preview);
	},

	TOGGLE_DEV_TOOLS: function TOGGLE_DEV_TOOLS(state) {
		var devToolsOpen = state.devToolsOpen;
		var force = state.force;


		state.devToolsOpen = !devToolsOpen;

		if (force !== undefined) {
			state.devToolsOpen = force;
		}

		return Object.assign({}, state);
	}
};

exports.default = (0, _redux_util.createReducer)({}, actionHandlers);