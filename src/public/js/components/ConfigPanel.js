import React, { Component } from 'react'
import ClearThemeButton from '../containers/ClearThemeButton'
import ResetButton from '../containers/ResetButton'
import ThemeLabel from '../containers/ThemeLabel'
import ThemeRadio from '../containers/ThemeRadio'

class ConfigPanel extends Component {
	render() {
		var className = 'lexicon-customizer-config-panel';

		if (this.props.open) {
			className += ' open';
		}

		return (
			<div className={className}>
				<ThemeRadio label="Lexicon Base" value="lexiconBase" />
				<ThemeRadio label="Atlas Theme" value="atlasTheme" />

				<ThemeLabel />

				<ResetButton />
				<ClearThemeButton />
			</div>
		)
	}
}

export default ConfigPanel