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

import Icon from '../components/Icon';

import PopoutPreviewButton from '../containers/action_buttons/PopoutPreviewButton';

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

					<ResetButton>
						Reset All
					</ResetButton>

					<ResetComponentButton>
						Reset Component
					</ResetComponentButton>
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Preview Frame">
					<OpenDevToolsButton>
						Inspect Preview
					</OpenDevToolsButton>

					<PopoutPreviewButton>
						Popout Preview
					</PopoutPreviewButton>
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Theme">
					<ThemeDropper />

					<ClearThemeButton>
						Clear Theme
					</ClearThemeButton>
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Import/Export">
					<ExportButton>
						Export Variables
					</ExportButton>

					<ImportButton>
						Import Variables
					</ImportButton>
				</ConfigPanelGroup>
			</div>
		)
	}
}

export default ConfigPanel;
