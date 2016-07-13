'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setColorVariableName = setColorVariableName;
function setColorVariableName(name) {
	return {
		name: name,
		type: 'SET_COLOR_VARIABLE_NAME'
	};
};