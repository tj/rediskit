
/*!
 * rediskit - List
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis')
  , Base = require('./base');

/**
 * Expose `List`.
 */

module.exports = List;

/**
 * Initialize a `List` with the given `key` and optional redis `client`.
 *
 * @param {String} key
 * @param {Object} client
 * @api private
 */

function List(key, client) {
  Base.call(this, key, client);
}

/**
 * Inherit from `Base.prototype`.
 */

List.prototype.__proto__ = Base.prototype;

/**
 * Push `str` to the head and optionally callback `fn(err)`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.lpush = function(str, fn){
  this.client.lpush(this.key, str, fn || function(){});
  return this;
};

/**
 * Push `str` to the tail and optionally callback `fn(err)`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.rpush = function(str, fn){
  this.client.rpush(this.key, str, fn || function(){});
  return this;
};

/**
 * Pop off head and callback `fn(err, str)`.
 *
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.lpop = function(fn){
  this.client.lpop(this.key, fn);
  return this;
};

/**
 * Pop off the tail and callback `fn(err, str)`.
 *
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.rpop = function(fn){
  this.client.rpop(this.key, fn);
  return this;
};

/**
 * Blocking pop off the tail and callback `fn(err, arr)`.
 *
 * @param {Number|Function} timeout
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.brpop = function(timeout, fn){
  if ('function' == typeof timeout) fn = timeout, timeout = 0;
  this.client.brpop(this.key, timeout, fn);
  return this;
};

/**
 * Blocking pop off head and callback `fn(err, arr)`.
 *
 * @param {Number|Function} timeout or fn
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.blpop = function(timeout, fn){
  if ('function' == typeof timeout) fn = timeout, timeout = 0;
  this.client.blpop(this.key, timeout, fn);
  return this;
};

/**
 * Get a range of values and callback `fn(err, arr)`.
 *
 * @param {Number} start
 * @param {Number} stop
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.range = function(start, stop, fn){
  this.client.lrange(this.key, start, stop, fn);
  return this;
};

/**
 * Trim the list to the range specified and callback `fn(err)`.
 *
 * @param {Number} start
 * @param {Number} stop
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.trim = function(start, stop, fn){
  this.client.ltrim(this.key, start, stop, fn);
  return this;
};

/**
 * Get value at the given `index` and callback `fn(err, str)`.
 *
 * @param {Number} i
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.index =
List.prototype.at = function(index, fn){
  this.client.lindex(this.key, index, fn);
  return this;
};

/**
 * Get all the values and callback `fn(err, arr)`.
 *
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.all = function(fn){
  return this.range(0, -1, fn);
};

/**
 * Fetch list length and callback `fn(err, len)`.
 *
 * @param {Function} fn
 * @return {List} for chaining
 * @api public
 */

List.prototype.length = function(fn){
  this.client.llen(this.key, fn);
  return this;
};
