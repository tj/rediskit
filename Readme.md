
# RedisKit

  Collection of Redis backed data structures for nodejs. RedisKit aims to create first-class JavaScript objects of the primitives that Redis provies as well as higher level abstractions and interactions between the data types.

## Structures

    - Key
      - List
        - Queue
        - CappedList
      - Hash

## Installation

    $ npm install rediskit

## Example

    var list = new List('pets')
      , tobi = new Hash('pet:tobi')
      , loki = new Hash('pet:loki')
      , jane = new Hash('pet:jane');

    list.rpush('tobi');
    list.rpush('jane');
    list.rpush('loki');

    tobi.set('age', 1);
    loki.set('age', 0.5);
    jane.set('age', 3);

    list.sort.by('pet:*->age').get('#').get('pet:*->age').end(function(err, res){
      res.should.eql(['loki', '0.5', 'tobi', '1', 'jane', '3']);
    });

## Running Tests

    $ npm install
    $ redis-server
    $ make test

## License 

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-url]: https://npmjs.org/package/rediskit
[npm-image]: https://badge.fury.io/js/rediskit.svg
[travis-url]: https://travis-ci.org/zj8487/rediskit
[travis-image]: https://travis-ci.org/zj8487/rediskit.svg?branch=master
[daviddm-url]: https://david-dm.org/zj8487/rediskit.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/zj8487/rediskit
