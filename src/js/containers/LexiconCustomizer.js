import React, { Component } from 'react';
import { connect } from 'react-redux';

import ComponentSideMenu from '../containers/ComponentSideMenu';
import ErrorPopup from '../components/ErrorPopup';
import Header from '../components/Header';
import PreviewBox from '../containers/PreviewBox';
import VariablesEditor from '../containers/VariablesEditor';

class LexiconCustomizer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovering: false
		};
	}

	render() {
		let errors = [];

		if (this.props.sassError) {
			errors.push(this.props.sassError);
		}

		return (
			<div
				className="lexicon-customizer"
				data-group={this.props.group}
			>
				<Header />

				<ErrorPopup errors={errors} />

				<div className="lexicon-customizer-content">
					<ComponentSideMenu header="Components" />

					<PreviewBox />

					<VariablesEditor />
				</div>
			</div>
		)
	}
};

const mapStateToProps = (state, ownProps) => {
	let group = state.get('group');
	let sassError = state.get('sassError');

	return {
		group,
		sassError
	};
};

export default connect(mapStateToProps)(LexiconCustomizer);
