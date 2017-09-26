var alexa = require('alexa-app');

var app = new alexa.app('a2z');

app.launch(function(req, res) {
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
    var value = req.slot('VALUE');
    res.say("Time to count.");
    for (var i = 0; i < value; i++) {
      res.say('Counting ' + value);
    }
  }
);

module.exports = app;
