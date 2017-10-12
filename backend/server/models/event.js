'use strict';

const { disableAllMethods } = require('../lib/utils');
const { getEvents, getEventByNameAndId, getEventRSVPs } = require('../meetup.com/api');

module.exports = (Event) => {
  disableAllMethods(Event, ['find']);

  Event.on('dataSourceAttached', (obj) => {
    Event.find = function(filter, accessToken, cb) {
      getEvents(function(err, response, body) {
        if (err) {
          cb(null, { error: err });
        }
        if (response && response.statusCode === 200) {
          cb(null, JSON.parse(body));
        }
      });
    };
  });

  Event.findByNameAndId = function(urlName, eventId, cb) {
    getEventByNameAndId(urlName, eventId, function(err, response, body) {
      if (err) {
        cb(null, { error: err });
      }
      if (response && response.statusCode === 200) {
        cb(null, JSON.parse(body));
      }
    });
  };

  Event.remoteMethod('findByNameAndId', {
    description: 'find event by urlName and id',
    http: { path: '/:urlName/:eventId', verb: 'get', status: 200 },
    accepts: [
      { arg: 'urlName', type: 'string', required: true },
      { arg: 'eventId', type: 'number', required: true }
    ],
    returns: { root: true }
  });

  Event.findByNameAndIdRSVPs = function(urlName, eventId, cb) {
    getEventRSVPs(urlName, eventId, function(err, response, body) {
      if (err) {
        cb(null, { error: err });
      }
      if (response && response.statusCode === 200) {
        cb(null, JSON.parse(body));
      }
    });
  };

  Event.remoteMethod('findByNameAndIdRSVPs', {
    description: 'find event by urlName and id and get the rsvps',
    http: { path: '/:urlName/:eventId/rsvps', verb: 'get', status: 200 },
    accepts: [
      { arg: 'urlName', type: 'string', required: true },
      { arg: 'eventId', type: 'number', required: true }
    ],
    returns: { root: true }
  });
};
