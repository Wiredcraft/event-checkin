'use strict';

const path = require('path');
const env = require('env-var');

/**
 * Environment variables, and constants.
 *
 * The idea: things in here would override all the other config files, so this is NOT considered the
 * place for default configs, but the `config.json` and the env-specific config files are.
 */
module.exports = {
  // Project.
  namespace: 'api:%s',

  // Server.
  hostname: env('HOSTNAME', 'localhost').asString(),
  host: env('HOST', '0.0.0.0').asString(),
  port: env('PORT', 9000).asInt(),

  // Log.
  logStream: env('LOG_STREAM').asString(),
  syslogHost: env('SYSLOG_HOST', 'localhost').asString(),
  syslogPort: env('SYSLOG_PORT', 514).asInt(),

  // meetup.com api
  meetupCom: {
    apiToken: env('MEETUP_API_TOKEN').asString()
  }
};
