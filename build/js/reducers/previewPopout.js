'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_PREVIEW_POPOUT: function SET_PREVIEW_POPOUT(state, _ref) {
		var previewPopout = _ref.previewPopout;

		return previewPopout;
	}
};

exports.default = (0, _redux_util.createReducer)(null, actionHandlers);