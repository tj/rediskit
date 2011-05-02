
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
  }
};