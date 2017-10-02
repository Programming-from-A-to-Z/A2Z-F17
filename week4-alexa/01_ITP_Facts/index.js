// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Based on https://github.com/alexa/skill-sample-nodejs-fact

let Alexa = require('alexa-sdk');

// replace with your app ID (OPTIONAL).
// let APP_ID = undefined;

let facts = [
  'ITP is an experimental place.',
  'The first location of ITP was in the attic of an Art House Movie Theater.',
  'Meghan Trainor invented Drive-Bys, then lied to the first-years, telling them that it was an ITP tradition they had to carry on.',
  'Al Gore came by to hear about the future of media. After Shawn van Every told him about coming interactivity around video, Gore passed, saying he really just wanted to build a left-wing Fox cable channel.',
  'Liz Goodman and Michelle Chang\'s Asphalt Games project was originally titled Fiasco, until they got sponsorship from Intel, who balked at "Fiasco, powered by Intel."',
  'The "Cliff Bar" locker was a stash of Cliff bars in an unlocked locker that ran for several years on the honor system -- take a Cliff Bar, leave a dollar.'
];

let SKILL_NAME = 'ITP Facts';
let GET_FACT_MESSAGE = 'Here\'s your fact: ';
let HELP_MESSAGE = 'You can say tell me an ITP fact, or, you can say exit... What can I help you with?';
let HELP_REPROMPT = 'What can I help you with?';
let STOP_MESSAGE = 'Goodbye!';

let handlers = {
  'LaunchRequest': function() {
    this.emit('GetFact');
  },
  'GetNewFactIntent': function() {
    this.emit('GetFact');
  },
  'GetFact': function() {
    let index = Math.floor(Math.random() * facts.length);
    let fact = facts[index];
    let speechOutput = GET_FACT_MESSAGE + fact;
    this.emit(':tell', speechOutput);
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
