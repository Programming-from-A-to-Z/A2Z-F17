function setup() {
  createCanvas(200, 200);

  loadJSON('/question', gotData);

  function gotData(data) {
    background(200);
    text(data.question, 10, 100);
  }
}
