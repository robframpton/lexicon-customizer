import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_LEXICON_DIR: (state, {dirName, dir}) => {
		let newDir = {};

		newDir[dirName] = dir;

		return Object.assign({}, state, newDir);
	},

	SET_LEXICON_DIRS: (state, {dirs}) => {
		return dirs;
	}
};

export default createReducer({}, actionHandlers);
