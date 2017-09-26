// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/

let wordInput;

let results;

function setup() {
  noCanvas();


  wordInput = select('#word');

  // A button
  let analyzeButton = select('#analyze')
  analyzeButton.mousePressed(analyze);

  let clearButton = select('#clear');
  clearButton.mousePressed(clearAll);

}

function analyze() {
  let p = createP('');
  p.class('text');


  // What has the user entered?
  // Make a rita string object
  let rs = new RiString(wordInput.value());

  // Analyze that string for lots of features
  let features = rs.features();

  // Just look at the syllables
  let syllables = features.syllables;

  // What's the count of syllables based on the slashes
  let syllablesCount = syllables.split(/\//).length;

  // Show
  let syl = createDiv('Syllables: ' + syllables);
  let count = createDiv('Count: ' + syllablesCount);
  syl.parent(p);
  count.parent(p);

}

// Go through and remove all the divs
function clearAll() {
  let par = selectAll('.text');
  for (let i = 0; i < par.length; i++) {
    par[i].remove();
  }
}
