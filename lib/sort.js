'use strict';

/*!
 * rediskit - Sort
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Expose `Sort`.
 */

module.exports = Sort;

/**
 * Initialize a `Sort` builder with the given `key`.
 *
 * @param {Key} key
 * @api private
 */

function Sort(key) {
  this.key = key;
}

/**
 * End the sort.
 *
 * Examples:
 *
 *     list.sort.alpha.desc.limit(1, 3).end(function(err, res){
 *       done();
 *     });
 *
 * @param {Function} fn
 * @return {Sort} for chaining
 * @api public
 */

Sort.prototype.end = function(fn){
  this.key.client.sort(this.command, fn);
  return this;
};

/**
 * Limit the results from `start` with the given `count`.
 *
 *     list.sort.limit(1, 3).end(function(err, res){
 *       done();
 *     });
 *
 *     list.sort.desc.limit(3).end(...);
 *
 * @param {Number} start or count
 * @param {Number} count
 * @return {Sort} for chaining
 * @api public
 */

Sort.prototype.limit = function(start, count){
  this._limit = 1 == arguments.length
    ? { start: 0, count: start }
    : { start: start, count: count };
  return this;
};

/**
 * Sort by `pattern`.
 *
 *     list.sort.by('weight:*').end(function(err, res){
 *       done();
 *     });
 *
 * @param {String} pattern
 * @return {Sort} for chaining
 * @api public
 */

Sort.prototype.by = function(pattern){
  this._by = pattern;
  return this;
};

/**
 * Get `pattern`.
 *
 *     list.sort.by('user:*->age').get('user:*->name').end(function(err, res){
 *       done();
 *     });
 *
 * @param {String} pattern
 * @return {Sort} for chaining
 * @api public
 */

Sort.prototype.get = function(pattern){
  this._get = this._get || []; 
  this._get.push('GET');
  this._get.push(pattern);
  return this;
};

/**
 * Return the generated command as an array.
 *
 * @return {Array}
 * @api private
 */

Sort.prototype.__defineGetter__('command', function(){
  var buf = [];
  buf.push(this.key.key);
  if (this._by) buf.push('BY', this._by);
  if (this._get) buf = buf.concat(this._get);
  if (this._limit) buf.push('LIMIT', this._limit.start, this._limit.count);
  if (this._type) buf.push(this._type);
  if (this._direction) buf.push(this._direction);
  return buf;
});

/**
 * Sort ALPHA.
 *
 * @return {Sort} for chaining
 * @api public
 */

Sort.prototype.__defineGetter__('alpha', function(){
  this._type = 'ALPHA';
  return this;
});

/**
 * Sort ascending.
 *
 * @return {Sort} for chaining
 * @api public
 */

Sort.prototype.__defineGetter__('asc', function(){
  this._direction = 'ASC';
  return this;  
});

/**
 * Sort descending.
 *
 * @return {Sort} for chaining
 * @api public
 */

Sort.prototype.__defineGetter__('desc', function(){
  this._direction = 'DESC';
  return this;
});
