import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_PREVIEW_POPOUT: (state, {previewPopout}) => {
		return previewPopout;
	}
};

export default createReducer(null, actionHandlers);
