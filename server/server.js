const express = require('express');
const morgan = require('morgan');
const path = require('path');

const {getEvents, getRSVPs} = require('./meetup-api')

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../frontend', 'build')));

// routes
app.get('/api/events', function(req, res) {
  getEvents(function (err, response, body) {
    if (err) {
      res.json({error: err});
      return
    }
    if (response && response.statusCode === 200) {
      res.contentType("application/json");
      res.send(body)
    }
  })
});

app.get('/api/events/:urlname/:eventId', function(req, res) {
  console.log(req.params.urlname, req.params.eventId);
  getRSVPs(req.params.urlname, req.params.eventId, function (err, response, body) {
    if (err) {
      res.json({error: err});
      return
    }
    if (response && response.statusCode === 200) {
      res.contentType("application/json");
      res.send(body)
    }
  })
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

module.exports = app
