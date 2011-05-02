
/**
 * Module dependencies.
 */

var Hash = require('rediskit').Hash
  , should = require('should')
  , redis = require('redis');

var tj = new Hash('tj');

module.exports = {
  setup: function(fn){
    tj.destroy(fn);
  },

  after: function(){
    tj.client.end();
  }
};