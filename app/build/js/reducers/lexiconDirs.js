'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux_util = require('../lib/redux_util');

var actionHandlers = {
	SET_LEXICON_DIR: function SET_LEXICON_DIR(state, _ref) {
		var dirName = _ref.dirName;
		var dir = _ref.dir;

		var newDir = {};

		newDir[dirName] = dir;

		return Object.assign({}, state, newDir);
	},

	SET_LEXICON_DIRS: function SET_LEXICON_DIRS(state, _ref2) {
		var dirs = _ref2.dirs;

		return dirs;
	}
};

exports.default = (0, _redux_util.createReducer)({}, actionHandlers);