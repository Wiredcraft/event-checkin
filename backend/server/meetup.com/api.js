'use strict';

const request = require('request');
const env = require('env-var');
const config = require('../config.env.js');

let BaseURL = env('MEETUP_API_URL', 'https://api.meetup.com').asString();

exports.setBaseURL = function(url) {
  BaseURL = url;
};

exports.getEvents = function(cb) {
  request(`${BaseURL}/self/events?key=${config.meetupCom.apiToken}`, cb);
};

exports.getEventByNameAndId = function(urlname, eventId, cb) {
  request(`${BaseURL}/${urlname}/events/${eventId}?key=${config.meetupCom.apiToken}`, cb);
};

exports.getEventRSVPs = function(urlname, eventId, cb) {
  request(`${BaseURL}/${urlname}/events/${eventId}/rsvps?key=${config.meetupCom.apiToken}`, cb);
};
