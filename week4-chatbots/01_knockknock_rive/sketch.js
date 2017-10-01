// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

function setup() {
  noCanvas();

  // Create a RiveScript bot
  var bot = new RiveScript();

  // Load the bot files (this can be more than one)
  var files = ['brain/knockknock.rive'];
  bot.loadFile(files, botLoaded, errorLoading);

  // The bot is ready
  function botLoaded() {
    console.log("Bot loaded");
    bot.sortReplies();
  }

  // There was a problem
  function errorLoading(error) {
    console.log("Error when loading rivescript files: " + error);
  }

  // Grab some DOM elements
  var button = select('#submit');
  var input = select('#textinput');
  var output = select('#bot');

  // Whenever the user hits "submit" ask the bot to say something
  button.mousePressed(chat);


  function chat() {
    // What did the user say?
    var txt = input.value();
    // What does the bot say?
    var reply = bot.reply("local-user", txt);
    // show the reply
    output.html(reply);
  }
}
