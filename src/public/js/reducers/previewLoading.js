const previewLoading = (state = false, action) => {
	switch (action.type) {
		case 'SET_PREVIEW_LOADING':
			return action.loading;
		default:
			return state;
	}
};

export default previewLoading;