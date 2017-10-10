'use strict';

const Logger = require('bunyan-logger');
const DebugStream = require('bunyan-debug-stream');

module.exports = function(name) {
  return new Logger({
    name: name,
    level: 'debug',
    stream: 'debug',
    serializers: DebugStream.serializers
  });
};
