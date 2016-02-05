const preview = (state = '', action) => {
	switch (action.type) {
		case 'CREATE_PREVIEW':
			return action.url;
		default:
			return state;
	}
};

export default preview;