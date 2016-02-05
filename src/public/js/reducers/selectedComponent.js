const component = (state = 'cards', action) => {
	switch (action.type) {
		case 'SET_SELECTED_COMPONENT':
			return action.component;
		default:
			return state;
	}
};

export default component;
