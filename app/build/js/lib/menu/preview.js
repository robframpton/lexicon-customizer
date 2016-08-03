'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = require('./util');

var _preview = require('../../actions/preview');

var _previewPopout = require('../../actions/previewPopout');

function getPreviewMenu(store) {
	var template = {
		id: 5,
		label: 'Preview',
		submenu: [{
			click: function click() {
				store.dispatch((0, _preview.toggleDevTools)());
			},

			label: 'Toggle Developer Tools',
			type: 'checkbox'
		}, {
			click: function click() {
				store.dispatch((0, _previewPopout.togglePreviewPopout)());
			},

			label: 'Toggle Popout Preview',
			type: 'checkbox'
		}]
	};

	subscriber(store);

	return template;
}

function subscriber(store) {
	var currentPreviewDevToolsOpen = void 0;
	var currentPreviewPopout = void 0;

	store.subscribe(function () {
		var previousPreviewDevToolsOpen = currentPreviewDevToolsOpen;
		var previousPreviewPopout = currentPreviewPopout;

		var state = store.getState();

		currentPreviewDevToolsOpen = state.get('preview').devToolsOpen;
		currentPreviewPopout = state.get('previewPopout');

		if (previousPreviewDevToolsOpen !== currentPreviewDevToolsOpen) {
			(0, _util.setItemChecked)(5, 0, currentPreviewDevToolsOpen);
		}

		if (previousPreviewPopout !== currentPreviewPopout) {
			(0, _util.setItemChecked)(5, 1, !!currentPreviewPopout);
		}
	});
}

exports.default = getPreviewMenu;