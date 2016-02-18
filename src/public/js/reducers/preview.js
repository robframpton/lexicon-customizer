const preview = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_PREVIEW':
			return action.preview;
		default:
			return state;
	}
};

export default preview;