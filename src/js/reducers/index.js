import baseLexiconTheme from './baseLexiconTheme';
import bootstrapComponents from './bootstrapComponents';
import components from './components';
import group from './group';
import preview from './preview';
import previewLoading from './previewLoading';
import sassError from './sassError';
import selectedComponent from './selectedComponent';
import sourceVariables from './sourceVariables';
import theme from './theme';
import { combineReducers } from 'redux-immutable';

import variables from './variables';

const lexiconCustomizerReducer = combineReducers({
	baseLexiconTheme,
	bootstrapComponents,
	components,
	group,
	preview,
	previewLoading,
	sassError,
	selectedComponent,
	sourceVariables,
	theme,
	variables
});

export default lexiconCustomizerReducer;
