

function setup() {
  noCanvas();
  var bot = new RiveScript();
  // Load a list of files all at once
  var files = ['brain/knockknock.rive'];
  bot.loadFile(files, botLoaded, errorLoading);

  function botLoaded() {
    console.log("Bot loaded");
    bot.sortReplies();
  }

  function errorLoading(error) {
    console.log("Error when loading rivescript files: " + error);
  }

  var button = select('#submit');
  var input = select('#textinput');
  var output = select('#bot');

  button.mousePressed(chat);

  function chat() {
    var txt = input.value();
    var reply = bot.reply("local-user", txt);
    output.html(reply);
  }
}
