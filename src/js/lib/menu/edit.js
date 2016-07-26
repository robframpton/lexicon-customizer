'use strict';

function getEditMenu(store) {
	const template = {
		id: 1,
		label: 'Edit',
		submenu: [
			{
				role: 'undo'
			},
			{
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				role: 'cut'
			},
			{
				role: 'copy'
			},
			{
				role: 'paste'
			},
			{
				role: 'delete'
			},
			{
				role: 'selectall'
			}
		]
	};

	return template;
}

export default getEditMenu;
