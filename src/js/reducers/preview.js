import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	CREATE_PREVIEW: (state, {preview}) => {
		return preview;
	}
};

export default createReducer({}, actionHandlers);
