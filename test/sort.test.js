
/**
 * Module dependencies.
 */

var List = require('rediskit').List
  , should = require('should')
  , redis = require('redis');

module.exports = {
  '.sort alpha desc': function(done){
    var list = new List('letters');
    list.destroy();
    list.rpush('a');
    list.rpush('c');
    list.rpush('d');
    list.rpush('b');
    list.sort.alpha.desc.limit(1, 3).end(function(err, res){
      res.should.eql(['c', 'b', 'a']);
      list.client.end();
      done();
    });
  }
};