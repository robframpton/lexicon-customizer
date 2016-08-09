import React, {Component} from 'react';
import {connect} from 'react-redux';

import ComponentSideMenu from '../containers/ComponentSideMenu';
import ErrorPopup from '../components/ErrorPopup';
import Header from '../components/Header';
import LexiconPreview from '../containers/LexiconPreview';
import VariablesEditor from '../containers/VariablesEditor';
import {clearSassErrors} from '../actions/sassErrors';
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
		const {previewPopout, sassErrors} = this.props;

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

				{this.renderSassErrors()}

				<div className="lexicon-customizer-content">
					<ComponentSideMenu header="Components" />

					{lexiconPreview}

					<VariablesEditor />
				</div>
			</div>
		)
	}

	renderSassErrors() {
		const {sassErrors} = this.props;

		let content = '';

		if (sassErrors.size) {
			content = (
				<ErrorPopup errors={sassErrors} onClear={this.handleSassErrorsClear.bind(this)} />
			);
		}

		return content;
	}

	handleSassErrorsClear() {
		const {dispatch} = this.props;

		dispatch(clearSassErrors());
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		group: state.get('group'),
		previewPopout: state.get('previewPopout'),
		sassErrors: state.get('sassErrors'),
		selectedComponent: state.get('selectedComponent')
	};
};

export default connect(mapStateToProps)(LexiconCustomizer);
