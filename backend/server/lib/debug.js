'use strict';

const debug = require('debug');
const lib = require('./');

/**
 * Build a debug function.
 */
module.exports = function(options) {
  if (options == null) {
    options = {};
  } else if (typeof options === 'string') {
    options = { namespace: options };
  }

  const namespace = lib.vars.namespace(options.namespace || '');

  // TODO
  // As a best practice, the first argument to the debug functions should always be a message string.

  if (options.output === 'debug') {
    return debug(namespace);
  }

  const logger = lib.loggers.debug(namespace);
  return logger.debug.bind(logger);
};
