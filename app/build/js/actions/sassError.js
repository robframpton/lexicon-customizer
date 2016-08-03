'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.showSassError = showSassError;
function showSassError(errorMsg) {
	var timeout = void 0;

	return function (dispatch, getState) {
		if (timeout) {
			clearTimeout(timeout);

			timeout = null;
		}

		dispatch({
			error: errorMsg,
			type: 'SET_SASS_ERROR'
		});

		timeout = setTimeout(function () {
			dispatch({
				type: 'CLEAR_SASS_ERROR'
			});
		}, 4000);
	};
};