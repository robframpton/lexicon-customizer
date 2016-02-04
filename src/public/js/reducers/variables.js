const variables = (state = {}, action) => {
	switch (action.type) {
		case 'RESET_VARIABLES':
			// TODO: need a way to reset state to original set of variables
			return state;
		case 'SET_VARIABLE':
			let newVariables = {};

			newVariables[action.name] = action.value;

			return Object.assign({}, state, newVariables);
		case 'SET_VARIABLES':
			return Object.assign({}, state, action.variables);
		default:
			return state;
	}
}

export default variables
