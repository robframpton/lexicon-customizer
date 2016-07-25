'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _electron = require('electron');

var _variables = require('../actions/variables');

var _preview = require('../actions/preview');

var _previewPopout = require('../actions/previewPopout');

var Menu = _electron.remote.Menu;
var MenuItem = _electron.remote.MenuItem;


function initMenu(store) {
	var editTemplate = {
		label: 'Edit',
		submenu: [{
			role: 'undo'
		}, {
			role: 'redo'
		}, {
			type: 'separator'
		}, {
			role: 'cut'
		}, {
			role: 'copy'
		}, {
			role: 'paste'
		}, {
			role: 'delete'
		}, {
			role: 'selectall'
		}]
	};

	var viewTemplate = {
		label: 'View',
		submenu: [{
			label: 'Reload',
			accelerator: 'CmdOrCtrl+R',
			click: function click(item, focusedWindow) {
				if (focusedWindow) {
					focusedWindow.reload();
				}
			}
		}, {
			role: 'togglefullscreen'
		}]
	};

	if (process.env.NODE_ENV === 'development') {
		viewTemplate.submenu.push({
			label: 'Toggle Developer Tools',
			accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
			click: function click(item, focusedWindow) {
				if (focusedWindow) {
					focusedWindow.webContents.toggleDevTools();
				}
			}
		});
	}

	var windowTemplate = {
		role: 'window',
		submenu: [{
			role: 'minimize'
		}, {
			role: 'close'
		}]
	};

	var variablesTemplate = {
		label: 'Variables',
		submenu: [{
			label: 'Import',
			click: function click() {
				console.log('CLICK');
			}
		}, {
			label: 'Export',
			click: function click() {
				console.log('CLICK');
			}
		}, {
			type: 'separator'
		}, {
			label: 'Reset All',
			click: function click() {
				store.dispatch((0, _variables.resetVariables)());
			}
		}, {
			label: 'Reset Component',
			click: function click() {
				store.dispatch((0, _variables.resetComponentVariables)());
			}
		}]
	};

	var previewTemplate = {
		label: 'Preview',
		submenu: [{
			label: 'Toggle Developer Tools',
			click: function click() {
				store.dispatch((0, _preview.toggleDevTools)());
			}
		}, {
			label: 'Toggle Popout Preview',
			click: function click() {
				store.dispatch((0, _previewPopout.togglePreviewPopout)());
			}
		}]
	};

	var helpTemplate = {
		role: 'help',
		submenu: [{
			label: 'Learn More',
			click: function click() {
				require('electron').shell.openExternal('https://liferay.github.io/lexicon/');
			}
		}]
	};

	var template = [];

	if (process.platform === 'darwin') {
		var name = require('electron').remote.app.getName();

		template.push({
			label: name,
			submenu: [{
				role: 'about'
			}, {
				type: 'separator'
			}, {
				role: 'services',
				submenu: []
			}, {
				type: 'separator'
			}, {
				role: 'hide'
			}, {
				role: 'hideothers'
			}, {
				role: 'unhide'
			}, {
				type: 'separator'
			}, {
				role: 'quit'
			}]
		});

		windowTemplate.submenu = [{
			label: 'Close',
			accelerator: 'CmdOrCtrl+W',
			role: 'close'
		}, {
			label: 'Minimize',
			accelerator: 'CmdOrCtrl+M',
			role: 'minimize'
		}, {
			label: 'Zoom',
			role: 'zoom'
		}, {
			type: 'separator'
		}, {
			label: 'Bring All to Front',
			role: 'front'
		}];
	}

	var menu = Menu.buildFromTemplate(template.concat([editTemplate, viewTemplate, windowTemplate, variablesTemplate, previewTemplate, helpTemplate]));

	Menu.setApplicationMenu(menu);
}

exports.default = initMenu;