console.log('starting skill');

var alexa = require('alexa-app');

var app = new alexa.app('a2z');

app.launch(function(req, res) {
  console.log('launching skill');
  res.say('I am a counting skill.');
});

app.intent('CountIntent', {
    'slots': {
      'VALUE': 'AMAZON.NUMBER'
    },
    'utterances': [
      'Count to {-|VALUE}'
    ]
  },
  function(req, res) {
    console.log('intent');
    var value = req.slot('VALUE');
    res.say("Time to count.");
    for (var i = 0; i < value; i++) {
      res.say('Counting ' + i);
    }
  }
);

module.exports = app;
