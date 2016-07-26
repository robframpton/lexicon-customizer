'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function getWindowMenu(store) {
	var template = {
		role: 'window',
		submenu: [{
			role: 'minimize'
		}, {
			role: 'close'
		}]
	};

	if (process.platform === 'darwin') {
		template.submenu = [{
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

	return template;
}

exports.default = getWindowMenu;