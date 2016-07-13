import React, {Component, PropTypes} from 'react';

class Icon extends Component {
	render() {
		return (
			<span className="lexicon-icon-wrapper">
				<svg className="lexicon-icon">
					<use xlinkHref={`../../lexicon/build/images/icons/icons.svg#${this.props.icon}`} />
				</svg>
			</span>
		);
	}
}

Icon.propTypes = {
	icon: PropTypes.string.isRequired
};

export default Icon;