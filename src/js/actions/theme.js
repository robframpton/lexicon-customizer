import UserConfig from '../lib/system/user_config';
import {isTheme} from '../lib/system/theme';

const userConfig = new UserConfig();

export function setTheme(path) {
	if (!path || !isTheme(path)) {
		path = '';
	}

	userConfig.setConfig('theme', path);

	return {
		path,
		type: 'SET_THEME'
	};
};
