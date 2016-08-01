'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.lockVariable = lockVariable;
exports.toggleLockedVariable = toggleLockedVariable;
exports.unlockAllVariables = unlockAllVariables;
exports.unlockVariable = unlockVariable;

var _user_config = require('../lib/system/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userConfig = new _user_config2.default();

function lockVariable(name) {
	return {
		name: name,
		type: 'LOCK_VARIABLE'
	};
};

function toggleLockedVariable(name) {
	return function (dispatch, getState) {
		var state = getState();

		var lockedVariables = state.get('lockedVariables');

		if (lockedVariables.has(name)) {
			dispatch(unlockVariable(name));
		} else {
			dispatch(lockVariable(name));
		}

		userConfig.setConfig('lockedVariables', getState().get('lockedVariables').toArray());
	};
};

function unlockAllVariables() {
	return {
		type: 'UNLOCK_ALL_VARIABLES'
	};
};

function unlockVariable(name) {
	return {
		name: name,
		type: 'UNLOCK_VARIABLE'
	};
};