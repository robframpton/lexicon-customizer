'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_GROUP: function SET_GROUP(state, _ref) {
		var group = _ref.group;

		return group;
	}
};

exports.default = (0, _redux_util.createReducer)('lexicon', actionHandlers);