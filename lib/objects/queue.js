
/*!
 * rediskit - Queue
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis')
  , List = require('./list');

/**
 * Expose `Queue`.
 */

module.exports = Queue;

/**
 * Initialize a `Queue` with the given `key` and optional redis `client`.
 *
 * Examples:
 *
 *    var jobs = new Queue('jobs');
 *
 *    jobs.push('do stuff');
 *    jobs.push('do more stuff');
 *
 *    jobs.pop(function(err, job){
 *      console.log(job);
 *      // => "do stuff"
 *    });
 *
 * @param {String} key
 * @param {Object} client
 * @api private
 */

function Queue(key, client) {
  List.call(this, key, client);
}

/**
 * Inherit from `Base.prototype`.
 */

Queue.prototype.__proto__ = List.prototype;

/**
 * Push the given `str` and callback `fn(err)`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {Queue} for chaining
 * @api public
 */

Queue.prototype.push = function(str, fn){
  return this.lpush(str, fn);
};

/**
 * Pop and callback `fn(err, str)`.
 *
 * @param {Function} fn
 * @return {Queue} for chaining
 * @api public
 */

Queue.prototype.pop = function(fn){
  return this.rpop(fn);
};

/**
 * Checks if the queue is empty and returns a boolean
 *
 * @param {Function} fn
 * @return {Bool}
 * @api public
 */
Queue.prototype.isEmpty = function(fn) {
	this.length(function(err, len) {
		if (err) return fn(err);
		else return len==0?fn(null,true):fn(null,false);
	});
}

/**
 * Peeks at the next object to be popped off the queue
 *
 * @param {Function} fn
 * @return {null} 
 * @api public
 */
Queue.prototype.peek = function(fn) {
	this.range(-1, -1, function(err, last) {
		if (err) return fn(err);
		else return fn(null, last);
	});
}
