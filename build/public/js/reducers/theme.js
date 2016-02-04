'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var theme = function theme() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'SET_THEME':
			return action.path;
		default:
			return state;
	}
};

exports.default = theme;