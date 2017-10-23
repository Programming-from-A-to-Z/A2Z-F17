// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Tracery by Kate Compton
// https://github.com/galaxykate/tracery

let grammar;

// Here is the grammar
let data = {
  "start": ["#[hero:#character#][villain:#monster#]story#"],
  "story": ["Once upon a time, there was #hero.a#. And that #hero# was very #adj#. And the #hero# liked #food#. The #hero# was very #adj#. Then the #hero# met a #adj# #adj# #villain#. And she killed the #villain#. #exclamation#. And then the #hero# ate the #food# and she was so #adj# and she was #adj# too today."],
  "character": ["fairy", "unicorn", "dragon", "prince", "wolf", "princess", "bear"],
  "adj": ['😎', '😍', '💚', "🔥", 'smart', 'pretty', 'smelly', 'funny', 'weird', 'happy', 'sad', 'angry'],
  "food": ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🍅", "🍆", "🌽", "🌶", "🍄", "🌰", "🍞", "🧀", "🍖", "🍗", "🍔", "🍟", "🍕", "🌭", "🌮", "🌯", "🍳", "🍲", "🍿", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🍡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", 'pizza', 'dumplings', 'hamburger', 'ice cream', 'french fries', 'salmon'],
  "monster": ['dragon', 'dinosaur', 'chupacabra', 'jaguar', 'joker', 'voldemort'],
  "exclamation": ['🙉', "🔥🔥🔥🔥🔥🔥🔥", 'Groooooooooan', 'Yahooooooooooo', 'Eeeeeeeeeeeeeeeek']
}

function setup() {
  noCanvas();
  // Make the grammar
  grammar = tracery.createGrammar(data);

  // A button to generate a new sentence
  let button = select('#generate');
  button.mousePressed(generate);

  // A button to clear everything
  let clear = select('#clear');
  clear.mousePressed(clearAll);
}

// Remove everything
function clearAll() {
  let elements = selectAll('.text');
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
}

function generate() {
  let expansion = grammar.flatten('#start#');
  let par = createP(expansion);
  let r = floor(random(100, 255));
  let g = floor(random(150, 255));
  let b = floor(random(200, 255));
  par.style('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');
  par.class('text');
}
