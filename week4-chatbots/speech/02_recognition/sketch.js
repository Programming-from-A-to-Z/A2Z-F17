// Speech Object
let speech;

function setup() {
  noCanvas();
  speech = new p5.SpeechRec();
  speech.onResult = gotSpeech;
  speech.continuous = true; // do continuous recognition
	speech.interimResults = false; // allow partial recognition (faster, less accurate)
  speech.start();


  let output = select('#speech');

  function gotSpeech() {
    if(speech.resultValue) {
      let said = speech.resultString;
      console.log(said);
      output.html(said);
    }
  }
}
