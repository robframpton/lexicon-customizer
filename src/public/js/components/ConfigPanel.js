import React, { Component } from 'react'

import ClearThemeButton from '../containers/ClearThemeButton'
import ConfigPanelGroup from '../components/ConfigPanelGroup'
import OpenDevToolsButton from '../components/OpenDevToolsButton'
import ResetButton from '../containers/ResetButton'
import SetThemeButton from '../containers/SetThemeButton'
import ThemeDropper from '../containers/ThemeDropper'
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
				<ConfigPanelGroup label="General">
					<ThemeRadio label="Lexicon Base" value="lexiconBase" />
					<ThemeRadio label="Atlas Theme" value="atlasTheme" />

					<ResetButton />
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Preview Frame">
					<OpenDevToolsButton />
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Theme">
					<ThemeLabel />

					<SetThemeButton />

					<ClearThemeButton />

					<ThemeDropper />
				</ConfigPanelGroup>
			</div>
		)
	}
}

export default ConfigPanel
