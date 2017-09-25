// Speech Object
let speech = new p5.SpeechRec();

function setup() {
  noCanvas();
  speech.onResult = gotSpeech;
  speech.start();

  speech.continuous = true; // do continuous recognition
	speech.interimResults = true; // allow partial recognition (faster, less accurate)

}

function gotSpeech() {
  if(speech.resultValue) {
    let said = speech.resultString;
    console.log(said);
    createP(said);
  }
}
