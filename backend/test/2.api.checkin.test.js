'use strict';

const expect = require('chai').expect;
const request = require('./utils/request');

let id;

describe(`API checkin`, () => {
  describe(`POST /api/checkins`, () => {
    it('Status: 200 - should create checkin item', done => {
      const postData = {
        urlName: 'test-name',
        eventId: 'test-event',
        memberId: 'test-member'
      };
      request('post', '/api/checkins')
        .send(JSON.stringify(postData))
        .expect(200)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.body).to.be.an('object');
          expect(res.body.urlName).to.equal('test-name');
          expect(res.body.eventId).to.equal('test-event');
          expect(res.body.memberId).to.equal('test-member');
          id = res.body.id;
          done();
        });
    });
  });

  describe(`GET /api/checkins`, () => {
    it('Status: 200 - should get a list of checkins', done => {
      request('get', '/api/checkins')
        .expect(200)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe(`GET /api/checkins/:id`, () => {
    it('Status: 200 - should get a single checkin item', done => {
      request('get', '/api/checkins/' + id)
        .expect(200)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.body).to.be.an('object');
          expect(res.body.urlName).to.equal('test-name');
          expect(res.body.eventId).to.equal('test-event');
          expect(res.body.memberId).to.equal('test-member');
          done();
        });
    });
  });

  describe(`DELETE /api/checkins`, () => {
    it('Status: 200 - should delete a single checkin item', done => {
      request('delete', '/api/checkins/' + id)
        .expect(200)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.equal(1);
          done();
        });
    });
  });
});
