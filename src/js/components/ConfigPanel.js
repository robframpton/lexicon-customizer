import React, {Component} from 'react';

import ClearThemeButton from '../containers/action_buttons/ClearThemeButton';
import ConfigPanelGroup from '../components/ConfigPanelGroup';
import ExportButton from '../containers/action_buttons/ExportButton';
import Icon from '../components/Icon';
import ImportButton from '../containers/action_buttons/ImportButton';
import OpenDevToolsButton from '../components/OpenDevToolsButton';
import PopoutPreviewButton from '../containers/action_buttons/PopoutPreviewButton';
import ResetButton from '../containers/action_buttons/ResetButton';
import ResetComponentButton from '../containers/action_buttons/ResetComponentButton';
import ThemeDropper from '../containers/ThemeDropper';
import ThemeRadio from '../containers/ThemeRadio';
import VariableActionsDropdown from '../containers/VariableActionsDropdown';

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

					<VariableActionsDropdown />
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Preview Frame">
					<OpenDevToolsButton>Inspect Preview</OpenDevToolsButton>

					<PopoutPreviewButton>Popout Preview</PopoutPreviewButton>
				</ConfigPanelGroup>

				<ConfigPanelGroup label="Theme">
					<ThemeDropper />

					<ClearThemeButton>Clear Theme</ClearThemeButton>
				</ConfigPanelGroup>
			</div>
		)
	}
}

export default ConfigPanel;
