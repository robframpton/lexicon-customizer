import {createReducer} from '../lib/util';
import {Map} from 'immutable';

const actionHandlers = {
	'SET_COMPONENTS': (state, {components}) => {
		return components;
	}
};

export default createReducer(Map(), actionHandlers);
