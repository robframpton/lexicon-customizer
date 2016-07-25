'use strict';

import {remote} from 'electron';

import {resetComponentVariables, resetVariables} from '../actions/variables';
import {toggleDevTools} from '../actions/preview';
import {togglePreviewPopout} from '../actions/previewPopout';

const {Menu, MenuItem} = remote;

function initMenu(store) {
	const editTemplate = {
		label: 'Edit',
		submenu: [
			{
				role: 'undo'
			},
			{
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				role: 'cut'
			},
			{
				role: 'copy'
			},
			{
				role: 'paste'
			},
			{
				role: 'delete'
			},
			{
				role: 'selectall'
			}
		]
	};

	const viewTemplate = {
		label: 'View',
		submenu: [
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click(item, focusedWindow) {
					if (focusedWindow) {
						focusedWindow.reload();
					}
				}
			},
			{
				role: 'togglefullscreen'
			}
		]
	};

	if (process.env.NODE_ENV === 'development') {
		viewTemplate.submenu.push({
			label: 'Toggle Developer Tools',
			accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
			click(item, focusedWindow) {
				if (focusedWindow) {
					focusedWindow.webContents.toggleDevTools();
				}
			}
		});
	}

	const windowTemplate = {
		role: 'window',
		submenu: [
			{
				role: 'minimize'
			},
			{
				role: 'close'
			}
		]
	};

	const variablesTemplate = {
		label: 'Variables',
		submenu: [
			{
				label: 'Import',
				click() {
					console.log('CLICK');
				}
			},
			{
				label: 'Export',
				click() {
					console.log('CLICK');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Reset All',
				click() {
					store.dispatch(resetVariables());
				}
			},
			{
				label: 'Reset Component',
				click() {
					store.dispatch(resetComponentVariables());
				}
			}
		]
	};

	const previewTemplate = {
		label: 'Preview',
		submenu: [
			{
				label: 'Toggle Developer Tools',
				click() {
					store.dispatch(toggleDevTools());
				}
			},
			{
				label: 'Toggle Popout Preview',
				click() {
					store.dispatch(togglePreviewPopout());
				}
			}
		]
	};

	const helpTemplate = {
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click() {
					require('electron').shell.openExternal('https://liferay.github.io/lexicon/');
				}
			}
		]
	};

	const template = [];

	if (process.platform === 'darwin') {
		const name = require('electron').remote.app.getName();

		template.push({
			label: name,
			submenu: [
				{
					role: 'about'
				},
				{
					type: 'separator'
				},
				{
					role: 'services',
					submenu: []
				},
				{
					type: 'separator'
				},
				{
					role: 'hide'
				},
				{
					role: 'hideothers'
				},
				{
					role: 'unhide'
				},
				{
					type: 'separator'
				},
				{
					role: 'quit'
				}
			]
		});

		windowTemplate.submenu = [
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			},
			{
				label: 'Minimize',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
			},
			{
				label: 'Zoom',
				role: 'zoom'
			},
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				role: 'front'
			}
		];
	}

	const menu = Menu.buildFromTemplate(template.concat([
		editTemplate,
		viewTemplate,
		windowTemplate,
		variablesTemplate,
		previewTemplate,
		helpTemplate
	]));

	Menu.setApplicationMenu(menu);
}

export default initMenu;
