
/**
 * Module dependencies.
 */

var kit = require('rediskit')
  , should = require('should');

module.exports = {
  'test .version': function(){
    kit.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};