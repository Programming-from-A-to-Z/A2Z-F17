// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

let sliders = [];

function setup() {
  noCanvas();

  for (let i = 0; i < 200; i++) {
    let slider = createSlider(0, 100, 50);
    sliders.push(slider);
  }
}

let offset = 0;

function draw() {
  for (let i = 0; i < sliders.length; i++) {
    let n = map(sin(offset + i / 46), -1, 1, 0, 100);
    sliders[i].value(n);
  }
  offset += 0.1;
}
