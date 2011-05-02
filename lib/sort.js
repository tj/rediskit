
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

Sort.prototype.end = function(fn){
  var cmd = this.command;
  cmd.push(fn);
  this.key.client.sort.apply(this.key.client, cmd);
  return this;
};

Sort.prototype.limit = function(start, count){
  this._limit = { start: start, count: count };
  return this;
};

Sort.prototype.by = function(pattern){
  this._by = pattern;
  return this;
};

Sort.prototype.__defineGetter__('command', function(){
  var buf = [];
  buf.push(this.key.key);
  if (this._by) buf.push('BY', this._by);
  if (this._limit) buf.push('LIMIT', this._limit.start, this._limit.count);
  if (this._type) buf.push(this._type);
  if (this._direction) buf.push(this._direction);
  return buf;
});

Sort.prototype.__defineGetter__('alpha', function(){
  this._type = 'ALPHA';
  return this;
});

Sort.prototype.__defineGetter__('asc', function(){
  this._direction = 'ASC';
  return this;  
});

Sort.prototype.__defineGetter__('desc', function(){
  this._direction = 'DESC';
  return this;
});
