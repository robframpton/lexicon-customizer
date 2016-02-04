'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var baseLexiconTheme = function baseLexiconTheme() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? 'lexiconBase' : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'SET_BASE_LEXICON_THEME':
			return action.value;
		default:
			return state;
	}
};

exports.default = baseLexiconTheme;