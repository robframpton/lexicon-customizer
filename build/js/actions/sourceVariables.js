'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.overwriteSourceVariables = overwriteSourceVariables;

var _var_util = require('../lib/var_util');

var varUtil = _interopRequireWildcard(_var_util);

var _components = require('./components');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function overwriteSourceVariables(variables) {
	return function (dispatch, getState) {
		dispatch({
			type: 'OVERWRITE_SOURCE_VARIABLES',
			variables: variables
		});

		dispatch((0, _components.setComponents)(varUtil.getComponentsFromVariablesMap(variables)));
	};
};