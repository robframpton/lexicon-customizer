'use strict';

import {shell} from 'electron';

const LEARN_MORE_URL = 'https://liferay.github.io/lexicon/';

function getHelpMenu(store) {
	const template = {
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click() {
					shell.openExternal(LEARN_MORE_URL);
				}
			}
		]
	};

	return template;
}

export default getHelpMenu;
