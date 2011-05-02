
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
    names.members(function(err, names){
      names.should.eql(['guillermo', 'aaron']);
      names.client.end();
      done();
    });
  }
};