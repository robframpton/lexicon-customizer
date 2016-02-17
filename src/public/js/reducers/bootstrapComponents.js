const bootstrapComponents = (state = {}, action) => {
	switch (action.type) {
		case 'SET_BOOTSTRAP_COMPONENTS':
			return action.components;
		default:
			return state;
	}
};

export default bootstrapComponents;