
/*!
 * redisoo - List
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis');

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
  if (!key) throw new Error('key required');
  this.key = key;
  this.client = client || redis.createClient();
}

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


/**
 * Destroy the list and invoke `fn(err)`.
 *
 * @param {Function} fn
 * @api public
 */

List.prototype.destroy = function(fn){
  this.client.del(this.key, fn || function(){});
  return this;
};