import {combineReducers} from 'redux-immutable';

import baseLexiconTheme from './baseLexiconTheme';
import bootstrapComponents from './bootstrapComponents';
import components from './components';
import filePaths from './filePaths';
import group from './group';
import preview from './preview';
import previewPopout from './previewPopout';
import sassError from './sassError';
import selectedComponent from './selectedComponent';
import sourceVariables from './sourceVariables';
import theme from './theme';
import variables from './variables';

const lexiconCustomizerReducer = combineReducers({
	baseLexiconTheme,
	bootstrapComponents,
	components,
	filePaths,
	group,
	preview,
	previewPopout,
	sassError,
	selectedComponent,
	sourceVariables,
	theme,
	variables
});

export default lexiconCustomizerReducer;
