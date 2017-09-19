// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/



// Here is where we are working with a regex
function process(txt) {

  let flags = '';
  if (globalCheck.elt.checked) {
    flags += 'g';
  }
  if (caseCheck.elt.checked) {
    flags += 'i';
  }

  let regex = new RegExp(regexInput.value(), flags);
  console.log(regex);

  let results = txt.match(regex);
  console.log(results);

  let output = '';
  if (results) {
    for (let i = 0; i < results.length; i++) {
      output += results[i] + '<br/>';
    }
  } else {
    output = 'No matches found';
  }

  let par = createP(output);
  par.class('text');
  paragraphs.push(par);
}


/***************************************************/
/* Everything below just handles the text input ****/
/***************************************************/


// Many DOM elements
let dropZone, input, button, sample, clearButton;

// Checkboxes and regex input
let regexInput, globalCheck, caseCheck;

// An array to keep track of all the new DOM elements being added
let paragraphs = [];

let inputText = '';

function setup() {

  noCanvas();

  // Selecting the text field and button
  input = select('#textinput');
  button = select('#submit');
  // What to do when button pressed
  button.mousePressed(handleInput);

  // Selected the div which will be the "drop zone"
  // for dragging and dropping files
  dropZone = select('#drop_zone');
  // Here are the events to handle
  dropZone.dragOver(highlight);
  dropZone.drop(gotFile, unHighlight);

  // This link allows quick testing with a file
  // that's ready to load instantly
  sample = select('#sample');
  sample.mousePressed(loadFile);

  // This button clears the new paragraph elements
  // added
  clearButton = select('#clear');
  clearButton.mousePressed(clearText);

  regexInput = select('#regex');
  globalCheck = select('#global');
  caseCheck = select('#case');
}

// Load a file for quick testing
function loadFile() {
  loadStrings('files/spam.txt', fileLoaded);
}
// When the file is loaded
function fileLoaded(data) {
  let txt = data.join('\n');

  input.html(txt);
  // Note the use of a function that will "process" the text
  // This is b/c the text might come in a number of different ways
  // process(txt);
}

// Handle dropzone events
function highlight() {
  dropZone.style('background', '#AAA');
}

function unHighlight() {
  dropZone.style('background','');
}

function gotFile(file) {
  if (file.type === 'text') {
    // process(file.data);
    inputText += file.data + '\n\n';
    input.html(inputText);
  } else {
    // In case it's some weird other kind of file
    alert('this is not a text file.');
  }
}

// Handle the text input field
function handleInput() {
  process(input.value());
}

// Clear all the divs with remove()
function clearText() {
  input.html('');
  intputText = '';
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}
