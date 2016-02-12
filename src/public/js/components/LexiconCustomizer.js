import React, { Component } from 'react';

import ComponentSideMenu from '../containers/ComponentSideMenu';
import Header from './Header';
import PreviewBox from '../containers/PreviewBox';
import VariablesEditor from '../containers/VariablesEditor';
import ThemeDropper from '../containers/ThemeDropper';

class LexiconCustomizer extends Component {
	render() {
		return (
			<div className="lexicon-customizer">
				<Header />

				<div className="lexicon-customizer-content">
					<ComponentSideMenu header="Components" />

					<PreviewBox />

					<VariablesEditor />
				</div>

				<ThemeDropper>
					Drop theme here!
				</ThemeDropper>
			</div>
		)
	}
};

export default LexiconCustomizer;