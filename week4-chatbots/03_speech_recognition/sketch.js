// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Speech Object
let speech;

function setup() {
  noCanvas();
  // Create a Speech Recognition object
  speech = new p5.SpeechRec();
  // Assign an event for when it's recognized something
  speech.onResult = gotSpeech;
  // "Continuous recognition" (as opposed to one time only)
  speech.continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  // Change this to "true"
	speech.interimResults = false;
  // This must come after setting the properties
  speech.start();

  // DOM element to display results
  let output = select('#speech');

  // Speech recognized event
  function gotSpeech() {
    // Something is there
    if (speech.resultValue) {
      // Get it as a string, you can also get JSON with more info
      let said = speech.resultString;
      console.log(said);
      // Show user
      output.html(said);
    }
  }
}
