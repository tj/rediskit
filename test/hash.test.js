
/**
 * Module dependencies.
 */

var Hash = require('rediskit').Hash
  , should = require('should')
  , redis = require('redis');

var tj = new Hash('users:tj');

module.exports = {
  setup: function(fn){
    tj.destroy(fn);
  },

  '.set(key, val)': function(done){
    tj.set('name', 'tj');
    tj.set('age', 23);
    should.equal(true, tj.getall == tj.all, 'getall() all() alias missing');
    tj.getall(function(err, obj){
      obj.should.eql({ name: 'tj', age: '23' });
      done();
    });
  },

  after: function(){
    tj.client.end();
  }
};