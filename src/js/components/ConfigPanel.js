import React, {Component} from 'react';

import ClearThemeButton from '../containers/action_buttons/ClearThemeButton';
import ConfigPanelGroup from '../components/ConfigPanelGroup';
import OpenDevToolsButton from '../components/OpenDevToolsButton';
import ResetButton from '../containers/action_buttons/ResetButton';
import SetThemeButton from '../containers/action_buttons/SetThemeButton';
import ThemeDropper from '../containers/ThemeDropper';
import ThemeRadio from '../containers/ThemeRadio';

import ExportButton from '../containers/action_buttons/ExportButton';
import ImportButton from '../containers/action_buttons/ImportButton';

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
					<ThemeDropper />

					<ClearThemeButton />
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Import/Export">
					<ExportButton />

					<ImportButton />
				</ConfigPanelGroup>
			</div>
		)
	}
}

export default ConfigPanel;
