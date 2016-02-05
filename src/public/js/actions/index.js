import createPreview from '../../../../lib/create_preview';

export function renderPreview(component) {
	return function (dispatch, getState) {
		var baseLexiconTheme = getState().baseLexiconTheme;
		createPreview(component, baseLexiconTheme)
			.then(function(url) {
				dispatch({
					type: 'CREATE_PREVIEW',
					url: url
				});
			});
	}
};