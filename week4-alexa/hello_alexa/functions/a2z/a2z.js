var alexa = require('alexa-app');

var app = new alexa.app('a2z');

app.launch(function(req, res) {
  res.say('I am a demo skill.');
});

module.exports = app;
