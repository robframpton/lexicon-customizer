const regexDarken = /darken\((.*),(.*)\)/;

const regexLighten = /lighten\((.*),(.*)\)/;

export function resolveColorValue(name, value, variables) {
	if (variables.has(value)) {
		let resolvedValue = variables.get(value).get('value');

		return resolveColorValue(name, resolvedValue, variables);
	}
	else if (regexDarken.test(value)) {
		value = _resolveSassColor(name, value, variables, true);
	}
	else if (regexLighten.test(value)) {
		value = _resolveSassColor(name, value, variables, false);
	}

	return value;
};

export function _adjustColor(color, percentage) {
	let pound = false;

	if (color[0] == '#') {
		color = color.slice(1);
		pound = true;
	}

	let num = parseInt(color, 16);

	let r = _normalizeRGBAValue((num >> 16) + percentage);
	let b = _normalizeRGBAValue(((num >> 8) & 0x00FF) + percentage);
	let g = _normalizeRGBAValue((num & 0x0000FF) + percentage);

	return (pound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

export function _resolveSassColor(name, value, variables, darken) {
	let regex = darken ? regexDarken : regexLighten;

	let match = value.match(regex);

	let color = match[1];

	if (color.indexOf('$') > -1) {
		color = resolveColorValue(name, color, variables);
	}

	let percentage = parseInt(match[2]);

	if (darken) {
		percentage = percentage * -1;
	}

	return _adjustColor(color, percentage);
};

export function _normalizeRGBAValue(value) {
	if (value > 255) {
		value = 255;
	}
	else if (value < 0) {
		value = 0;
	}

	return value;
};
