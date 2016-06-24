import {createReducer} from '../lib/util';

const actionHandlers = {
	'CREATE_PREVIEW': (state, {preview}) => {
		return preview;
	}
};

export default createReducer({}, actionHandlers);
