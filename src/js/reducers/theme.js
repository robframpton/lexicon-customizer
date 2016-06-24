import {createReducer} from '../lib/util';

const actionHandlers = {
	'SET_THEME': (state, {path}) => {
		return path;
	}
};

export default createReducer('', actionHandlers);
