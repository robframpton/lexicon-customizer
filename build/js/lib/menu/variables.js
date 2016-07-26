'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _variables = require('../../actions/variables');

function getVariablesMenu(store) {
	var template = {
		label: 'Variables',
		submenu: [{
			label: 'Import',
			click: function click() {
				console.log('CLICK');
			}
		}, {
			label: 'Export',
			click: function click() {
				console.log('CLICK');
			}
		}, {
			type: 'separator'
		}, {
			label: 'Reset All',
			click: function click() {
				store.dispatch((0, _variables.resetVariables)());
			}
		}, {
			label: 'Reset Component',
			click: function click() {
				store.dispatch((0, _variables.resetComponentVariables)());
			}
		}]
	};

	return template;
}

exports.default = getVariablesMenu;