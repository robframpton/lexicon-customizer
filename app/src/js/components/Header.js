import React, {Component} from 'react';

import ConfigPanel from './ConfigPanel';
import MenuIcon from './MenuIcon';

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
				<span className="lexicon-customizer-header-title">Lexicon Customizer</span>

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
						<MenuIcon />
					</a>

					<ConfigPanel open={this.state.configPanelOpen} />
				</div>
			</header>
		)
	}
}

export default Header;