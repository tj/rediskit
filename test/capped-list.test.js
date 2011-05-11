
/**
 * Module dependencies.
 */

var CappedList = require('rediskit').CappedList
  , should = require('should')
  , redis = require('redis');

var logs = new CappedList('logs', 5);

module.exports = {
  setup: function(fn){
    logs.destroy(fn);
  },

  '.rpush(str)': function(done){
    var n = 15;
    while (n--) logs.rpush(n);
    logs.length(function(err, len){
      should.equal(null, err);
      len.should.equal(5);
      logs.all(function(err, lines){
        lines.should.eql(['14', '13', '12', '11', '10']);
        done();
      });
    });
  },
  
  '.lpush(str)': function(done){
    var n = 15;
    while (n--) logs.lpush(n);
    logs.length(function(err, len){
      should.equal(null, err);
      len.should.equal(5);
      logs.all(function(err, lines){
        lines.should.eql(['0', '1', '2', '3', '4']);
        done();
      });
    });
  }
};