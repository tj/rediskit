'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var assert = require('assert');
var Queue = require('../').Queue;

describe('String Test', function(){

  var queue = new Queue('todos');
  beforeEach(function(done) {
    queue.destroy(done);
  });

  it('push test', function(done) {
    queue.push('one');
    queue.push('two');
    queue.push('three', function(err){
      should.equal(null, err);
      queue.length(function(err, len){
        should.equal(null, err);
        len.should.equal(3);
        done();
      });
    });
  });

  it('pop test', function(done) {
    queue.push('one');
    queue.push('two');
    queue.push('three');
    queue.pop(function(err, val){
      should.equal(null, err);
      val.should.equal('one');
      queue.pop(function(err, val){
        should.equal(null, err);
        val.should.equal('two');
        queue.length(function(err, len){
          len.should.equal(1);
          done();
        });
      })
    });
  });

});