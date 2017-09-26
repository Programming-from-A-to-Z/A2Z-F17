// let cat1;
// let cat2;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // cat1 = new Particle();
  // cat2 = new Particle();
}

function mousePressed() {
  let p = new Particle(mouseX, mouseY);
  particles.push(p);
}

function draw() {
  background(0);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }

  // cat1.update();
  // cat1.show();
  // cat2.update();
  // cat2.show();

}


class Particle {
  constructor(x, y) {
    this.x = x || 100;
    this.y = y || 100;
  }

  // constructor() {
  //   this.x = random(width);
  //   this.y = random(height);
  // }

  update() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 8, 8);
  }
}
