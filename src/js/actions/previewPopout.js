import {remote} from 'electron';

const {app, BrowserWindow} = remote;

const previewPopoutURL = `file://${app.getAppPath()}/build/html/preview_popout.html`;

export function createPreviewPopout() {
	return (dispatch, getState) => {
		let previewPopout = getState().get('previewPopout');

		if (!previewPopout) {
			previewPopout = new BrowserWindow({
				height: 600,
				parent: BrowserWindow.getFocusedWindow(),
				width: 800
			});

			previewPopout.loadURL(previewPopoutURL);

			previewPopout.on('closed', () => {
				dispatch(setPreviewPopout(null));
			});
		}

		dispatch(setPreviewPopout(previewPopout));
	}
};

export function destroyPreviewPopout() {
	return function(dispatch, getState) {
		const {previewPopout} = getState();

		if (previewPopout) {
			previewPopout.destroy();
		}

		dispatch(setPreviewPopout(null));
	}
};

export function setPreviewPopout(previewPopout) {
	return {
		previewPopout,
		type: 'SET_PREVIEW_POPOUT'
	}
};
