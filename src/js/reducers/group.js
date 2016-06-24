import {createReducer} from '../lib/util';

const actionHandlers = {
	'SET_GROUP': (state, {group}) => {
		return group;
	}
};

export default createReducer('lexicon', actionHandlers);
