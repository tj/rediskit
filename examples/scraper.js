
/**
 * Module dependencies.
 */

var cluster = require('cluster')
  , lineup = require('../');

var queue = lineup.create();

(function next() {
  queue.pop(function(err, job){
    if (job) {
      console.log('scraping %s', job.url);
      setTimeout(next, Math.random() * 10000);
    }
  });
})();

setInterval(function(){
  queue.length(function(err, len){
    console.log('%d jobs remaining', len);
  });
}, 2000);

(function push() {
  console.log('push job');
  queue.push({ url: 'https://learnboost.com' });
  setTimeout(push, Math.random() * 2000);
})();
