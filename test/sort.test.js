
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
  },
  
  '.sort by': function(done){
    var list = new List('pets')
      , client = list.client;
    list.destroy();
    list.rpush('tobi');
    list.rpush('jane');
    list.rpush('loki');
    list.rpush('bandit');
    list.rpush('ewald');
    client.set('tobi:age', 1);
    client.set('loki:age', .5);
    client.set('jane:age', 3);
    client.set('ewald:age', 4);
    client.set('bandit:age', 6);
    list.sort.by('*:age').end(function(err, res){
      res.should.eql(['loki', 'tobi', 'jane', 'ewald', 'bandit']);
      client.end();
      done();
    });
  }
};