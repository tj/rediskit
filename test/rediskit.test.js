'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var assert = require('assert');
var kit = require('../');

describe('Rediskit Test', function(){

  it('version test', function(done) {
    kit.version.should.match(/^\d+\.\d+\.\d+$/);
    done();
  });

});
