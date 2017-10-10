'use strict';

const uuid = require('uuid');
const expressLogger = require('express-bunyan-logger');

const lib = require('../lib');

module.exports = function(options) {
  if (options == null) {
    options = {};
  }
  const logger = lib.logger(options);
  const debugging = lib.vars.debugging(options.debug);

  const attr = options.attributeName || 'transactionId';
  let header = options.header;
  if (header == null) {
    header = 'x-transaction-id';
  } else {
    header = header.toLowerCase();
  }

  /**
   * Attach a transaction ID to the request, if not there already.
   */
  const transactionId = function(req, res, next) {
    if (req.headers == null) {
      req.headers = {};
    }
    if (!req.headers[header]) {
      req.headers[header] = debugging ? 'transaction-id' : uuid.v4();
    }
    req[attr] = req.headers[header];
    return next();
  };

  /**
   * Shortcut.
   */
  lib.getTransactionId = function(req) {
    return req[attr];
  };

  /**
   * Log request.
   */
  const logRequest = expressLogger({
    logger,
    immediate: true,
    genReqId: lib.getTransactionId,
    excludes: ['res', 'res-headers']
  });

  /**
   * Log response.
   */
  const logResponse = expressLogger({
    logger,
    immediate: false,
    genReqId: lib.getTransactionId
  });

  return lib.app.loopback.Router().use(transactionId, logRequest, logResponse);
};
