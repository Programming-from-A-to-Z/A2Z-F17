// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// An array of lines from a text file
let lines;

// The Markov Generator object
let markov;

// Preload the seed data
function preload() {
  lines = loadStrings('itp.txt');
}

function setup() {
  noCanvas();
  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  markov = new MarkovGenerator(3, 100);
  // Feed all the lines from the text file into the generator
  for (let i = 0; i < lines.length; i++) {
    markov.feed(lines[i]);
  }
  // Set up a button
  let button = select('#button');
  button.mousePressed(generate);
}

function generate() {
  // Display the generated text
  let output = select('#name');
  let text = markov.generate();
  output.html(text);
}
