export function setPreview(preview) {
	return {
		preview,
		type: 'SET_PREVIEW'
	}
};

export function setPreviewPaths(cssPath, htmlPath) {
	const preview = {
		cssPath,
		htmlPath
	};

	return {
		preview,
		type: 'SET_PREVIEW_PATHS'
	}
};

export function toggleDevTools(force) {
	return {
		force,
		type: 'TOGGLE_DEV_TOOLS'
	}
};
