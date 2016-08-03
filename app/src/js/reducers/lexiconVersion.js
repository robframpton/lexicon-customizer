import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_LEXICON_VERSION: (state, {version}) => {
		return version;
	}
};

export default createReducer(null, actionHandlers);
