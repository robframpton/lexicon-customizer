import React, {Component} from 'react';
import {connect} from 'react-redux';

import ComponentSideMenu from '../containers/ComponentSideMenu';
import DevTools from '../containers/DevTools';
import ErrorPopup from '../components/ErrorPopup';
import Header from '../components/Header';
import LexiconPreview from '../containers/LexiconPreview';
import VariablesEditor from '../containers/VariablesEditor';
import {renderPreview} from '../actions/index';

class LexiconCustomizer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovering: false
		};
	}

	componentDidMount() {
		const {dispatch, selectedComponent} = this.props;

		dispatch(renderPreview(selectedComponent));
	}

	render() {
		let errors = [];

		const {previewPopout, sassError} = this.props;

		if (sassError) {
			errors.push(sassError);
		}

		let className = 'lexicon-customizer';
		let lexiconPreview = '';

		if (previewPopout) {
			className += ' has-popout-preview';
		}
		else {
			lexiconPreview = (
				<LexiconPreview />
			);
		}

		return (
			<div
				className={className}
				data-group={this.props.group}
			>
				<Header />

				<ErrorPopup errors={errors} />

				<div className="lexicon-customizer-content">
					<ComponentSideMenu header="Components" />

					{lexiconPreview}

					<VariablesEditor />
				</div>

				<DevTools />
			</div>
		)
	}
};

const mapStateToProps = (state, ownProps) => {
	const group = state.get('group');
	const previewPopout = state.get('previewPopout');
	const sassError = state.get('sassError');
	const selectedComponent = state.get('selectedComponent');

	return {
		group,
		previewPopout,
		sassError,
		selectedComponent
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LexiconCustomizer);
