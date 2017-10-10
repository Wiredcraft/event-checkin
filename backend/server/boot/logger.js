'use strict';

const lib = require('../lib');

/**
 * Initialize the logger.
 */
module.exports = function(app) {
  // The logger.
  app.logger = lib.logger(app.get('logStream'));
};
