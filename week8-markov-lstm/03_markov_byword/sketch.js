// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

function setup() {
  noCanvas();
  // Assign the generate() function to the button
  let generateButton = select('#generate');
  generateButton.mousePressed(generate);

  let clearButton = select('#clear');
  clearButton.mousePressed(clearIt);
}

function clearIt() {
  let markovs = selectAll('.markov');
  for (let i = 0; i < markovs.length; i++) {
    markovs[i].remove();
  }
}


function generate() {
  // Get the HTML elements we need
  let order = select('#order');
  let length = select('#length');


  // Get the input text
  let textinput = select('#text');

  // Create a generator with parameters
  let markov = new MarkovGeneratorWord(Number(order.value()), Number(length.value()));

  // Split it up into line breaks
  let lines = textinput.value().split('\n');

  // Feed in the lines
  for (let i = 0; i < lines.length; i++) {
    // Trim out any extra white space
    markov.feed(lines[i].trim());
  }

  // Show the resulting output
  let par = createP(markov.generate());
  par.class('markov');
  par.parent('results');

}
