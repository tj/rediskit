
/**
 * Module dependencies.
 */

var kit = require('../')
  , Set = kit.Set
  , redis = require('redis')
  , ids = new kit.String('users');


function User(name) {
  this.name = name;
}

User.find = function(ids, fn){
  var pending = ids.length
    , users = [];
  ids.forEach(function(id){
    new kit.String('user:' + id + ':name').get(function(err, name){
      var user = new User(name);
      user.id = id;
      users.push(user);
      --pending || fn(null, users);
    });
  });
};

User.prototype.follow = function(user, fn){
  fn = fn || function(){};
  this._following.add(user.id);
  user._followers.add(this.id, fn);
};

User.prototype.followers = function(fn){
  this._followers.all(function(err, ids){
    User.find(ids, fn);
  });
};

User.prototype.follows = function(fn){
  this._following.all(function(err, ids){
    User.find(ids, fn);
  });
};

User.prototype.friends = function(fn){
  this._followers.intersect(this._following, function(err, ids){
    User.find(ids, fn);
  });
};

User.prototype.save = function(fn){
  var self = this;
  fn = fn || function(){};
  ids.incr(function(err, id){
    self.id = id;
    self._followers = new Set('user:' + id + ':followers');
    self._following = new Set('user:' + id + ':following');
    self._name = new kit.String('user:' + id + ':name');
    self._name.set(self.name);
    fn(null, id);
  });
};

var tobi = new User('tobi')
  , loki = new User('loki')
  , jane = new User('jane');

tobi.save();
loki.save();
jane.save(function(){
  var pending = 3;

  tobi.follow(loki);
  loki.follow(tobi);
  loki.follow(jane);
  jane.follow(tobi);

  tobi.followers(function(err, users){
    console.log('  tobi has %d followers: ', users.length);
    display(users);
    --pending || process.exit(0);
  });

  tobi.follows(function(err, users){
    console.log('  tobi is following %d users: ', users.length);
    display(users);
    --pending || process.exit(0);
  });
  
  tobi.friends(function(err, users){
    console.log('  tobi has %d friend(s):', users.length);
    display(users);
    --pending || process.exit(0);
  });
});

function display(users) {
  users.forEach(function(user){
    console.log('    - %s', user.name);
  });
}