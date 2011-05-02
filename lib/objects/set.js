
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
 * Get the members in this set and callback`fn(err, members)`.
 *
 * @param {Function} fn
 * @return {Set} for chaining
 * @api public
 */

Set.prototype.members = function(fn){
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
