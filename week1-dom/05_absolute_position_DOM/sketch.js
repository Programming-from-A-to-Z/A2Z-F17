// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F17
// http://shiffman.net/a2z

function setup() {
  noCanvas();

  // windowWidth and windowHeight are variables
  // for the browser page width and height
  for (let i = 0; i < 500; i++) {
    let div = createDiv('p5');
    div.style('padding', '12px');
    let r = floor(random(200, 255));
    let b = floor(random(150, 200));
    let col = 'rgb(' + r + ',0,' + b + ')';
    div.style('background-color', col);
    div.style('font-family', 'monospace');
    div.style('color', '#FFF');
    div.style('opacity','0.5');
    div.position(random(windowWidth),random(windowHeight));
  }

}
