'use strict';

const Logger = require('bunyan-logger');

const lib = require('../');
const app = lib.app;

module.exports = function(name) {
  return new Logger({
    name: name,
    level: 'debug',
    stream: {
      name: 'syslog',
      options: {
        name: name,
        host: app.get('syslogHost') || 'localhost',
        port: app.get('syslogPort') || 514
      }
    }
  });
};
