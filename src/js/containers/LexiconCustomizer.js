import React, {Component} from 'react';
import {connect} from 'react-redux';

import ComponentSideMenu from '../containers/ComponentSideMenu';
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
			</div>
		)
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		group: state.get('group'),
		previewPopout: state.get('previewPopout'),
		sassError: state.get('sassError'),
		selectedComponent: state.get('selectedComponent')
	};
};

export default connect(mapStateToProps)(LexiconCustomizer);
