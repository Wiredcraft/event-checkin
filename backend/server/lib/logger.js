'use strict';

const lib = require('./');

/**
 * Build a logger instance.
 */
module.exports = function(options) {
  if (options == null) {
    options = {};
  } else if (typeof options === 'string') {
    options = { stream: options };
  }

  const builder = lib.loggers[options.stream ? options.stream.toLowerCase() : 'debug'];
  if (builder == null) {
    throw new Error('bad stream name ' + options.stream);
  }

  return builder(lib.vars.namespace(options.namespace || ''));
};
