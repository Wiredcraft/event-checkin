'use strict';

module.exports = {
  eventcheckin: {
    name: 'eventcheckin',
    host: process.env.MYSQL_IP || '127.0.0.1',
    port: process.env.MYSQL_PORT || '5000',
    database: process.env.MYSQL_DB || 'eventcheckin',
    user: process.env.MYSQL_USER || 'admin',
    password: process.env.MYSQL_PASSWORD || 'secret',
    multipleStatements: true,
    debug: process.env.MYSQL_DEBUG || false,
    connector: 'mysql'
  }
};
