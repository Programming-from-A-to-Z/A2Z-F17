// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// This is the same sketch as the first example but just uses the RiTa library

// The Markov Generator object
let generator;

function setup() {
  noCanvas();
  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  generator = new RiMarkov(2);
  generator.loadFrom('data/itp.txt');
  // Set up a button
  let button = select('#button');
  button.mousePressed(generate);
}

function generate() {
  // Display the generated text
  let output = select('#name');
  let text = generator.generateSentences(1);
  output.html(text[0]);
}
