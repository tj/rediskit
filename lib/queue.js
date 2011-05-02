
/*!
 * redisoo - Queue
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis');

/**
 * Expose `Queue`.
 */

module.exports = Queue;

/**
 * Initialize a `Queue` with the given `key` and optional redis `client`.
 *
 * @param {String} key
 * @param {Object} client
 * @api private
 */

function Queue(key, client) {
  this.key = key;
  this.client = client || redis.createClient();
}

/**
 * Push the given `obj` and callback `fn(err)`.
 *
 * @param {String|Object} obj
 * @param {Function} fn
 * @return {Queue} for chaining
 * @api public
 */

Queue.prototype.push = function(obj, fn){
  try { obj = JSON.stringify(obj); }
  catch (err) { return fn(err); }
  this.client.lpush(this.key, obj, fn || function(){});
  return this;
};

/**
 * Pop and callback `fn(err, obj)`.
 *
 * @param {Function} fn
 * @return {Queue} for chaining
 * @api public
 */

Queue.prototype.pop = function(fn){
  fn = fn || function(){};
  this.client.rpop(this.key, function(err, obj){
    if (err) return fn(err);
    try {
      fn(null, JSON.parse(obj));
    } catch (err) {
      fn(err);
    }
  });
  return this;
};

/**
 * Get the length of the queue and callback `fn(err, len)`.
 *
 * @param {Function} fn
 * @return {Queue} for chaining
 * @api public
 */

Queue.prototype.length = function(fn){
  this.client.llen(this.key, fn);
  return this;
};

/**
 * Destroy the queue and invoke `fn(err)`.
 *
 * @param {Function} fn
 * @api public
 */

Queue.prototype.destroy = function(fn){
  this.client.del(this.key, fn || function(){});
  return this;
};



