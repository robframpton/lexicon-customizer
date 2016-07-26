'use strict';

import _ from 'lodash';
import {remote} from 'electron';

const {Menu} = remote;

export function getMenuItem(itemIndex) {
	const menuItems = Menu.getApplicationMenu().items;

	return _.find(menuItems, (item) => {
		return item.id == itemIndex;
	});
}

export function setItemChecked(itemIndex, subItemIndex, checked) {
	if (_.isUndefined(checked)) {
		subItemIndex = checked;

		subItemIndex = null;
	}

	const menu = Menu.getApplicationMenu();

	let item = getMenuItem(itemIndex);

	if (_.isNumber(subItemIndex)) {
		item = item.submenu.items[subItemIndex];
	}

	item.checked = checked;
}
