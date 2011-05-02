
/**
 * Module dependencies.
 */

var oo = require('redisoo')
  , should = require('should');

module.exports = {
  'test .version': function(){
    oo.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};