// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/

let sentenceInput, wordInput;

let lex;

let results;

function setup() {
  noCanvas();
  lex = new RiLexicon();

  // A text area
  sentenceInput = select('#sentence');

  // A button
  let analyzeButton = select('#analyze')
  analyzeButton.mousePressed(analyze);

  wordInput = select('#word');

  // A button
  let rhymeButton = select('#rhymes')
  rhymeButton.mousePressed(rhyme);

  let clearButton = select('#clear');
  clearButton.mousePressed(clearAll);

}

function analyze() {
  let p = createP('');
  p.class('text');

  let ol = createElement('ol');
  ol.parent(p);

  // What has the user entered?
  // Make a rita string object
  let rs = new RiString(sentenceInput.value());
  // Analyze that string for lots of features
  let features = rs.features();

  // Here are some features you can get (there are more!)
  let li1 = createElement('li', 'Stresses: ' + features.stresses);
  let li2 = createElement('li', 'Phonemes: ' + features.phonemes);
  let li3 = createElement('li', 'Parts of speech: ' + features.pos);
  let li4 = createElement('li', 'Syllables: ' + features.syllables);

  // Put the in the list
  li1.parent(ol);
  li2.parent(ol);
  li3.parent(ol);
  li4.parent(ol);

  // How many syllables is each word?

  // First split up each word by anything not a dash, slash or letter/number
  // This would be simpler if you are looking at one word at a time
  let tokens = features.syllables.split(/[^\-\/\w]+/);

  // Make an array for the syllable count of each word
  let syllableCount = [];

  // How many syllables separated by slashes?
  for (let i = 0; i < tokens.length-1; i++) {
    let syllables = tokens[i].split(/\//);
    syllableCount[i] = syllables.length;
  }

  // Show this in the list
  let li5 = createElement('li', 'Syllable count: ' + syllableCount.join(' '));
  li5.parent(ol);
}

function rhyme() {

  let p = createP('');
  p.class('text');

  let ol = createElement('ol');
  ol.parent(p);

  // Get rhymes from the lexicon
  let rhymes = lex.rhymes(wordInput.value());

  // Show them in a list
  for (let i = 0; i < rhymes.length; i++) {
    let li = createElement('li', rhymes[i]);
    li.parent(ol);
  }
}

// Go through and remove all the divs
function clearAll() {
  let par = selectAll('.text');
  for (let i = 0; i < par.length; i++) {
    par[i].remove();
  }
}
