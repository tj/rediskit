
/*!
 * rediskit
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis');

/**
 * Library version.
 */

exports.version = '0.0.2';

/**
 * Expose constructors.
 */

exports.Key = require('./objects/key');
exports.String = require('./objects/string');
exports.List = require('./objects/list');
exports.Set = require('./objects/set');
exports.Hash = require('./objects/hash');
exports.Queue = require('./objects/queue');
exports.CappedList = require('./objects/capped-list');

/**
 * Shared client.
 */

exports.client = null;

/**
 * Create a redis client, used by objects that
 * are not explicitly given a client on initialization. 
 *
 * Override to customize.
 *
 * @return {Object}
 * @api public
 */

exports.getClient = function(){
  return exports.client || (exports.client = redis.createClient());
};