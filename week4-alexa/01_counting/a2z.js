// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Based on: https://github.com/dblock/alexa-parrot

// This is the actual skill code

// I'm using this node package:
// https://github.com/alexa-js/alexa-app
var alexa = require('alexa-app');

// Create the app
var app = new alexa.app('a2z');

// For when the app first starts
// These are like "routes"
app.launch(alexaLaunch);

function alexaLaunch(request, response) {
  response.say('I am a counting skill.');
}


// For each "intent" we need:

// 1: intent JSON
let countIntent = {
  // Slots are like "variables"
  'slots': {
    'VALUE': 'AMAZON.NUMBER'
  },
  'utterances': [
    'Count to {-|VALUE}'
  ]
};

// 2: intent callback / handler
// This is like a "route"
function countHandler(request, response) {
  // Get the "value"
  var value = request.slot('VALUE');
  // Say something
  response.say("Time to count.");
  // Say some more stuff
  for (var i = 0; i < value; i++) {
    response.say('Counting ' + i);
  }
}

// Set up the intent with the JSON and callback
app.intent('CountIntent', countIntent, countHandler);

module.exports = app;
