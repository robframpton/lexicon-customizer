export function addSassError(err) {
	return {
		err,
		type: 'ADD_SASS_ERROR'
	}
};

export function clearSassErrors() {
	return {
		type: 'CLEAR_SASS_ERRORS'
	}
};
