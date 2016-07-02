'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	CREATE_PREVIEW: function CREATE_PREVIEW(state, _ref) {
		var preview = _ref.preview;

		return preview;
	}
};

exports.default = (0, _redux_util.createReducer)({}, actionHandlers);