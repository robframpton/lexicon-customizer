import _ from 'lodash';
import {remote, ipcRenderer} from 'electron';

import {toggleDevTools} from '../actions/preview';

const {BrowserWindow} = remote;

const EVENT_PREVIEW_DATA = 'preview-data';

export default function previewPopoutSubscriber(store) {
	let currentPreviewData;

	ipcRenderer.on('devtools-open', (event, open) => {
		store.dispatch(toggleDevTools(open));
	});

	ipcRenderer.on('request-preview-data', () => {
		const state = store.getState();

		const previewPopout = state.get('previewPopout');

		if (previewPopout) {
			previewPopout.send(EVENT_PREVIEW_DATA, getPreviewDataFromState(state));
		}
	});

	store.subscribe(() => {
		let previousPreviewData = currentPreviewData;

		const state = store.getState();

		const previewPopout = state.get('previewPopout');

		currentPreviewData = getPreviewDataFromState(state);

		if (previewPopout && !_.isEqual(currentPreviewData, previousPreviewData)) {
			previewPopout.send(EVENT_PREVIEW_DATA, currentPreviewData);
		}
	});
};

export function getPreviewDataFromState(state) {
	const {cssPath, htmlPath, devToolsOpen} = state.get('preview');

	return {
		cssPath,
		devToolsOpen,
		htmlPath
	};
};
