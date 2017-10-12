'use strict';

const { disableAllMethods } = require('../lib/utils');

module.exports = (Checkin) => {
  disableAllMethods(Checkin, ['create', 'find', 'findById', 'deleteById']);
};
