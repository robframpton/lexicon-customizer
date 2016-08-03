import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_GROUP: (state, {group}) => {
		return group;
	}
};

export default createReducer('lexicon', actionHandlers);
