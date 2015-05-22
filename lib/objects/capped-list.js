'use strict';

/*!
 * rediskit - CappedList
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis')
  , List = require('./list');

/**
 * Expose `CappedList`.
 */

module.exports = CappedList;

/**
 * Initialize a `List` with the given `key` and optional `limit` / redis `client`.
 *
 * @param {String} key
 * @param {Number} limit
 * @param {Object} client
 * @api private
 */

function CappedList(key, limit, client) {
  List.call(this, key, client);
  this.setLimit(limit || 1000);
}

/**
 * Inherit from `List.prototype`.
 */

CappedList.prototype.__proto__ = List.prototype;

/**
 * Set the cap limit to `n`.
 *
 * @param {Number} n
 * @return {CappedList} for chaining
 * @api public
 */

CappedList.prototype.setLimit = function(n){
  this.limit = n - 1;
  return this;
};

/**
 * Push `str` to the head and optionally callback `fn(err)`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {CappedList} for chaining
 * @api public
 */

CappedList.prototype.lpush = function(str, fn){
  List.prototype.lpush.call(this, str, fn);
  this.client.ltrim(this.key, 0, this.limit);
  return this;
};

/**
 * Push `str` to the tail and optionally callback `fn(err)`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {CappedList} for chaining
 * @api public
 */

CappedList.prototype.rpush = function(str, fn){
  List.prototype.rpush.call(this, str, fn);
  this.client.ltrim(this.key, 0, this.limit);
  return this;
};

