
/*!
 * rediskit - Set
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis')
  , Key = require('./key');

/**
 * Expose `Set`.
 */

module.exports = Set;

/**
 * Initialize a `Set` with the given `key` and optional redis `client`.
 *
 * @param {String} key
 * @param {Object} client
 * @api private
 */

function Set(key, client) {
  Key.call(this, key, client);
}

/**
 * Inherit from `Key.prototype`.
 */

Set.prototype.__proto__ = Key.prototype;

/**
 * Add `str` to the set and optionally callback `fn(err)`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.add = function(str, fn){
  this.client.sadd(this.key, str, fn || function(){});
  return this;
};

/**
 * Remove and return a random element from this set and 
 * optionally callback `fn(err, str)`.
 *
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.pop = function(fn){
  this.client.spop(this.key, fn || function(){});
  return this;
};

/**
 * Return a random element from this set and callback `fn(err, str)`.
 *
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.random = function(fn){
  this.client.srandmember(this.key, fn);
  return this;
};

/**
 * Check if `str` is a member and callback `fn(err, status)`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.ismember =
Set.prototype.has = function(str, fn){
  this.client.sismember(this.key, str, fn);
  return this;
};

/**
 * Get the members in this set and callback`fn(err, members)`.
 *
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.members =
Set.prototype.all = function(fn){
  this.client.smembers(this.key, fn);
  return this;
};

/**
 * Remove `str` from the set optionally callback `fn(err, status)`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.rem =
Set.prototype.remove = function(str, fn){
  this.client.srem(this.key, str, fn || function(){});
  return this;
};

/**
 * Get the cardinality (number of elements) in the set
 * and callback `fn(err, card)`.
 *
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.card = 
Set.prototype.length = function(fn){
  this.client.scard(this.key, fn);
  return this;
};

/**
 * Get the union of this set and `set` and callback `fn(err, members)`.
 *
 * @param {String} set
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.union = function(set, fn){
  this.client.sunion(this.key, set.key || set, fn);
  return this;
};

/**
 * Get a diff of this set and `set` and callback `fn(err, members)`.
 *
 * @param {String} set
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.diff = function(set, fn){
  this.client.sdiff(this.key, set.key || set, fn);
  return this;
};

/**
 * Get an intersection of this set and `set` and callback `fn(err, members)`.
 *
 * @param {String} set
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.inter =
Set.prototype.intersect = function(set, fn){
  this.client.sinter(this.key, set.key || set, fn);
  return this;
};

