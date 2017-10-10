'use strict';

const lib = require('./lib');
const app = module.exports = lib.app;

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
app.boot(function(err) {
  if (err) {
    throw err;
  }

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
