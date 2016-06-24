import {createReducer} from '../lib/util';

const actionHandlers = {
	'SET_BASE_LEXICON_THEME': (state, {value}) => {
		return value;
	}
};

export default createReducer('lexiconBase', actionHandlers);
