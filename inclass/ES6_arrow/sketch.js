function setup() {
  noCanvas();
  let button = createButton('go');

  // button.mousePressed(function() {
  //   createP("button pressed");
  // });

  // button.mousePressed(() => {
  //   createP("button pressed");
  // });


  let counter1 = new Counter(100, 2000);
  let counter2 = new Counter(0, 500);
  counter1.countIt();
  counter2.countIt();
}

class Counter {
  constructor(start, wait) {
    this.count = start;
    this.wait = wait;
  }

  countIt() {
    setInterval(() => {
      this.count++;
      createDiv(this.count);
    }, this.wait);
  }
}
