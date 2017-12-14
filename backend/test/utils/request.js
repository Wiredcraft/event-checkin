'use strict';

const supertest = require('supertest');
const app = require('../../server/server');

const request = (verb, url) => {
  return supertest(app)[verb](`/api${url}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .auth('admin', 'secret');
};

module.exports = request;
