'use strict';

require('should');

const lib = require('../lib');
const app = lib.app;

describe('The debug', () => {
  let debug;

  before((done) => {
    app.boot(done);
  });

  it('should be there', () => {
    lib.should.have.property('debug').which.is.Function();
  });

  describe('An instance with no options', () => {
    it('can build a debug function', () => {
      debug = lib.debug();
      debug.should.be.Function();
    });

    it('can output', () => {
      debug(new Error('lorem'));
    });

    it('can output', () => {
      debug('lorem');
    });

    it('can output', () => {
      debug({});
    });

    it('can output', () => {
      debug('lorem', {});
    });
  });

  describe('An instance with a namespace', () => {
    it('can build a debug function', () => {
      debug = lib.debug('namespace');
      debug.should.be.Function();
    });

    it('can output', () => {
      debug(new Error('lorem'));
    });

    it('can output', () => {
      debug('lorem');
    });

    it('can output', () => {
      debug({});
    });

    it('can output', () => {
      debug('lorem', {});
    });
  });

  describe('An instance with debug', () => {
    it('can build a debug function', () => {
      debug = lib.debug({ output: 'debug' });
      debug.should.be.Function();
    });

    it('can output', () => {
      debug(new Error('lorem'));
    });

    it('can output', () => {
      debug('lorem');
    });

    it('can output', () => {
      debug({});
    });

    it('can output', () => {
      debug('lorem', {});
    });
  });

  describe('An instance with a namespace and debug', () => {
    it('can build a debug function', () => {
      debug = lib.debug({ namespace: 'namespace', output: 'debug' });
      debug.should.be.Function();
    });

    it('can output', () => {
      debug(new Error('lorem'));
    });

    it('can output', () => {
      debug('lorem');
    });

    it('can output', () => {
      debug({});
    });

    it('can output', () => {
      debug('lorem', {});
    });
  });
});
