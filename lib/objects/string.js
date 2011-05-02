
/*!
 * rediskit - String
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis')
  , Key = require('./key');

/**
 * Expose `Base`.
 */

module.exports = String;

/**
 * Initialize a `String` with the given `key` and optional redis `client`.
 *
 * @param {String} key
 * @param {Object} client
 * @api private
 */

function String(key, client) {
  if (!key) throw new Error('key required');
  this.key = key;
  this.client = client || redis.createClient();
}

/**
 * Inherit from `Key.prototype`.
 */

String.prototype.__proto__ = Key.prototype;

/**
 * Set this keys value to `val` and optionally callback `fn(err)`.
 *
 * @param {String} val
 * @param {Function} fn
 * @return {String} for chaining
 * @api public
 */

String.prototype.set = function(val, fn){
  this.client.set(this.key, val, fn || function(){});
  return this;
};

/**
 * Get this the value for this string and callback `fn(err, str)`.
 *
 * @param {Function} fn
 * @return {String} for chaining
 * @api public
 */

String.prototype.get = function(fn){
  this.client.get(this.key, fn);
  return this;
};

/**
 * Get the string length and invoke `fn(err, len)`.
 *
 * @param {Function} fn
 * @return {String} for chaining
 * @api public
 */

String.prototype.length = function(fn){
  this.client.strlen(this.key, fn);
  return this;
};

/**
 * Append `str` and optionally callback `fn(err, len)`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {String} for chaining
 * @api public
 */

String.prototype.append = function(str, fn){
  this.client.append(this.key, str, fn || function(){});
  return this;
};

/**
 * Get range from `start` to `end` inclusive and callback `fn(err, str)`.
 *
 * @param {Number} start
 * @param {Number} end
 * @param {Function} fn
 * @return {String} for chaining
 * @api public
 */

String.prototype.range = 
String.prototype.slice = function(start, end, fn){
  this.client.getrange(this.key, start, end, fn);
  return this;
};

/**
 * Get the first `n` chars.
 *
 * @param {Number} n
 * @param {Function} fn
 * @return {String} for chaining
 * @api public
 */

String.prototype.first = function(n, fn){
  return this.range(0, --n, fn);
};

/**
 * Get the last `n` chars.
 *
 * @param {Number} n
 * @param {Function} fn
 * @return {String} for chaining
 * @api public
 */

String.prototype.last = function(n, fn){
  return this.range(-n, -1, fn);
};

