import React, {Component} from 'react';

import DevTools from '../containers/DevTools';
import LexiconCustomizer from '../containers/LexiconCustomizer';

class Root extends Component {
	render() {
		return (
			<div>
				<LexiconCustomizer />

				<DevTools />
			</div>
		);
	}
}

export default Root;
