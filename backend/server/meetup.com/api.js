'use strict';

const request = require('request');
const config = require('../config.env.js');
const BaseURL = 'https://api.meetup.com';

exports.getEvents = function(cb) {
  request(`${BaseURL}/self/events?key=${config.meetupCom.apiToken}`, cb);
};

exports.getEventByNameAndId = function(urlname, eventId, cb) {
  request(`${BaseURL}/${urlname}/events/${eventId}?key=${config.meetupCom.apiToken}`, cb);
};

exports.getEventRSVPs = function(urlname, eventId, cb) {
  request(`${BaseURL}/${urlname}/events/${eventId}/rsvps?key=${config.meetupCom.apiToken}`, cb);
};
