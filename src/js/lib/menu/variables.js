'use strict';

import {resetComponentVariables, resetVariables} from '../../actions/variables';

function getVariablesMenu(store) {
	const template = {
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

	return template;
}

export default getVariablesMenu;
