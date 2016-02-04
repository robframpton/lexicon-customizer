import React, { Component } from 'react'
import ConfigPanel from './ConfigPanel'

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			configPanelOpen: false
		};
	}

	render() {
		return (
			<header className="lexicon-customizer-header">
				<h1>Lexicon Customizer</h1>

				<div className="lexicon-customizer-actions">
					<a
						className="config-panel-toggle-btn"
						href="javascript:;"
						onClick={e => {
							this.setState({
								configPanelOpen: !this.state.configPanelOpen
							});
						}}
					>
						<img src="../images/cog_white.svg"></img>
					</a>

					<ConfigPanel open={this.state.configPanelOpen} />
				</div>
			</header>
		)
	}
}

export default Header