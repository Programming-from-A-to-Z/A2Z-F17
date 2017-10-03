// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Based on https://github.com/alexa/skill-sample-nodejs-fact

let Alexa = require('alexa-sdk');

// replace with your app ID (OPTIONAL).
// let APP_ID = undefined;

let facts = [
  'Pizza is delicious.',
  'Pizza is not good if you are lactose intolerant'
];

let SKILL_NAME = 'Salad Or Pizza';
let HELP_MESSAGE = 'You can ask me for salad or pizza. What can I help you with?';
let HELP_REPROMPT = 'What can I help you with?';
let STOP_MESSAGE = 'Goodbye!';

let handlers = {
  'LaunchRequest': function() {
    this.emit(':ask', 'This is a lunch orderer, do you want a pizza or a salad?');
  },
  'PizzaIntent': function() {
    this.emit(':tell', 'A pizza will arrive for you later.');
  },
  'SaladIntent': function() {
    this.emit(':tell', 'A salad will arrive for you later.');
  },
  'AMAZON.HelpIntent': function() {
    let speechOutput = HELP_MESSAGE;
    let reprompt = HELP_MESSAGE;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', STOP_MESSAGE);
  },
};

exports.handler = function(event, context) {
  let alexa = Alexa.handler(event, context);
  // alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
