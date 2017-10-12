'use strict';

const merge = require('lodash.merge');
const env = require('./config.env.js');

module.exports = merge({
  logStream: 'debug'
}, env);
