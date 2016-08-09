import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';

class ErrorPopup extends Component {
	render() {
		const {errors, onClear} = this.props;

		return (
			<div className="error-popup-wrapper">
				<a className="error-popup-clear-btn" href="javascript:;" onClick={this.handleClearBtnClick.bind(this)}>
					<Icon icon="times" />
				</a>

				<div className="error-popup-list">
					{errors.toArray().map((error, index) => {
						const errorString = error.toString();

						return (
							<div className="error-popup-item" key={errorString}>{errorString}</div>
						);
					})}
				</div>
			</div>
		);
	}

	handleClearBtnClick() {
		this.props.onClear();
	}
};

ErrorPopup.propTypes = {
	errors: ImmutablePropTypes.list,
	onClear: PropTypes.func.isRequired
};

export default ErrorPopup;
