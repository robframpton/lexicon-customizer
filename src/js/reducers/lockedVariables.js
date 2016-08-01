import {Set} from 'immutable';

import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	LOCK_VARIABLE: (state, {name}) => {
		return state.add(name);
	},

	UNLOCK_ALL_VARIABLES: (state, action) => {
		return Set();
	},

	UNLOCK_VARIABLE: (state, {name}) => {
		return state.delete(name);
	}
};

export default createReducer(Set(), actionHandlers);
