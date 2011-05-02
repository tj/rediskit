
/**
 * Module dependencies.
 */

var Set = require('rediskit').Set
  , should = require('should')
  , redis = require('redis');

module.exports = {
  '.add(str)': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    should.equal(true, names.card == names.length, 'card() length() alias is missing');
    names.card(function(err, cardinality){
      cardinality.should.equal(3);
      names.client.end();
      done();
    });
  },
  
  '.rem(str)': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    names.rem('tj');
    should.equal(true, names.rem == names.remove, 'rem() remove() alias is missing');
    names.members(function(err, arr){
      arr.should.eql(['guillermo', 'aaron']);
      names.client.end();
      done();
    });
  },
  
  '.ismember(str)': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    should.equal(true, names.ismember == names.has, 'ismember() has() alias is missing');
    names.ismember('tj', function(err, yes){
      yes.should.equal(1);
      names.ismember('tobi', function(err, yes){
        yes.should.equal(0);
        names.client.end();
        done();
      });
    });
  },
  
  '.pop()': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    names.pop(function(err, name){
      name.should.be.a('string');
      names.card(function(err, cardinality){
        cardinality.should.equal(2);
        names.client.end();
        done();
      });
    });
  },
  
  '.random()': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    names.random(function(err, name){
      name.should.be.a('string');
      names.card(function(err, cardinality){
        cardinality.should.equal(3);
        names.client.end();
        done();
      });
    });
  }
};