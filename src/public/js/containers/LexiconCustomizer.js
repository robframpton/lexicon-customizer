import React, { Component } from 'react';
import { connect } from 'react-redux';

import ComponentSideMenu from '../containers/ComponentSideMenu';
import Header from '../components/Header';
import PreviewBox from '../containers/PreviewBox';
import VariablesEditor from '../containers/VariablesEditor';
import ThemeDropper from '../containers/ThemeDropper';

const mapStateToProps = ({ group }, ownProps) => {
	return {
		group
	};
};

class LexiconCustomizer extends Component {
	render() {
		return (
			<div className="lexicon-customizer" data-group={this.props.group}>
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

export default connect(mapStateToProps)(LexiconCustomizer);
