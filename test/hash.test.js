
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
  
  '.del(key)': function(done){
    tj.set('name', 'tj');
    tj.set('age', 23);
    should.equal(true, tj.del == tj.delete, 'del() delete() alias missing');
    tj.del('age');
    tj.all(function(err, obj){
      obj.should.eql({ name: 'tj' });
      done();
    });
  },
  
  '.length()': function(done){
    tj.set('first', 'tj');
    tj.set('last', 'holowaychuk');
    tj.length(function(err, len){
      len.should.equal(2);
      done();
    });
  },

  after: function(){
    tj.client.end();
  }
};