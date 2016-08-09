'use strict';

import _ from 'lodash';
import fs from 'fs';
import fsp from 'fs-promise';
import path from 'path';
import {remote} from 'electron';

import * as componentScraper from './component_scraper';
import * as varUtil from '../var_util';

const CUSTOM_VARIABLES_SCSS = '_custom_variables.scss';

export function clearCustomVariablesFile(variables, dir, themePath) {
	if (themePath) {
		clearModifiedVariablesFromTheme(variables, themePath);
	}

	return fsp.writeFile(path.join(dir, CUSTOM_VARIABLES_SCSS), '');
};

export function clearModifiedVariablesFromTheme(variables, themePath) {
	_clearModifiedVariablesFromFile(variables, _getThemeVariablesFileAbsolutePath(themePath));
};

export const renderLexiconBase = _.debounce(renderLexiconBaseTask, 300);

export function renderLexiconBaseTask(baseLexiconTheme, lexiconDirs, cb) {
	const {
		bourbonIncludePaths,
		customDir,
		includePaths,
		userDataPath
	} = lexiconDirs;

	baseLexiconTheme = _.kebabCase(baseLexiconTheme);

	path.join(customDir, baseLexiconTheme + '.scss')

	const scssIncludePaths = includePaths.concat(bourbonIncludePaths);

	scssIncludePaths.push(userDataPath);

	_render({
		file: path.join(customDir, baseLexiconTheme + '.scss'),
		includePaths: scssIncludePaths
	}, function(err, result) {
		let filePath;

		if (!err) {
			let cssString = result.css.toString();

			filePath = path.join(customDir, baseLexiconTheme + '.css');

			fs.writeFileSync(filePath, cssString.toString());

			filePath = filePath.split(path.sep).join('/');
		}

		cb(err, filePath);
	});
};

export function writeCustomVariablesFile(variables, sourceVariables, dir, themePath) {
	let variablesString = _getModifiedVariablesString(variables, sourceVariables);

	if (themePath) {
		_writeThemeFileTask(variables, variablesString, themePath);
	}

	return fsp.writeFile(path.join(dir, CUSTOM_VARIABLES_SCSS), variablesString);
};

export function _clearModifiedVariablesFromFile(variables, filePath) {
	let themeVariables = _getThemeVariables(variables, filePath);

	return fsp.writeFile(filePath, _generateVariablesString(themeVariables));
};

export function _getModifiedVariablesString(variables, sourceVariables) {
	let modifiedVariables = varUtil.getModifiedVariables(variables, sourceVariables);

	return _generateVariablesString(modifiedVariables);
};

export function _getThemeVariables(variables, filePath) {
	let fileVariables = componentScraper.mapVariablesFromFile(filePath);

	return fileVariables.filter((variable, key) => {
		return !variables.has(key);
	});
};

export function _generateVariablesString(modifiedVariables) {
	return modifiedVariables.toArray().map((variable, index) => {
		return variable.get('name') + ': ' + variable.get('value') + ';\n'
	}).join('');
};

export function _getThemeVariablesFileAbsolutePath(themePath) {
	return path.join(themePath, 'src/css/_aui_variables.scss');
};

export function _render(config, cb) {
	let sass;

	if (process.platform === 'win32') {
		const {lexicon} = remote.getCurrentWindow();

		sass = require(path.join(lexicon.sassBridgePath, 'sass_bridge'));
	}
	else {
		sass = require('node-sass');
	}

	sass.render(config, cb);
}

export function _writeThemeFile(variables, variablesString, themePath) {
	let themeVariables = _getThemeVariables(variables, _getThemeVariablesFileAbsolutePath(themePath));

	variablesString = _generateVariablesString(themeVariables) + '\n' + variablesString;

	fsp.writeFile(path.join(themePath, 'src/css/_aui_variables.scss'), variablesString);
}

export const _writeThemeFileTask = _.debounce(_writeThemeFile, 100);
