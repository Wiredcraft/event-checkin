'use strict';

require('should');
const path = require('path');
const lib = require('../lib');

describe('The lib', () => {
  it('should be there', () => {
    lib.should.be.Object();
    lib.should.have.property('app').which.is.Function();
  });

  it('can boot', (done) => {
    lib.app.should.have.property('boot').which.is.Function();
    lib.app.boot(done);
  });

  it('should have the configs now', () => {
    lib.app.should.have.property('get').which.is.Function();
    lib.app.get('host').should.equal('0.0.0.0');
  });

  it('should have a root directory', () => {
    lib.app.get('rootDir').should.equal(path.resolve(__dirname, '../'));
  });
});
