
/**
 * Module dependencies.
 */

var List = require('redisoo').List
  , should = require('should')
  , redis = require('redis');

var pets = new List('pets');

module.exports = {
  setup: function(fn){
    pets.destroy(fn);
  },

  '.rpush(str)': function(done){
    pets.rpush('tobi');
    pets.rpush('loki');
    pets.rpush('jane');
    pets.length(function(err, len){
      should.equal(null, err);
      len.should.equal(3);
      done();
    });
  },

  after: function(){
    pets.client.end();
  }
};