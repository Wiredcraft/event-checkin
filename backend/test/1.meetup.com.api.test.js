'use strict';

const should = require('chai').should();
const meetupAPI = require('../server/meetup.com/api');

// set the basepath to the mock server
meetupAPI.setBaseURL('http://localhost:4000');

const urlName = 'abc';
const eventId = 123456;

describe.only(`meetup.com api client`, () => {
  it('getEvents', done => {
    meetupAPI.getEvents((err, response, body) => {
      should.not.exist(err);
      response.statusCode.should.equal(200);
      let bodyParsed = JSON.parse(body);
      bodyParsed.should.be.an('array');
      done();
    });
  });

  it('getEventByNameAndId', done => {
    meetupAPI.getEventByNameAndId(urlName, eventId, (err, response, body) => {
      should.not.exist(err);
      response.statusCode.should.equal(200);
      let bodyParsed = JSON.parse(body);
      bodyParsed.should.be.an('object');
      done();
    });
  });

  it('getEventRSVPs', done => {
    meetupAPI.getEventRSVPs(urlName, eventId, (err, response, body) => {
      should.not.exist(err);
      response.statusCode.should.equal(200);
      let bodyParsed = JSON.parse(body);
      bodyParsed.should.be.an('array');
      done();
    });
  });
});
