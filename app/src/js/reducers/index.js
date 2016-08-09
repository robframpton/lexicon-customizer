import {combineReducers} from 'redux-immutable';

import baseLexiconTheme from './baseLexiconTheme';
import bootstrapComponents from './bootstrapComponents';
import colorVariableName from './colorVariableName';
import components from './components';
import group from './group';
import lexiconDirs from './lexiconDirs';
import lexiconVersion from './lexiconVersion';
import lockedVariables from './lockedVariables';
import preview from './preview';
import previewPopout from './previewPopout';
import sassErrors from './sassErrors';
import selectedComponent from './selectedComponent';
import sourceVariables from './sourceVariables';
import theme from './theme';
import variables from './variables';

const lexiconCustomizerReducer = combineReducers({
	baseLexiconTheme,
	bootstrapComponents,
	colorVariableName,
	components,
	group,
	lexiconDirs,
	lexiconVersion,
	lockedVariables,
	preview,
	previewPopout,
	sassErrors,
	selectedComponent,
	sourceVariables,
	theme,
	variables
});

export default lexiconCustomizerReducer;
