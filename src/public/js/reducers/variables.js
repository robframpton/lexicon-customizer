const variables = (state = {}, action) => {
	switch (action.type) {
		case 'RESET_VARIABLES':
			// TODO: need a way to reset state to original set of variables
			return state;
		case 'SET_VARIABLE':
			let newVariables = Object.assign({}, state);
			newVariables[action.component][action.name] = action.value;

			return newVariables;
		case 'SET_VARIABLES':
			return Object.assign({}, state, action.variables);
		default:
			return state;
	}
};

export default variables;
