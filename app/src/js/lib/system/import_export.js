'use strict';

import fs from 'fs-extra';
import path from 'path';
import {remote} from 'electron';

import {importVariables as importVariablesAction} from '../../actions/variables';

const {app, dialog} = remote;

const DOWNLOADS_PATH = app.getPath('downloads');

export function exportVariables(customDir) {
	dialog.showSaveDialog({
		defaultPath: path.join(DOWNLOADS_PATH, '_variables.scss')
	}, (filePath) => {
		fs.copySync(path.join(customDir, '_custom_variables.scss'), filePath);
	});
}

export function importVariables(dispatch) {
	dialog.showOpenDialog({
		properties: ['openFile']
	}, function(filePaths) {
		if (filePaths && filePaths.length) {
			dispatch(importVariablesAction(filePaths[0]));
		}
	});
}
