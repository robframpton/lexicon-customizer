import React, { Component } from 'react';

import _ from 'lodash';
import fs from 'fs';
import he from 'he';
import path from 'path';

class PreviewBox extends Component {
	render() {
		var componentName = this.props.componentName;

		var htmlContent = '';

		if (componentName) {
			var componentHTMLFileName = componentName + '.html';

			if (!fs.exists(path.join(process.cwd(), 'node_modules/lexicon/src/content', componentHTMLFileName))) {
				componentHTMLFileName = componentHTMLFileName.replace('-', '_');
			}

			htmlContent = fs.readFileSync(path.join(process.cwd(), 'node_modules/lexicon/src/content', componentHTMLFileName), {
				encoding: 'utf8'
			});

			var imagesPath = path.join(process.cwd(), 'node_modules/lexicon/src/images');

			htmlContent = htmlContent.replace(/\.\.\/\.\.\/images/g, imagesPath);
			htmlContent = htmlContent.replace(/{{rootPath}}\/images/g, imagesPath);
			htmlContent = htmlContent.replace(/\`\`\`([\s\S]+?)\`\`\`/gi, function(match, group) {
				if (group) {
					return he.encode(group, {
						useNamedReferences: true
					});
				}

				return '';
			});
			htmlContent = htmlContent.replace(/(---[\s\S]+---)/, '<h3>Preview</h3>');
		}

		var baseLexiconTheme = _.kebabCase(this.props.baseLexiconTheme);

		var filePath = path.join(process.cwd(), 'lexicon/build/' + baseLexiconTheme + '.css');

		var linkElement = '<link rel="stylesheet" href="' + filePath + '" />'

		htmlContent = '<html><head>' + linkElement + '</head><body class="lexicon-customizer-preview-box">' + htmlContent + '</body></html>';

		var lexiconHTMLPath = path.join(process.cwd(), 'lexicon/build/lexicon-preview.html');

		fs.writeFileSync(lexiconHTMLPath, htmlContent);

		lexiconHTMLPath += '?t=' + Date.now();

		return (
			<div className="preview-box">
				<webview autosize="on" maxWidth="100%" src={lexiconHTMLPath}></webview>
			</div>
		);
	}
};

export default PreviewBox