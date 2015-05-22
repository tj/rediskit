'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var assert = require('assert');
var String = require('../').String;

describe('String Test', function(){

  var str = new String('str');
  beforeEach(function(done) {
    str.destroy(done);
  });

  it('length() test', function(done) {
    str.set('tj');
    str.length(function(err, len){
      len.should.equal(2);
      done();
    });

  });

  it('append(str) test', function(done) {
    str.set('tj');
    str.append(' holowaychuk');
    str.get(function(err, val){
      val.should.equal('tj holowaychuk');
      done();
    });

  });

  it('range(start, end) test', function(done) {
    str.set('tj holowaychuk');
    should.equal(true, str.slice == str.range, 'range() missing slice() alias');
    str.range(0, -5, function(err, str){
      str.should.equal('tj holoway');
      done();
    });

  });

  it('first(n) test', function(done) {
    str.set('tj holowaychuk');
    str.first(2, function(err, str){
      str.should.equal('tj');
      done();
    });

  });

  it('last(n) test', function(done) {
    str.set('tj holowaychuk');
    str.last(2, function(err, str){
      str.should.equal('uk');
      done();
    });

  });

  it('incr() test', function(done) {
    str.set('10');
    str.incr();
    str.incr();
    str.incr();
    str.get(function(err, val){
      val.should.equal('13');
      done();
    });

  });

  it('incrby() test', function(done) {
    str.set('10');
    str.incrby(3);
    str.get(function(err, val){
      val.should.equal('13');
      done();
    });

  });

  it('decr() test', function(done) {
    str.set('10');
    str.decr();
    str.decr();
    str.decr();
    str.get(function(err, val){
      val.should.equal('7');
      done();
    });

  });

  it('decrby() test', function(done) {
    str.set('10');
    str.decrby(3);
    str.get(function(err, val){
      val.should.equal('7');
      done();
    });

  });
});