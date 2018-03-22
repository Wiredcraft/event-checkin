'use strict';

const expect = require('chai').expect;
const request = require('./utils/request');

describe(`API event`, () => {
  describe(`GET /api/event`, () => {
    it('Status: 200 - should get a list of events', done => {
      request('get', '/api/events')
        .expect(200)
        .end((err, res) => {
          expect(err).to.not.exist;
          console.log(res.body);
          done();
        });
    });
  });

  // describe(`GET /api/event/:name/:id`, () => {
  //   it('Status: 200 - should get a single event', done => {
  //     const urlName = 'abc';
  //     const eventId = '123';
  //     request('get', '/api/events/' + urlName + '/' + eventId)
  //       .expect(200)
  //       .end((err, res) => {
  //         expect(err).to.not.exist;
  //         console.log(res.body);
  //         done();
  //       });
  //   });
  // });

  // describe(`GET /api/event/:name/:id/rsvps`, () => {
  //   it('Status: 200 - should get a list of rsvps of an event', done => {
  //     const urlName = 'abc';
  //     const eventId = '123';
  //     request('get', '/api/events/' + urlName + '/' + eventId + '/rsvps')
  //       .expect(200)
  //       .end((err, res) => {
  //         expect(err).to.not.exist;
  //         console.log(res.body);
  //         done();
  //       });
  //   });
  // });
});
