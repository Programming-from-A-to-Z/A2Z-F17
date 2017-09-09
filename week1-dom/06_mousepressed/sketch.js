// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

let link;

function setup() {
  noCanvas();
  link = createA("#","click me");
  link.style('padding', '12px');
  link.style('border-style', 'solid');
  link.mousePressed(changeBG);
}

function changeBG() {
  let heading = select('#heading');
  let r = floor(random(255));
  let b = floor(random(255));
  let col = 'rgb(' + r + ',0,' + b + ')';
  heading.style('background-color', col);
}
