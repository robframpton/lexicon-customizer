'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.lockVariable = lockVariable;
exports.toggleLockedVariable = toggleLockedVariable;
exports.unlockVariable = unlockVariable;
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
	};
};

function unlockVariable(name) {
	return {
		name: name,
		type: 'UNLOCK_VARIABLE'
	};
};