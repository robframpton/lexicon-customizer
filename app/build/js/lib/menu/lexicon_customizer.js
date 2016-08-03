'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _electron = require('electron');

function getLexiconCustomizerMenu(store) {
	var template = {
		label: _electron.remote.app.getName(),
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
	};

	return template;
}

exports.default = getLexiconCustomizerMenu;