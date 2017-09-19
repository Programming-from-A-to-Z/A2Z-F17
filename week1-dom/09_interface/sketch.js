// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F17
// http://shiffman.net/a2z

let divs = [];
let slider;
let checkbox;
let dropdown;
let input;


function setup() {
  noCanvas();

  let divButton = createButton('make a div');
  divButton.mousePressed(makeDiv);

  slider = createSlider(1, 48, 12);

  checkbox = createCheckbox('red');
  dropdown = createSelect();
  dropdown.option('date');
  dropdown.option('random number');

  input = createInput('your name');

  let clearButton = createButton('clear');
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
