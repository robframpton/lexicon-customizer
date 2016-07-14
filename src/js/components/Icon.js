import React, {Component, PropTypes} from 'react';

class Icon extends Component {
	render() {
		const {icon, ...other} = this.props;

		return (
			<span className="lexicon-icon-wrapper" {...other}>
				<svg className="lexicon-icon">
					<use xlinkHref={`../../lexicon/build/images/icons/icons.svg#${icon}`} />
				</svg>
			</span>
		);
	}
}

Icon.propTypes = {
	icon: PropTypes.string.isRequired
};

export default Icon;