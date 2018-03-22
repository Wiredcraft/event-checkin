'use strict';

const expect = require('chai').expect;
const request = require('./utils/request');

describe(`POST /api/Person`, () => {
  it('Status: 201 - should create a Person item', done => {
    request('post', '/api/people')
      .send(JSON.stringify({ name: 'john doe' }))
      .expect(200)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('john doe');
        done();
      });
  });
});
