
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
 * Set `field` to `val` and optionally callback `fn(err)`.
 *
 * @param {String} field
 * @param {String} val
 * @param {Function} fn
 * @return {Hash} for chaining
 * @api public
 */

Hash.prototype.set = function(field, val, fn){
  this.client.hset(this.key, field, val, fn || function(){});
  return this;
};

/**
 * Get `field` and callback `fn(err, val)`.
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

Hash.prototype.get = function(field, fn){
  this.client.hget(this.key, field, fn);
  return this;
};

/**
 * Get number of fields and callback `fn(err, len)`.
 *
 * @param {Function} fn
 * @return {Hash} for chaining
 * @api public
 */

Hash.prototype.length = function(fn){
  this.client.hlen(this.key, fn);
  return this;
};

/**
 * Get field names and callback `fn(err, fields)`.
 *
 * @param {Function} fn
 * @return {Hash} for chaining
 * @api public
 */

Hash.prototype.fields =
Hash.prototype.keys = function(fn){
  this.client.hkeys(this.key, fn);
  return this;
};

/**
 * Get values and callback `fn(err, values)`.
 *
 * @param {Function} fn
 * @return {Hash} for chaining
 * @api public
 */

Hash.prototype.values =
Hash.prototype.vals = function(fn){
  this.client.hvals(this.key, fn);
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

/**
 * Delete `field` and optionally callback `fn(err)`.
 *
 * @param {String} field
 * @param {Function} fn
 * @return {Hash} for chaining
 * @api public
 */

Hash.prototype.del = 
Hash.prototype.delete = function(field, fn){
  this.client.hdel(this.key, field, fn || function(){});
  return this;
};

