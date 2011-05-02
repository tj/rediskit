
/**
 * Module dependencies.
 */

var kit = require('../')
  , redis = require('redis')
  , client = redis.createClient();

function User(name) {
  this.name = name;
}

User.find = function(ids, fn){
  var pending = ids.length
    , users = [];
  ids.forEach(function(id){
    client.get('user:' + id + ':name', function(err, name){
      var user = new User(name);
      user.id = id;
      users.push(user);
      --pending || fn(null, users);
    });
  });
};

User.prototype.follow = function(user, fn){
  fn = fn || function(){};
  client.sadd('user:' + this.id + ':follows', user.id);
  client.sadd('user:' + user.id + ':followers', this.id, fn);
};

User.prototype.followers = function(fn){
  client.smembers('user:' + this.id + ':followers', function(err, ids){
    if (err) return fn(err);
    User.find(ids, fn);
  });
};

User.prototype.follows = function(fn){
  client.smembers('user:' + this.id + ':follows', function(err, ids){
    if (err) return fn(err);
    User.find(ids, fn);
  });
};

User.prototype.friends = function(fn){
  client.sinter(
      'user:' + this.id + ':followers'
    , 'user:' + this.id + ':follows'
    , function(err, ids){
      if (err) return fn(err);
      User.find(ids, fn);
    });
};

User.prototype.save = function(fn){
  var self = this;
  fn = fn || function(){};
  client.incr('users', function(err, id){
    if (err) return fn(err);
    self.id = id;
    client.set('user:' + id + ':name', self.name);
    fn(null, id);
  });
};

var tobi = new User('tobi')
  , loki = new User('loki')
  , jane = new User('jane');

tobi.save();
loki.save();
jane.save(function(){
  tobi.follow(loki);
  loki.follow(tobi);
  loki.follow(jane);
  jane.follow(tobi);

  tobi.followers(function(err, users){
    console.log();
    console.log('  tobi has %d followers: ', users.length);
    display(users);
  });

  tobi.follows(function(err, users){
    console.log();
    console.log('  tobi is following %d users: ', users.length);
    display(users);
  });
  
  tobi.friends(function(err, users){
    console.log();
    console.log('  tobi has %d friend:', users.length);
    display(users);
    console.log();
    client.end();
  });
});

function display(users) {
  users.forEach(function(user){
    console.log('    - %s', user.name);
  });
}