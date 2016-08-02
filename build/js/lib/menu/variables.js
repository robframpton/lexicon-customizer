'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _import_export = require('../system/import_export');

var _variables = require('../../actions/variables');

var _lockedVariables = require('../../actions/lockedVariables');

function getVariablesMenu(store) {
	var template = {
		label: 'Variables',
		submenu: [{
			label: 'Import',
			click: function click() {
				(0, _import_export.importVariables)(store.dispatch);
			}
		}, {
			label: 'Export',
			click: function click() {
				var state = store.getState();

				(0, _import_export.exportVariables)(state.get('lexiconDirs').customDir);
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
		}, {
			type: 'separator'
		}, {
			label: 'Unlock All',
			click: function click() {
				store.dispatch((0, _lockedVariables.unlockAllVariables)());
			}
		}]
	};

	return template;
}

exports.default = getVariablesMenu;