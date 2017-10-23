// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Using express: http://expressjs.com/
let express = require('express');
// Create the app
let app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
let server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// This is for hosting files
// Anything in the public directory will be served
// This is just like python -m SimpleHTTPServer
// We could also add routes, but aren't doing so here
app.use(express.static('public'));

// The 'fs' (file system) module allows us to read and write files
// http://nodejs.org/api/fs.html
// This is how we'll load data
const fs = require('fs');

// Read in some data
let txt = fs.readFileSync('itp.txt', 'utf8');

// Pulling the Markov object from a separate "module" - markov.js
let markov = require('./markov');

// An object that acts as dictionary of words and counts
let generator = new markov.Generator(3, 20);

// Feed all the lines from the text file into the generator
let lines = txt.split(/\n/);
for (let i = 0; i < lines.length; i++) {
  generator.feed(lines[i]);
}

// Route for a new generated phrase
app.get('/generate', generate);

// Callback
function generate(req, res) {
  // Send as JSON
  let result = {
    text: generator.generate()
  }
  res.send(result);
}
