'use strict';

const lib = require('./');
const path = require('path');

// Singleton.
module.exports = lib.extended.loopback(path.resolve(__dirname, '../'));
