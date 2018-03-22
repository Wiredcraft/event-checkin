'use strict';

const express = require('express');
const env = require('env-var');
const mockdata = require('./mockdata');
const app = express();
var router = express.Router();

const PORT = env('MOCKSERVER_PORT', 4000).asPositiveInt();

router.use((req, res, next) => {
  console.log(`${req.method}\t${req.originalUrl}`);
  next();
});

router.get('/self/events', (req, res) => {
  res.json([mockdata.eventData]);
});

router.get('/:groupName/events/:eventID', (req, res) => {
  console.log(req.params);
  res.json(mockdata.eventData);
});

router.get('/:groupName/events/:eventID/rsvps', (req, res) => {
  res.json([
    mockdata.rsvpData(),
    mockdata.rsvpData(),
    mockdata.rsvpData()
  ]);
});

app.use('/', router);

if (require.main === module) {
  app.listen(PORT, () => console.log(`Mockserver listening on port ${PORT}`));
} else {
  module.exports = app;
}
