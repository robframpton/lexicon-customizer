const component = (state = {}, action) => {
	switch (action.type) {
		case 'SET_COMPONENTS':
			return action.components;
		default:
			return state;
	}
};

export default component;