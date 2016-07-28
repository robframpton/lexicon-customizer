'use strict';

import {exportVariables, importVariables} from '../system/import_export';
import {resetComponentVariables, resetVariables} from '../../actions/variables';

function getVariablesMenu(store) {
	const template = {
		label: 'Variables',
		submenu: [
			{
				label: 'Import',
				click() {
					importVariables(store.dispatch);
				}
			},
			{
				label: 'Export',
				click() {
					const state = store.getState();

					exportVariables(state.get('lexiconDirs').customDir);
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
