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

// Slider to weight the data fed
let slider;

// Preload some seed data
function preload() {
  linesA = loadStrings('data/natureofcode.txt');
  linesB = loadStrings('data/shakes_short.txt');
}

function setup() {


  // Make the button
  let button = select('#button');
  button.mousePressed(generate);

  // Make the output element
  output = select('#output');

  // Make the slider
  slider = select('#slider');
  // We could regenerate as the user moves the slider!
  // but unless it's very little data, we'd have to do it
  // a different way
  // slider.input(tooSlow);

  noCanvas();
}

// function tooSlow() {
//   generate();
// }

function generate() {
  // Make the markov generator each time we generate text!
  markov = new MarkovGenerator(5, 2000);

  // How many times should we repeat input B
  let repeat = floor(slider.value() / 10);

  // Repeat A the inverse of B
  let totalA = 10 - repeat;
  let totalB = repeat;


  // Feed input A totalA times to the generator
  for (let n = 0; n < totalA; n++) {
    for (let i = 0; i < linesA.length; i++) {
      markov.feed(linesA[i]);
    }
  }

  // Feed input B totalB times to the generator
  for (let n = 0; n < totalB; n++) {
    for (let i = 0; i < linesB.length; i++) {
      markov.feed(linesB[i]);
    }
  }

  // Generate some text and show it
  let generated = markov.generate();
  output.html(generated);

}
