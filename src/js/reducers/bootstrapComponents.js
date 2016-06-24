import {createReducer} from '../lib/util';

const actionHandlers = {
	'SET_BOOTSTRAP_COMPONENTS': (state, {components}) => {
		return components;
	}
};

export default createReducer({}, actionHandlers);
