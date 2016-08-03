import * as varUtil from '../lib/var_util';
import {setComponents} from './components';

export function overwriteSourceVariables(variables) {
	return (dispatch, getState) => {
		dispatch({
			type: 'OVERWRITE_SOURCE_VARIABLES',
			variables
		});

		dispatch(setComponents(varUtil.getComponentsFromVariablesMap(variables)));
	};
};
