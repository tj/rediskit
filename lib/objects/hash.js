
/*!
 * rediskit - Hash
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis')
  , Base = require('./base');

/**
 * Expose `Hash`.
 */

module.exports = Hash;

/**
 * Initialize a `Hash` with the given `key` and optional redis `client`.
 *
 * @param {String} key
 * @param {Object} client
 * @api private
 */

function Hash(key, client) {
  Base.call(this, key, client);
}

/**
 * Inherit from `Base.prototype`.
 */

Hash.prototype.__proto__ = Base.prototype;

/**
 * Set `key` to `val` and optionally callback `fn(err)`.
 *
 * @param {String} key
 * @param {String} val
 * @param {Function} fn
 * @return {Hash} for chaining
 * @api public
 */

Hash.prototype.set = function(key, val, fn){
  this.client.hset(this.key, key, val, fn || function(){});
  return this;
};

/**
 * Get all fields and callback `fn(err, obj)`.
 *
 * @param {Function} fn
 * @return {Hash} for chaining
 * @api public
 */

Hash.prototype.getall = 
Hash.prototype.all = function(fn){
  this.client.hgetall(this.key, fn);
  return this;
};
