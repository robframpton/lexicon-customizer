export function setPreview(preview) {
	return {
		preview,
		type: 'SET_PREVIEW'
	}
};

export function toggleDevTools() {
	return {
		type: 'TOGGLE_DEV_TOOLS'
	}
};
