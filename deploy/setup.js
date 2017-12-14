'use strict';

const server = require('../backend/server/server')
const mysql = server.dataSources.eventcheckin

let excludedModels = []
const tables = Object.keys(server.models).filter(key => excludedModels.indexOf(key) === -1)
mysql.automigrate(tables, function(err) {
  if (err) {
    console.log('ERROR', err);
    throw err;
  }
  console.log('Loopback tables [' - tables - '] created in ', mysql.adapter.name);
  mysql.disconnect();
});
