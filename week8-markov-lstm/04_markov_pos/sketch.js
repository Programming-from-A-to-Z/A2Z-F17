// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Keep track of all words by pos
let wordbypos = {};
// Keep track of all words
let poslist = [];

function setup() {
  noCanvas();
  // Assign the generate() function to the button
  let generateButton = select('#generate');
  generateButton.mousePressed(generate);

  let clearButton = select('#clearButton');
  clearButton.mousePressed(clearIt);
}

function clearIt() {
  let markovs = selectAll('.markov');
  for (let i = 0; i < markovs.length; i++) {
    markovs[i].remove();
  }
}


function generate() {

  // Get the input text
  let textinput = select('#text_input');

  // Create a generator with parameters
  let markov = new MarkovGeneratorWord(2, 50);

  // Split it up into line breaks
  let lines = textinput.value().split('\n');

  // Feed in the lines
  for (let i = 0; i < lines.length; i++) {
    // Trim out any extra white space
    let txt = lines[i].trim();

    let pos = RiTa.getPosTags(txt);
    let words = RiTa.tokenize(txt);
    markov.feed(pos);

    for (let i = 0; i < pos.length; i++) {
      let tag = pos[i];
      let word = words[i];
      if (!wordbypos[tag]) {
        wordbypos[tag] = [];
        poslist.push(tag);
      }
      wordbypos[tag].push(word);
    }

  }

  // Show the resulting output
  let generatedPos = markov.generate();

  let posarray = generatedPos.split(/\s+/);

  let generatedText = '';
  for (let i = 0; i < posarray.length; i++) {
    let tag = posarray[i];
    let options = wordbypos[tag];
    generatedText += options.choice() + ' ';
  }

  let par = createP(generatedPos + '<br/><br/>' + generatedText);
  par.class('markov');
  par.parent('results');



}
