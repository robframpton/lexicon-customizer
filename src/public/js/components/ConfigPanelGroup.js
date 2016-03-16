import React, { Component, PropTypes } from 'react'

class ConfigPanelGroup extends Component {
	render() {
		return (
			<div className="config-panel-group">
				<span className="config-panel-group-label">
					<span className="config-panel-group-label-text">{this.props.label}</span>
				</span>

				{this.props.children}
			</div>
		)
	}
}

ConfigPanelGroup.propTypes = {
	label: PropTypes.string.isRequired
}

export default ConfigPanelGroup;
