// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F17
// http://shiffman.net/a2z


function setup() {
  noCanvas();

  // Make a text input field
  input = select('#sentence');
  // Make a submit button
  let button1 = select('#pluralize');
  button1.mousePressed(pluralize);

  let button2 = select('#negate');
  button2.mousePressed(negate);

  let button3 = select('#tense');
  button3.mousePressed(futureTense);

  function pluralize() {
    let output = input.value();
    let doc = nlp(output);
    let nouns = doc.nouns().data();
    for (var i = 0; i < nouns.length; i++) {
      output = output.replace(nouns[i].singular, nouns[i].plural);
    }
    createP(output).class('text');
  }

  function negate() {
    let output = nlp(input.value()).sentences().toNegative().out('text');
    createP(output).class('text');
  }

  function futureTense() {
    let output = input.value();
    let doc = nlp(output);
    output = doc.sentences().toFutureTense().out('text');
    createP(output).class('text');
  }

  function futureTense() {
    let output = input.value();
    let doc = nlp(output);
    output = doc.sentences().toFutureTense().out('text');
    createP(output).class('text');
  }




  nlp('dinosaur').nouns().toPlural().out('text');
  // 'dinosaurs'

  nlp('She sells seashells').sentences().toNegative().out('text');
  // 'She doesn't sell seashells'

  nlp('I fed the dog').replace('the #Noun', 'the cat').out('text');
  // 'I fed the cat'

  nlp('Tony Hawk did a kickflip').people().out('freq');
  // {normal: "tony hawk", count: 1, percent: 100}

  nlp('five hundred and sixty').values().toNumber().out('text')
  // 560


}
