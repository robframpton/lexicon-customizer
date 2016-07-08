import React, {Component} from 'react';

import ClearThemeButton from '../containers/action_buttons/ClearThemeButton';
import ConfigPanelGroup from '../components/ConfigPanelGroup';
import ExportButton from '../containers/action_buttons/ExportButton';
import ImportButton from '../containers/action_buttons/ImportButton';
import OpenDevToolsButton from '../components/OpenDevToolsButton';
import ResetButton from '../containers/action_buttons/ResetButton';
import ResetComponentButton from '../containers/action_buttons/ResetComponentButton';
import ThemeDropper from '../containers/ThemeDropper';
import ThemeRadio from '../containers/ThemeRadio';

class ConfigPanel extends Component {
	render() {
		var className = 'lexicon-customizer-config-panel';

		if (this.props.open) {
			className += ' open';
		}

		return (
			<div className={className}>
				<ConfigPanelGroup label="Variables">
					<ThemeRadio label="Lexicon Base" value="lexiconBase" />
					<ThemeRadio label="Atlas Theme" value="atlasTheme" />

					<ResetButton label="Reset All Variables" />

					<ResetComponentButton label="Reset Component Variables" />
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Preview Frame">
					<OpenDevToolsButton />
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Theme">
					<ThemeDropper />

					<ClearThemeButton label="Clear Theme" />
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Import/Export">
					<ExportButton label="Export Variables" />

					<ImportButton label="Import Variables" />
				</ConfigPanelGroup>
			</div>
		)
	}
}

export default ConfigPanel;
