'use strict';

import {setItemChecked} from './util';
import {toggleDevTools} from '../../actions/preview';
import {togglePreviewPopout} from '../../actions/previewPopout';

function getPreviewMenu(store) {
	const template = {
		id: 5,
		label: 'Preview',
		submenu: [
			{
				click() {
					store.dispatch(toggleDevTools());
				},
				label: 'Toggle Developer Tools',
				type: 'checkbox'
			},
			{
				click() {
					store.dispatch(togglePreviewPopout());
				},
				label: 'Toggle Popout Preview',
				type: 'checkbox'
			}
		]
	};

	subscriber(store);

	return template;
}

function subscriber(store) {
	let currentPreviewDevToolsOpen;
	let currentPreviewPopout;

	store.subscribe(() => {
		let previousPreviewDevToolsOpen = currentPreviewDevToolsOpen;
		let previousPreviewPopout = currentPreviewPopout;

		const state = store.getState();

		currentPreviewDevToolsOpen = state.get('preview').devToolsOpen;
		currentPreviewPopout = state.get('previewPopout');

		if (previousPreviewDevToolsOpen !== currentPreviewDevToolsOpen) {
			setItemChecked(5, 0, currentPreviewDevToolsOpen);
		}

		if (previousPreviewPopout !== currentPreviewPopout) {
			setItemChecked(5, 1, !!currentPreviewPopout);
		}
	});
}

export default getPreviewMenu;
