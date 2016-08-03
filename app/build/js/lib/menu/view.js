'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function getViewMenu(store) {
	var template = {
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
		template.submenu.push({
			label: 'Toggle Developer Tools',
			accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
			click: function click(item, focusedWindow) {
				if (focusedWindow) {
					focusedWindow.webContents.toggleDevTools();
				}
			}
		});
	}

	return template;
}

exports.default = getViewMenu;