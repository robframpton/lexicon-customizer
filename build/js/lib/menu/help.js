'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _electron = require('electron');

var LEARN_MORE_URL = 'https://liferay.github.io/lexicon/';

function getHelpMenu(store) {
	var template = {
		role: 'help',
		submenu: [{
			label: 'Learn More',
			click: function click() {
				_electron.shell.openExternal(LEARN_MORE_URL);
			}
		}]
	};

	return template;
}

exports.default = getHelpMenu;