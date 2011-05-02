
/**
 * Module dependencies.
 */

var String = require('rediskit').String
  , should = require('should')
  , redis = require('redis');

var str = new String('str');

module.exports = {
  str: function(fn){
    str.destroy(fn);
  },

  '.length()': function(done){
    str.set('tj');
    str.length(function(err, len){
      len.should.equal(2);
      done();
    });
  },
  
  '.append(str)': function(done){
    str.set('tj');
    str.append(' holowaychuk');
    str.get(function(err, val){
      val.should.equal('tj holowaychuk');
      done();
    });
  },
  
  'range(start, end)': function(done){
    str.set('tj holowaychuk');
    should.equal(true, str.slice == str.range, 'range() missing slice() alias');
    str.range(0, -5, function(err, str){
      str.should.equal('tj holoway');
      done();
    });
  },
  
  'first(n)': function(done){
    str.set('tj holowaychuk');
    str.first(2, function(err, str){
      str.should.equal('tj');
      done();
    });
  },
  
  'last(n)': function(done){
    str.set('tj holowaychuk');
    str.last(2, function(err, str){
      str.should.equal('uk');
      done();
    });
  },
  
  'incr()': function(done){
    str.set('10');
    str.incr();
    str.incr();
    str.incr();
    str.get(function(err, val){
      val.should.equal('13');
      done();
    });
  },
  
  'incrby()': function(done){
    str.set('10');
    str.incrby(3);
    str.get(function(err, val){
      val.should.equal('13');
      done();
    });
  },
  
  'decr()': function(done){
    str.set('10');
    str.decr();
    str.decr();
    str.decr();
    str.get(function(err, val){
      val.should.equal('7');
      done();
    });
  },
  
  'decrby()': function(done){
    str.set('10');
    str.decrby(3);
    str.get(function(err, val){
      val.should.equal('7');
      done();
    });
  },
  
  after: function(){
    str.client.end();
  }
};