import React, {Component} from 'react';

import ClearThemeButton from '../containers/action_buttons/ClearThemeButton';
import ConfigPanelGroup from '../components/ConfigPanelGroup';
import Icon from '../components/Icon';
import ToggleDevToolsButton from '../containers/action_buttons/ToggleDevToolsButton';
import TogglePopoutPreviewButton from '../containers/action_buttons/TogglePopoutPreviewButton';
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
					<ToggleDevToolsButton>Toggle Developer Tools</ToggleDevToolsButton>

					<TogglePopoutPreviewButton>Togle Popout Preview</TogglePopoutPreviewButton>
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
