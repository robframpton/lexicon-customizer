import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import React from 'react';
import { createDevTools } from 'redux-devtools';

const DevTools = createDevTools(
	<DockMonitor
		changePositionKey='ctrl-q'
		defaultIsVisible={false}
		toggleVisibilityKey='ctrl-d'
	>
		<LogMonitor theme='tomorrow' />
	</DockMonitor>
);

export default DevTools;
