'use strict';

import _ from 'lodash';
import fs from 'fs';
import fsp from 'fs-promise';
import path from 'path';
import sass from 'node-sass';

import * as componentScraper from './component_scraper';
import * as varUtil from '../var_util';

const CWD = process.cwd();

const PATH_BOWER_INCLUDES = path.join(CWD, 'bower_components/bourbon/app/assets/stylesheets');

const PATH_CUSTOM_VARIABLES = path.join(CWD, 'lexicon/_custom_variables.scss');

const PATH_LEXICON_SCSS = path.join(CWD, 'lexicon/src/scss');

export function clearCustomVariablesFile(modifiedVariables, themePath) {
	if (themePath) {
		clearModifiedVariablesFromTheme(modifiedVariables, themePath);
	}

	return fsp.writeFile(PATH_CUSTOM_VARIABLES, '');
};

export function clearModifiedVariablesFromTheme(modifiedVariables, themePath) {
	_clearModifiedVariablesFromFile(modifiedVariables, _getThemeVariablesFileAbsolutePath(themePath));
};

export function render(options, filePath, cb) {
	options = _.defaults({
		file: filePath,
		includePaths: [PATH_BOWER_INCLUDES, PATH_LEXICON_SCSS]
	}, options);

	sass.render(options, cb);
};

export const renderLexiconBase = _.debounce(renderLexiconBaseTask, 300);

export function renderLexiconBaseTask(options, cb) {
	if (!cb) {
		cb = options;
		options = {};
	}

	let baseLexiconTheme = _.kebabCase(options.baseLexiconTheme || 'lexiconBase');

	options = _.omit(options, 'baseLexiconTheme');

	render(options, path.join(CWD, 'lexicon', baseLexiconTheme + '.scss'), function(err, result) {
		let filePath;

		if (!err) {
			let cssString = result.css.toString();

			filePath = path.join(CWD, 'lexicon/build', baseLexiconTheme + '.css');

			fs.writeFileSync(filePath, cssString);
		}

		cb(err, filePath);
	});
};

export function writeCustomVariablesFile(variables, sourceVariables, themePath) {
	let variablesString = _getModifiedVariablesString(variables, sourceVariables);

	if (themePath) {
		_writeThemeFileTask(variables, variablesString, themePath);
	}

	return fsp.writeFile(path.join(CWD, 'lexicon/_custom_variables.scss'), variablesString);
};

export function _clearModifiedVariablesFromFile(modifiedVariables, filePath) {
	let reducedVariables = _getThemeVariables(modifiedVariables, filePath);

	return fsp.writeFile(filePath, _generateVariablesString(reducedVariables));
};

export function _getModifiedVariablesString(variables, sourceVariables) {
	let modifiedVariables = varUtil.getModifiedVariables(variables, sourceVariables);

	return _generateVariablesString(modifiedVariables);
};

export function _getThemeVariables(modifiedVariables, filePath) {
	let fileVariables = componentScraper.getVariablesFromFile(filePath);

	let flattenedVariables = componentScraper.flattenVariables(modifiedVariables);

	return _.reduce(fileVariables, function(result, item, index) {
		if (!flattenedVariables[index]) {
			result[index] = item;
		}

		return result;
	}, {});
};

export function _getUniqueVariables(variables, baseVariables) {
	return _.reduce(variables, function(result, item, index) {
		let baseComponentVariables = baseVariables[index];

		let obj = _.omitBy(item, function(value, name) {
			return value == baseComponentVariables[name];
		});

		if (!_.isEmpty(obj)) {
			result[index] = obj;
		}

		return result;
	}, {});
};

export function _generateVariablesString(modifiedVariables) {
	return modifiedVariables.toArray().map((variable, index) => {
		return variable.get('name') + ': ' + variable.get('value') + ';\n'
	}).join('');
};

export function _getThemeVariablesFileAbsolutePath(themePath) {
	return path.join(themePath, 'src/css/_aui_variables.scss');
};

export function _writeThemeFile(modifiedVariables, variablesString, themePath) {
	let themeVariables = _getThemeVariables(modifiedVariables, _getThemeVariablesFileAbsolutePath(themePath));

	variablesString = variablesString + '\n' + _generateVariablesString(themeVariables);

	fsp.writeFile(path.join(themePath, 'src/css/_aui_variables.scss'), variablesString);
}

export const _writeThemeFileTask = _.debounce(_writeThemeFile, 100);

export { sass };
