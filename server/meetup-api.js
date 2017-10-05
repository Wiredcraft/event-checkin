const request = require('request');
const config = require('./config')
const BaseURL = 'https://api.meetup.com'

exports.getEvents = function(cb) {
  request(`${BaseURL}/self/events?key=${config.meetup.apiToken}`, cb);
}

exports.getRSVPs = function(urlname, eventId, cb) {
  request(`${BaseURL}/${urlname}/events/${eventId}/rsvps?key=${config.meetup.apiToken}`, cb);
}
