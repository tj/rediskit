'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var assert = require('assert');
var CappedList = require('../').CappedList;

describe('CappedList Test', function(){

  var logs = new CappedList('logs', 5);
  beforeEach(function(done) {
    logs.destroy(done);
  });

  it('rpush test', function(done) {
    var n = 15;
    while (n--) logs.rpush(n);
    logs.length(function(err, len){
      should.equal(null, err);
      len.should.equal(5);
      logs.all(function(err, lines){
        lines.should.eql(['14', '13', '12', '11', '10']);
        done();
      });
    });
  });

  it('lpush test', function(done) {
    var n = 15;
    while (n--) logs.lpush(n);
    logs.length(function(err, len){
      should.equal(null, err);
      len.should.equal(5);
      logs.all(function(err, lines){
        lines.should.eql(['0', '1', '2', '3', '4']);
        done();
      });
    });
  });

});