'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var assert = require('assert');
var Hash = require('../').Hash;

describe('Hash Test', function(){

  var tj = new Hash('users:tj');
  beforeEach(function(done) {
    tj.destroy(done);
  });

  it('set test', function(done) {
    tj.set('name', 'tj');
    tj.set('age', 23);
    should.equal(true, tj.getall == tj.all, 'getall() all() alias missing');
    tj.getall(function(err, obj){
      obj.should.eql({ name: 'tj', age: '23' });
      done();
    });
  });

  it('has test', function(done) {
    tj.has('name', function(err, res){
      res.should.equal(0);
      done();
    });
  });

  it('del test', function(done) {
    tj.set('name', 'tj');
    tj.set('age', 23);
    should.equal(true, tj.del == tj.delete, 'del() delete() alias missing');
    tj.del('age');
    tj.all(function(err, obj){
      obj.should.eql({ name: 'tj' });
      done();
    });
  });

  it('length test', function(done) {
    tj.set('first', 'tj');
    tj.set('last', 'holowaychuk');
    tj.length(function(err, len){
      len.should.equal(2);
      done();
    });
  });

  it('fields test', function(done) {
    tj.set('first', 'tj');
    tj.set('last', 'holowaychuk');
    should.equal(true, tj.fields == tj.keys, 'keys() fields() alias missing');
    tj.keys(function(err, fields){
      fields.should.eql(['first', 'last']);
      done();
    });
  });

  it('vals test', function(done) {
    tj.set('first', 'tj');
    tj.set('last', 'holowaychuk');
    should.equal(true, tj.values == tj.vals, 'vals() values() alias missing');
    tj.values(function(err, vals){
      vals.should.eql(['tj', 'holowaychuk']);
      done();
    });
  });
});