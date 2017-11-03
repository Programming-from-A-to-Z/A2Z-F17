// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z


// Main API URL
const wordnik = 'http://api.wordnik.com/v4/word.json/';
// API Key
const api_key = '/?api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7'

// Each one of these words will be assigned to a DOM element
const words = ['rainbow', 'heart', 'sparkle', 'canteen', 'ridiculous'];

function setup() {
  noCanvas();

  // Make links to each one of these words
  for (let i = 0; i < words.length; i++) {
    const a = createA('#', words[i]);
    a.class('box');

    a.mousePressed(() => {
      let count = 0;
      const interval = setInterval(() => {
        console.log(count);
        count = (count + 1) % 100;
        a.html(count);
      }, 25);
      
      // Query the API
      loadJSON(wordnik + words[i] + '/relatedWords' + api_key, data => {
        const r1 = floor(random(data.length));
        const r2 = floor(random(data[r1].words.length));
        // Updat the content
        a.html(data[r1].words[r2]);
        // Stop the animation
        clearInterval(interval);
      });
    });

    // Just putting a space
    createSpan(' ');
  }
}
