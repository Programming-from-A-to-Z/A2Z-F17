// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17



function setup() {
  noCanvas();
  // Set up a button
  let button = select('#button');
  button.mousePressed(generate);
}

function generate() {
  loadJSON('/generate', gotData);
  let output = select('#name');

  function gotData(data) {
    output.html(data.text);
  }
}
