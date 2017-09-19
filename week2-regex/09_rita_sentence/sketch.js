// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// Adapted from: http://p5js.org/examples/examples/Dom_Input_and_Button.php

let input, button, greeting;

let txt;

function setup() {

  noCanvas();

  // Make an h2 element
  greeting = createElement('h2', 'Type a sentence.');
  // Make a text input field
  input = createInput('The quick brown fox jumped over the lazy dog.');
  input.size(400);
  // Make a submit button
  button = createButton('submit');

  // Here a button triggers the "hello message"
  button.mousePressed(process);



}

function process() {
  let sentence = input.value();
  let rs = new RiString(sentence);

  createP("Parts of speech: " + rs.get('pos'));

  //let par = createP('hello '+ name + '!');
}
