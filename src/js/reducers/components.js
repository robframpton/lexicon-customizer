import {createReducer} from '../lib/redux_util';
import {Map} from 'immutable';

const actionHandlers = {
	'SET_COMPONENTS': (state, {components}) => {
		return components;
	}
};

export default createReducer(Map(), actionHandlers);
