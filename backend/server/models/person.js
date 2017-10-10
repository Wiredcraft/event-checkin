'use strict';

const { disableAllMethods } = require('../lib/utils');

module.exports = (Person) => {
  disableAllMethods(Person, ['create', 'find', 'findById', 'prototype.patchAttributes', 'deleteById']);
};
