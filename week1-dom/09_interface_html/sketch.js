// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

let divs = [];
let slider;
let checkbox;
let dropdown;
let input;


function setup() {
  noCanvas();

  let divButton = select('#divbutton');
  divButton.mousePressed(makeDiv);

  slider = select('#sizeslider');

  checkbox = select('#redcheck');
  dropdown = select('#what');

  input = select('#textinput');

  let clearButton = select('#clearbutton');
  clearButton.mousePressed(function() {
    for (let i = 0; i < divs.length; i++) {
      divs[i].remove();
    }
  });
}

function makeDiv() {
  let div;

  if (dropdown.selected() === 'date') {
    div = createDiv(input.value() + ', this div was made at ' + Date());
  } else {
    div = createDiv(input.value() + ', here\'s a random number: ' + floor(random(100)));
  }
  div.style('font-size', slider.value() + 'pt');

  if (checkbox.checked()) {
    div.style('background-color', '#D00');
  }

  divs.push(div);
}

// function changeSize() {
//   for (let i = 0; i < divs.length; i++) {
//     divs[i].style('font-size', slider.value() + 'pt');
//   }
// }
