'use strict';

if (process.env.NODE_ENV === 'development') {
	module.exports = require('./RootDev');
} else {
	module.exports = require('./RootProd');
}