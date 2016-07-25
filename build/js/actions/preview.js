'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setPreview = setPreview;
exports.toggleDevTools = toggleDevTools;
function setPreview(preview) {
	return {
		preview: preview,
		type: 'SET_PREVIEW'
	};
};

function toggleDevTools() {
	return {
		type: 'TOGGLE_DEV_TOOLS'
	};
};