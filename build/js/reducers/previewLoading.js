'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_PREVIEW_LOADING: function SET_PREVIEW_LOADING(state, _ref) {
		var loading = _ref.loading;

		return loading;
	}
};

exports.default = (0, _redux_util.createReducer)(false, actionHandlers);