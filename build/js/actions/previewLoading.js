'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setPreviewLoading = setPreviewLoading;
function setPreviewLoading(loading) {
	return {
		loading: loading,
		type: 'SET_PREVIEW_LOADING'
	};
};