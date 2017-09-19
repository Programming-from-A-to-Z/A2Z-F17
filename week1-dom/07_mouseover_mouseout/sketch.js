// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F17
// http://shiffman.net/a2z

let link;

function setup() {
  noCanvas();
  link = createA("#","click me");
  link.style('padding', '12px');
  link.style('border-style', 'solid');

  link.mouseOver(mOver);
  link.mouseOut(mOut);
  link.mousePressed(changeBG);
}

function mOver() {
  let heading = select('#heading');
  heading.html('mouse over!');
}

function mOut() {
  let heading = select('#heading');
  heading.html('mouse out!');
}

function changeBG() {
  let heading = select('#heading');
  let r = floor(random(255));
  let b = floor(random(255));
  let col = 'rgb(' + r + ',0,' + b + ')';
  heading.style('background-color', col);
}
