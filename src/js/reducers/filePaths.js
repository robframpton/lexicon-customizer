import {Map} from 'immutable';

import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	'SET_FILE_PATH': (state, {name, path}) => {
		return state.set(name, path);
	}
};

export default createReducer(Map(), actionHandlers);
