'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_BASE_LEXICON_THEME: function SET_BASE_LEXICON_THEME(state, _ref) {
		var value = _ref.value;

		return value;
	}
};

exports.default = (0, _redux_util.createReducer)('lexiconBase', actionHandlers);