'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.resolveColorValue = resolveColorValue;
exports._adjustColor = _adjustColor;
exports._resolveSassColor = _resolveSassColor;
exports._normalizeRGBAValue = _normalizeRGBAValue;
var regexDarken = /darken\((.*),(.*)\)/;

var regexLighten = /lighten\((.*),(.*)\)/;

function resolveColorValue(name, value, variables) {
	if (variables.has(value)) {
		var resolvedValue = variables.get(value).get('value');

		return resolveColorValue(name, resolvedValue, variables);
	} else if (regexDarken.test(value)) {
		value = _resolveSassColor(name, value, variables, true);
	} else if (regexLighten.test(value)) {
		value = _resolveSassColor(name, value, variables, false);
	}

	return value;
};

function _adjustColor(color, percentage) {
	var pound = false;

	if (color[0] == '#') {
		color = color.slice(1);
		pound = true;
	}

	var num = parseInt(color, 16);

	var r = _normalizeRGBAValue((num >> 16) + percentage);
	var b = _normalizeRGBAValue((num >> 8 & 0x00FF) + percentage);
	var g = _normalizeRGBAValue((num & 0x0000FF) + percentage);

	return (pound ? '#' : '') + (g | b << 8 | r << 16).toString(16);
};

function _resolveSassColor(name, value, variables, darken) {
	var regex = darken ? regexDarken : regexLighten;

	var match = value.match(regex);

	var color = match[1];

	if (color.indexOf('$') > -1) {
		color = resolveColorValue(name, color, variables);
	}

	var percentage = parseInt(match[2]);

	if (darken) {
		percentage = percentage * -1;
	}

	return _adjustColor(color, percentage);
};

function _normalizeRGBAValue(value) {
	if (value > 255) {
		value = 255;
	} else if (value < 0) {
		value = 0;
	}

	return value;
};