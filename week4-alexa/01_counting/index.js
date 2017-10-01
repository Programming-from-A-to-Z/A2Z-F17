// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Based on: https://github.com/dblock/alexa-parrot

// This is required for deploying to Lambda
var a2z = require('./a2z');
exports.handler = a2z.lambda();
