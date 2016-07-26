'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getMenuItem = getMenuItem;
exports.setItemChecked = setItemChecked;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = _electron.remote.Menu;
function getMenuItem(itemIndex) {
	var menuItems = Menu.getApplicationMenu().items;

	return _lodash2.default.find(menuItems, function (item) {
		return item.id == itemIndex;
	});
}

function setItemChecked(itemIndex, subItemIndex, checked) {
	if (_lodash2.default.isUndefined(checked)) {
		subItemIndex = checked;

		subItemIndex = null;
	}

	var menu = Menu.getApplicationMenu();

	var item = getMenuItem(itemIndex);

	if (_lodash2.default.isNumber(subItemIndex)) {
		item = item.submenu.items[subItemIndex];
	}

	item.checked = checked;
}