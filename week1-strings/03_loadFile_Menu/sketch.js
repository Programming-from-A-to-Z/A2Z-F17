// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

function setup() {
  noCanvas();
  // createFileInput creates a button in the window
  // that can be used to select files
  // The first argument is the callback function
  // The 'multiple' flag allows more than one file to be selected
  let fileSelect = createFileInput(gotFile, 'multiple');
}

// file is a p5.File object that has metadata, and the file's contents
function gotFile(file) {
  // Make a div to display info about the file
  let fileDiv = createDiv(file.name + ' ' + file.type + ' ' + file.subtype + ' ' + file.size + ' bytes');
  // Assign a CSS class for styling (see index.html)
  fileDiv.class('file');

  // Hanlde image and text differently
  if (file.type === 'image') {
    let img = createImg(file.data);
    img.class('thumb');
  } else if (file.type === 'text') {
    // Make a paragraph of text
    let par = createP(file.data);
    par.class('text');
  }
}
