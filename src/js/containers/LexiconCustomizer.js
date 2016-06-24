import React, { Component } from 'react';
import { connect } from 'react-redux';

import ComponentSideMenu from '../containers/ComponentSideMenu';
import Header from '../components/Header';
import PreviewBox from '../containers/PreviewBox';
import VariablesEditor from '../containers/VariablesEditor';

const mapStateToProps = ({ group }, ownProps) => {
	return {
		group
	};
};

class LexiconCustomizer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovering: false
		};
	}

	render() {
		return (
			<div
				className="lexicon-customizer"
				data-group={this.props.group}
			>
				<Header />

				<div className="lexicon-customizer-content">
					<ComponentSideMenu header="Components" />

					<PreviewBox />

					<VariablesEditor />
				</div>
			</div>
		)
	}
};

export default connect(mapStateToProps)(LexiconCustomizer);
