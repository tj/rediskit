'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var assert = require('assert');
var Set = require('../').Set;

describe('Set Test', function(){

  it('add(str) test', function(done) {
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    should.equal(true, names.card == names.length, 'card() length() alias is missing');
    names.card(function(err, cardinality){
      cardinality.should.equal(3);
      done();
    });

  });

  it('rem(str) test', function(done) {
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    names.rem('tj');
    should.equal(true, names.rem == names.remove, 'rem() remove() alias is missing');
    names.members(function(err, arr){
      arr.should.eql(['guillermo', 'aaron']);
      done();
    });

  });

  it('ismember(str) test', function(done) {
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    should.equal(true, names.ismember == names.has, 'ismember() has() alias is missing');
    names.ismember('tj', function(err, yes){
      yes.should.equal(1);
      names.ismember('tobi', function(err, yes){
        yes.should.equal(0);
        done();
      });
    });

  });

  it('pop() test', function(done) {
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    names.pop(function(err, name){
      name.should.be.a.String;
      names.card(function(err, cardinality){
        cardinality.should.equal(2);
        done();
      });
    });

  });

  it('random() test', function(done) {
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    names.random(function(err, name){
      name.should.be.a.String;
      names.card(function(err, cardinality){
        cardinality.should.equal(3);
        done();
      });
    });

  });

  it('union(str) test', function(done) {
    var online = new Set('online')
      , offline = new Set('offline');

    online.add('tj');
    online.add('guillermo');
    offline.add('aaron');
    online.union('offline', function(err, res){
      res.should.eql(['guillermo', 'tj', 'aaron']);
      done();
    });

  });

  it('union(Set) test', function(done) {
    var online = new Set('online')
      , offline = new Set('offline');

    online.add('tj');
    online.add('guillermo');
    offline.add('aaron');
    online.union(offline, function(err, res){
      res.should.eql(['guillermo', 'tj', 'aaron']);
      done();
    });

  });

  it('diff(str) test', function(done) {
    var nums = new Set('nums')
      , other = new Set('other');

    nums.destroy();
    other.destroy();
    nums.add(1);
    nums.add(2);
    nums.add(3);
    other.add(2);
    other.add(3);
    nums.diff('other', function(err, res){
      should.equal(null, err);
      res.should.eql(['1']);
      done();
    });

  });

  it('diff(Set) test', function(done) {
    var nums = new Set('nums')
      , other = new Set('other');

    nums.destroy();
    other.destroy();
    nums.add(1);
    nums.add(2);
    nums.add(3);
    other.add(2);
    other.add(3);
    nums.diff(other, function(err, res){
      should.equal(null, err);
      res.should.eql(['1']);
      done();
    });

  });

  it('inter(str) test', function(done) {
    var nums = new Set('nums')
      , other = new Set('other');

    nums.destroy();
    other.destroy();
    nums.add(1);
    nums.add(2);
    nums.add(3);
    other.add(2);
    other.add(3);
    should.equal(true, nums.inter == nums.intersect, 'Set inter() alias intersect() missing');
    nums.inter('other', function(err, res){
      should.equal(null, err);
      res.should.eql(['2', '3']);
      done();
    });

  });

  it('inter(Set) test', function(done) {
    var nums = new Set('nums')
      , other = new Set('other');

    nums.destroy();
    other.destroy();
    nums.add(1);
    nums.add(2);
    nums.add(3);
    other.add(2);
    other.add(3);
    nums.inter(other, function(err, res){
      should.equal(null, err);
      res.should.eql(['2', '3']);
      done();
    });

  });

});