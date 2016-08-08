'use strict';

import {shell} from 'electron';

const URL_ISSUES = 'https://github.com/Robert-Frampton/lexicon-customizer/issues';

const URL_LEARN_MORE = 'https://liferay.github.io/lexicon/';

function getHelpMenu(store) {
	const template = {
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click() {
					shell.openExternal(URL_LEARN_MORE);
				}
			},
			{
				label: 'Report Issues',
				click() {
					shell.openExternal(URL_ISSUES);
				}
			}
		]
	};

	return template;
}

export default getHelpMenu;
