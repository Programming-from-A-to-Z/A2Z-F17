// Speech Object
let voice = new p5.Speech();

function setup() {
  createCanvas(200, 20).parent('canvas');
  background(0);

  let txtInput = select('#say');
  let vslider = select('#volume');
  let rslider = select('#rate');
  let pslider = select('#pitch');
  say = txtInput.value();
  voice.speak(say);

  let button = select('#speak');
  button.mousePressed(sayIt);

  voice.onStart = function() {
    background(0, 255, 0);
  }
  voice.onEnd = function() {
    background(0);
  }

  let dropdown;

  voice.onLoad = function() {
    dropdown = createSelect();
    dropdown.parent('voices');
    let voices = voice.voices;
    for (let i = 0; i < voices.length; i++) {
      dropdown.option(voices[i].name);
    }
    dropdown.changed(sayIt);
  }

  function sayIt() {
    let say = txtInput.value();
    let name = dropdown.value();

    voice.setVolume(vslider.value());
    voice.setRate(rslider.value());
    voice.setPitch(pslider.value());

    voice.setVoice(name);
    voice.speak(say);
  }

}
