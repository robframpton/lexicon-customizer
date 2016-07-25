'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setPreview = setPreview;
exports.setPreviewPaths = setPreviewPaths;
exports.toggleDevTools = toggleDevTools;
function setPreview(preview) {
	return {
		preview: preview,
		type: 'SET_PREVIEW'
	};
};

function setPreviewPaths(cssPath, htmlPath) {
	var preview = {
		cssPath: cssPath,
		htmlPath: htmlPath
	};

	return {
		preview: preview,
		type: 'SET_PREVIEW_PATHS'
	};
};

function toggleDevTools(force) {
	return {
		force: force,
		type: 'TOGGLE_DEV_TOOLS'
	};
};