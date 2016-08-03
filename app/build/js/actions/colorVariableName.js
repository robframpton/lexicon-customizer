'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setColorVariableName = setColorVariableName;
function setColorVariableName(name) {
	return function (dispatch, getState) {
		var state = getState();

		var colorVariableName = state.get('colorVariableName');

		if (name === colorVariableName) {
			name = null;
		}

		dispatch({
			name: name,
			type: 'SET_COLOR_VARIABLE_NAME'
		});
	};
};