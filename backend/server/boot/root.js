'use strict';

const path = require('path');

module.exports = function(server) {
  const meetupApiToken = server.get('meetupCom').apiToken;
  if (!meetupApiToken) {
    console.log('MISSING MEETUP.COM API TOKEN');
    console.log('SET THE TOKEN WITH THE ENVIRONMENT VARIABLE "MEETUP_API_TOKEN"');
    console.log('$ export MEETUP_API_TOKEN=yourtokenhere');
    // process.exit(1);
  }

  let router = server.loopback.Router();

  router.get('/app/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
  });

  // Install a GET `/` route that returns server status
  router.get('/api', server.loopback.status());

  server.use(router);
};
