// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Based on: https://github.com/dblock/alexa-parrot

var a2z = require('./a2z');

// This spits out all the stuff you need to enter for the skill
// at https://developer.amazon.com/alexa-skills-kit

console.log("SCHEMA: ");
console.log(a2z.schema());

console.log();
console.log("UTTERANCES: ");
console.log(a2z.utterances());
