const modifiedVariables = (state = {}, action) => {
	switch (action.type) {
		case 'SET_VARIABLE':
			let newVariables = Object.assign({}, state);

			newVariables[action.group][action.component][action.name] = action.value;

			return newVariables;
		case 'SET_MODIFIED_VARIABLES':
			// Warning: this is not a deep object merge
			return Object.assign({}, state, action.variables);
		default:
			return state;
	}
};

export default modifiedVariables;
