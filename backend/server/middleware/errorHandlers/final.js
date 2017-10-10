'use strict';

const strongErrorHandler = require('strong-error-handler');

const lib = require('../../lib');
const debug = lib.debug('errorHandler');

/**
 * A simple wrapper, removes error stack in some cases.
 *
 * @param {Object} options
 * @return {Function}
 */
module.exports = function(options) {
  if (options == null) {
    options = {};
  }
  const debugging = lib.vars.debugging(options.debug);

  /**
   * The final handler. Not always called as the errors can be handled by another middleware (like
   * rendered into a page). Always in debug mode and remove error stack in another way. Never log
   * here as log is done in a previous middleware.
   */
  const final = strongErrorHandler(Object.assign(options, {
    log: false,
    debug: true
  }));

  return function errorHandler(err, req, res, next) {
    debug(err);
    if (!debugging) {
      delete err.stack;
    }

    // The strong-error-handler.
    return final(err, req, res, next);
  };
};
