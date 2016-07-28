import enhanceWithClickOutside from 'react-click-outside';
import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';

class Dropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		};
	}

	render() {
		const {children} = this.props;

		return (
			<div className="dropdown">
				<a className="dropdown-trigger" href="javascript:;" onClick={this.handleTriggerClick.bind(this)}>{children}</a>

				{this.renderOptions()}
			</div>
		);
	}

	renderOptions() {
		const instance = this;

		const {open} = this.state;
		const {options} = this.props;

		let className = 'dropdown-options';

		if (open) {
			className += ' open';
		}

		return (
			<div className={className}>
				{options.map((option, index) => {
					const {icon, label} = option;

					return (
						<div className="dropdown-option">
							<a
								className="dropdown-option-link"
								href="javascript:;"
								onClick={instance.handleOptionClick.bind(instance, option)}
							>
								<Icon icon={icon} />

								{label}
							</a>
						</div>
					);
				})}
			</div>
		);
	}

	close() {
		this.setState({
			open: false
		});
	}

	handleClickOutside() {
		this.close();
	}

	handleOptionClick(option) {
		const {action} = option;

		const {handleOptionClick} = this.props;

		this.close();

		if (action) {
			action(option);
		}
		else if (handleOptionClick) {
			handleOptionClick(option);
		}
	}

	handleTriggerClick(event) {
		this.setState({
			open: !this.state.open
		});
	}
}

Dropdown.propTypes = {
	handleOptionClick: PropTypes.func,
	options: PropTypes.array.isRequired
};

export default enhanceWithClickOutside(Dropdown);
