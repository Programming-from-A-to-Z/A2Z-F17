// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17


// An array of lines from a text file
let lines;
// The Markov Generator object
let markov;
// An output element
let output;

// Preload some seed data
function preload() {
  lines = loadStrings('data/frankenstein.txt');
}

function setup() {
  // Join everything together in one long string
  // Keep carriage returns so these will show up in the markov generator
  let text = lines.join('\n');

  // N-gram length and maximum length
  markov = new MarkovGenerator(6, 10000);
  markov.feed(text);

  // Make the button
  let button = select('#button');
  button.mousePressed(generate);

  // Make the output element
  output = select('#output');

  noCanvas();
}

function generate() {
  // Generate some text
  let text = markov.generate();
  // Put in HTML line breaks wherever there was a carriage return
  text = text.replace(/\n/g,'<br/><br/>');
  output.html(text);
}
