
/**
 * Module dependencies.
 */

var Key = require('rediskit').Key
  , should = require('should')
  , redis = require('redis');

var name = new Key('name');

module.exports = {
  setup: function(fn){
    name.destroy(fn);
  },

  '.ttl()': function(done){
    name.ttl(function(err, seconds){
      seconds.should.equal(-1);
      done();
    });
  },

  after: function(){
    name.client.end();
  }
};