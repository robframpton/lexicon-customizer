const sourceVariables = (state = {}, action) => {
	switch (action.type) {
		case 'SET_VARIABLES':
			return Object.assign({}, state, action.variables);
		default:
			return state;
	}
};

export default sourceVariables;
