import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, {Component} from 'react';

class ErrorPopup extends Component {
	render() {
		const {errors} = this.props;

		return (
			<div className="error-popup-wrapper">
				<ReactCSSTransitionGroup
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}
					transitionName="error-popup-transition-group"
				>
					{errors.map((error, index) => {
						return (<div className="error-popup" key={error}>{error.message}</div>);
					})}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
};

export default ErrorPopup;
