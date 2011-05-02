
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
 * Delete the structure and invoke `fn(err)`.
 *
 * @param {Function} fn
 * @api public
 */

Key.prototype.destroy = function(fn){
  this.client.del(this.key, fn || function(){});
  return this;
};