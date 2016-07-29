import UserConfig from '../lib/system/user_config';

const userConfig = new UserConfig();

export function lockVariable(name) {
	return {
		name,
		type: 'LOCK_VARIABLE'
	}
};

export function toggleLockedVariable(name) {
	return function(dispatch, getState) {
		const state = getState();

		const lockedVariables = state.get('lockedVariables');

		if (lockedVariables.has(name)) {
			dispatch(unlockVariable(name));
		}
		else {
			dispatch(lockVariable(name));
		}

		userConfig.setConfig('lockedVariables', getState().get('lockedVariables').toArray());
	};
};

export function unlockVariable(name) {
	return {
		name,
		type: 'UNLOCK_VARIABLE'
	}
};
