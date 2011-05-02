
/*!
 * rediskit - Base
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis');

/**
 * Expose `Base`.
 */

module.exports = Key;

/**
 * Initialize a `Key` with the given `key` and optional redis `client`.
 *
 * @param {String} key
 * @param {Object} client
 * @api private
 */

function Key(key, client) {
  if (!key) throw new Error('key required');
  this.key = key;
  this.client = client || redis.createClient();
}

/**
 * Get TTL on this key and callback `fn(err, seconds)`.
 *
 * @param {Function} fn
 * @return {Key} for chaining
 * @api public
 */

Key.prototype.ttl = function(fn){
  this.client.ttl(this.key, fn);
  return this;
};

/**
 * Set this keys value to `val` and optionally callback `fn(err)`.
 *
 * @param {String} val
 * @param {Function} fn
 * @return {Key} for chaining
 * @api public
 */

Key.prototype.set = function(val, fn){
  this.client.set(this.key, val, fn || function(){});
  return this;
};

/**
 * Get TTL on this key and callback `fn(err, seconds)`.
 *
 * @param {Function} fn
 * @return {Key} for chaining
 * @api public
 */

Key.prototype.rename = function(name, fn){
  var self = this;
  this.client.rename(this.key, name, function(err){
    if (err) return fn(err);
    self.key = name;
    fn();
  });
  return this;
};

/**
 * Set expire in `seconds` and optionally callback `fn(err)`.
 *
 * @param {Number} seconds
 * @param {Function} fn
 * @return {Key} for chaining
 * @api public
 */

Key.prototype.expire = function(seconds, fn){
  this.client.expire(this.key, seconds, fn || function(){});
  return this;
};

/**
 * Delete the structure and invoke `fn(err)`.
 *
 * @param {Function} fn
 * @return {Key} for chaining
 * @api public
 */

Key.prototype.destroy = function(fn){
  this.client.del(this.key, fn || function(){});
  return this;
};