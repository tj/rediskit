
/**
 * Module dependencies.
 */

var Queue = require('redisoo').Queue
  , should = require('should')
  , redis = require('redis');

var queue = new Queue('todos');

module.exports = {
  setup: function(fn){
    queue.destroy(fn);
  },

  '.push(str)': function(done){
    queue.push('one');
    queue.push('two');
    queue.push('three', function(err){
      should.equal(null, err);
      queue.length(function(err, len){
        should.equal(null, err);
        len.should.equal(3);
        done();
      });
    });
  },
  
  '.pop()': function(done){
    queue.push('one');
    queue.push('two');
    queue.push('three');
    queue.pop(function(err, val){
      should.equal(null, err);
      val.should.equal('one');
      queue.pop(function(err, val){
        should.equal(null, err);
        val.should.equal('two');
        queue.length(function(err, len){
          len.should.equal(1);
          done();
        });
      })
    });
  },
  
  '.push(obj)': function(done){
    queue.push({ some: 'stuff' });
    queue.pop(function(err, obj){
      obj.should.eql({ some: 'stuff' });
      done();
    });
  },
  
  after: function(){
    queue.client.end();
  }
};