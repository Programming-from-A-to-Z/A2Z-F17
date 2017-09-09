// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

// The diastic algorithm is performed in this function
function process(data) {

  // All of the words as an array
  let words = splitTokens(data, ' .,:;!@#$%&*()\n');
  // All of the words in the seed phrase as an array
  let seeds = split(seedInput.value(), ' ');
  // The output
  let output = '';

  // For every seed word
  for (let n = 0; n < seeds.length; n++) {
    let seed = seeds[n].toLowerCase();
    // Check each character
    for (let i = 0; i < seed.length; i++) {
      let c = seed.charAt(i);
      let found = false;
      // random order
      words = shuffle(words);
      // Find a word with a character in the same spot as the seed
      for (let j = 0; j < words.length; j++) {
        if (words[j].toLowerCase().charAt(i) === c) {
          // if it's found, add it to the output
          output += words[j] + ' ';
          found = true;
          break;
        }
      }
      // If no word matches just use the seed phrase itself
      if (!found) {
        output += seed + ' ';
      }
    }
  }

  // Make a paragraph with the output text
  let par = createP(output);
  par.class('text');
  paragraphs.push(par);
}

// A function to shuffle an array
// From: http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  let m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
