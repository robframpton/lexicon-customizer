'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_LEXICON_VERSION: function SET_LEXICON_VERSION(state, _ref) {
		var version = _ref.version;

		return version;
	}
};

exports.default = (0, _redux_util.createReducer)(null, actionHandlers);