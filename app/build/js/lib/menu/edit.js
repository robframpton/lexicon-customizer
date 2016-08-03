'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function getEditMenu(store) {
	var template = {
		id: 1,
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

	return template;
}

exports.default = getEditMenu;