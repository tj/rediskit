'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var assert = require('assert');
var String = require('../').String;
var Key = require('../').Key

describe('Key Test', function(){

  var name = new String('name');
  beforeEach(function(done) {
    name.destroy(done);
  });

  it('type test', function(done) {
    name.set('wahoo');
    name.type(function(err, type){
      type.should.equal('string');
      done();
    });
  });

  it('ttl test', function(done) {
    name.ttl(function(err, seconds){
      seconds.should.equal(-2);
      done();
    });
  });

  it('rename test', function(done) {
    var name = new String('name');
    name.set('tj');
    name.rename('username', function(err){
      should.equal(null, err);
      name.key.should.equal('username');
      done();
    });
  });

});