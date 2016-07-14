import UserConfig from '../lib/system/user_config';

const userConfig = new UserConfig();

export function setSelectedComponent(component) {
	userConfig.setConfig('selectedComponent', component);

	return {
		component,
		type: 'SET_SELECTED_COMPONENT'
	};
};
