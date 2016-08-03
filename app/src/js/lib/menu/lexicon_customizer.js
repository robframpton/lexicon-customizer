'use strict';

import {remote} from 'electron';

function getLexiconCustomizerMenu(store) {
	const template = {
		label: remote.app.getName(),
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
	};

	return template;
}

export default getLexiconCustomizerMenu;
