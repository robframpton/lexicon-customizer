export function showSassError(errorMsg) {
	let timeout;

	return (dispatch, getState) => {
		if (timeout) {
			clearTimeout(timeout);

			timeout = null;
		}

		dispatch({
			error: errorMsg,
			type: 'SET_SASS_ERROR'
		});

		timeout = setTimeout(function() {
			dispatch({
				type: 'CLEAR_SASS_ERROR'
			});
		}, 4000);
	}
};
