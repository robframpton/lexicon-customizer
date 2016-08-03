export function setColorVariableName(name) {
	return (dispatch, getState) => {
		const state = getState();

		const colorVariableName = state.get('colorVariableName');

		if (name === colorVariableName) {
			name = null;
		}

		dispatch({
			name,
			type: 'SET_COLOR_VARIABLE_NAME'
		});
	};
};
