'use strict';

import {remote} from 'electron';

import getEditMenu from './menu/edit';
import getHelpMenu from './menu/help';
import getLexiconCustomizerMenu from './menu/lexicon_customizer';
import getPreviewMenu from './menu/preview';
import getVariablesMenu from './menu/variables';
import getViewMenu from './menu/view';
import getWindowMenu from './menu/window';

const {Menu, MenuItem} = remote;

function initMenu(store) {
	const template = [];

	if (process.platform === 'darwin') {
		template.push(getLexiconCustomizerMenu(store));
	}

	const menu = Menu.buildFromTemplate(template.concat([
		getEditMenu(store),
		getViewMenu(store),
		getWindowMenu(store),
		getVariablesMenu(store),
		getPreviewMenu(store),
		getHelpMenu(store)
	]));

	Menu.setApplicationMenu(menu);
}

export default initMenu;
