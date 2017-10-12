'use strict';

require('should');
const request = require('supertest');

const lib = require('../lib');
const app = lib.app;

describe('The loggers', () => {
  let logger;

  before((done) => {
    app.boot(done);
  });

  it('should be there', () => {
    lib.should.have.property('logger').which.is.Function();
    lib.should.have.property('loggers').which.is.Object();
  });

  describe('The debug', () => {
    it('should be there', () => {
      lib.loggers.should.have.property('debug').which.is.Function();
    });

    it('can build a logger', () => {
      logger = lib.logger('debug');
      logger.should.be.Object();
      logger.should.have.property('debug').which.is.Function();
    });

    it('can output', () => {
      logger.debug(new Error('lorem'));
    });

    it('can output', () => {
      logger.debug('lorem');
    });

    it('can output', () => {
      logger.debug({});
    });

    it('can output', () => {
      logger.debug('lorem', {});
    });
  });

  describe('The syslog', () => {
    it('should be there', () => {
      lib.loggers.should.have.property('syslog').which.is.Function();
    });

    it('can build a logger', () => {
      logger = lib.logger('syslog');
      logger.should.be.Object();
      logger.should.have.property('debug').which.is.Function();
    });

    it('can output', () => {
      logger.debug(new Error('lorem'));
    });

    it('can output', () => {
      logger.debug('lorem');
    });

    it('can output', () => {
      logger.debug({});
    });

    it('can output', () => {
      logger.debug('lorem', {});
    });
  });

  describe('The global logger', () => {
    it('should be there', () => {
      app.should.have.property('logger').which.is.Object();
      app.logger.should.have.property('debug').which.is.Function();
    });

    it('can output', () => {
      app.logger.debug(new Error('lorem'));
    });

    it('can output', () => {
      app.logger.debug('lorem');
    });

    it('can output', () => {
      app.logger.debug({});
    });

    it('can output', () => {
      app.logger.debug('lorem', {});
    });
  });

  describe('The middleware', () => {
    it('can output', () => {
      return request(app)
        .get('/api/test')
        .set('Accept', 'application/json')
        .expect(204);
    });

    it('can output', () => {
      return request(app)
        .get('/api/test/404')
        .set('Accept', 'application/json')
        .expect(404);
    });
  });
});
