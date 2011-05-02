
/**
 * Module dependencies.
 */

var Queue = require('../').Queue;

var pets = new Queue('pets');

pets.push({ name: 'tobi' });
pets.push({ name: 'loki' });
pets.push({ name: 'jane' });
pets.push({ name: 'ewald' });
pets.push({ name: 'bandit' });
pets.push({ name: 'simon' });
pets.push({ name: 'braille' });

function next() {
  pets.pop(function(err, pet){
    if (!pet) return pets.client.end();
    console.log('  got %s', pet.name);
    next();
  });
}

next();