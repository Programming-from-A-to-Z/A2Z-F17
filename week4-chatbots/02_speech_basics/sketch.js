// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17


function setup() {
  // Create a speech object
  let voice = new p5.Speech();
  voice.onLoad = voiceReady;

  // When the voice is ready
  function voiceReady() {
    // Ask for all the possible voices and put them in a dropdown
    dropdown = createSelect();
    dropdown.parent('voices');
    let voices = voice.voices;
    for (let i = 0; i < voices.length; i++) {
      dropdown.option(voices[i].name);
    }
    // Speak if you ask for a new voice
    dropdown.changed(sayIt);
  }

  // A small canvas to show when its "talking" or not
  createCanvas(200, 20).parent('canvas');
  background(0);

  // Grab a bunch of DOM elements
  let txtInput = select('#say');
  let vslider = select('#volume');
  let rslider = select('#rate');
  let pslider = select('#pitch');

  // Start off saying something by default
  say = txtInput.value();
  voice.speak(say);

  // This button will trigger speaking
  let button = select('#speak');
  button.mousePressed(sayIt);

  // Events for starting and stopping talking
  voice.started(startSpeaking);
  function startSpeaking() {
    background(0, 255, 0);
  }

  voice.ended(endSpeaking);
  function endSpeaking() {
    background(0);
  }

  // This will be for all of the voice options
  let dropdown;

  // Function to say what is in the text input
  function sayIt() {
    // What to say
    let say = txtInput.value();
    // Who to say it
    let name = dropdown.value();

    // Volume, rate, pitch
    voice.setVolume(vslider.value());
    voice.setRate(rslider.value());
    voice.setPitch(pslider.value());

    // Talk!
    voice.setVoice(name);
    voice.speak(say);
  }
}
