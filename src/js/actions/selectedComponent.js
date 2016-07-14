import UserConfig from '../lib/system/user_config';
import {setColorVariableName} from '../actions/colorVariableName';

const userConfig = new UserConfig();

export function setSelectedComponent(component) {
	return (dispatch, getState) => {
		userConfig.setConfig('selectedComponent', component);

		dispatch(setColorVariableName(null));

		dispatch({
			component,
			type: 'SET_SELECTED_COMPONENT'
		});
	};
};
