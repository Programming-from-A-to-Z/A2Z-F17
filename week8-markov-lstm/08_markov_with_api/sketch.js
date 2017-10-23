// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// Thanks to Dana for the idea: http://www.blondishmoment.com/2015/10/21/icm7/

// An array of lines from a text file
let lines;

// The Markov Generator object
let markovs = [];

// These are the "orders" this example will support
let current = 3;
let start = 2;
let end = 11;

// Counting if the API calls are finished
let count = 0;
let total = 0;

// For "loading animation"
let angle = 0;


function setup() {

  // Make a canvas for a loading animation
  let canvas = createCanvas(50, 50);
  canvas.parent('loading');
  // Also a div to say loading
  let div = createDiv("loading");
  div.parent('loading');


  // Let's make a whole bunch of markov generators
  // All with different orders so we can use them whenever!
  for (let i = start; i < end; i++) {
    markovs[i] = new MarkovGenerator(i, 1000);
  }

  // Newest relationship advice posts
  let url = 'https://www.reddit.com/r/relationship_advice.json';
  loadJSON(url, gotPost);

  // Once we've got the data, I want to get all the posts
  // To ask for comments on each post
  function gotPost(data) {
    let posts = data.data.children;

    // This is how many posts there are!
    total = posts.length;

    // Make the API calls, these will need to be delayed to not
    // lock up the page and/or overwhelm the API
    for (let i = 0; i < posts.length; i++) {
      let id = posts[i].data.id;
      let newurl = 'https://www.reddit.com/r/relationship_advice/comments/' + id + '.json';

      // Instead of immediately calling loadJSON,
      // loadJSON(newurl, gotComments);
      // a separate function is used that will trigger the API call with a delay
      delayIt(newurl, i);

    }
  }

  function delayIt(url, i) {
    // Set when to query the API (every 200 milliseconds)
    setTimeout(getComments, i*200);

    // Do the API call
    function getComments() {
      loadJSON(url, gotComments);
    }
  }

  // Now we've got comments
  function gotComments(data) {
    let advice = data[1].data.children;
    // Feed in the text to all of the APIs!
    for (let i = 0; i < advice.length; i++) {
      for (let n = start; n < end; n++) {
        markovs[n].feed(advice[i].data.body);
      }
    }

    count++;
    // Once this has happened "total" times
    // all the API calls are done!
    if (count === total) {
      // Show the interface
      let inter = select('#interface');
      inter.show();
      // Hide the loading animation
      let loading = select('#loading');
      noLoop();
      loading.hide();
    }
  }

  // Set up a button
  let button = select('#button');
  button.mousePressed(generate);

  // This slider changes the "order" of the markov chain
  let slider = select('#slider');
  slider.input(changeOrder);

  // Regenerate the markov chain with new order value
  function changeOrder() {
    order = slider.value();
    // Update DOM element to show user changed value
    let span = select('#order');
    span.html(order);
  }


}


function generate() {
  // Display the generated text
  let output = select('#advice');
  let text = markovs[current].generate();
  output.html(text);
}

// A draw function for a loading animation
function draw() {
  background(255);
  translate(width/2, height/2);
  rotate(angle);
  fill(200);
  ellipse(0, 0, width, height);
  strokeWeight(4);
  line(-width/2, 0, width/2, 0);
  stroke(0);
  line(0, -height/2, 0, height/2);
  angle += 0.1;
}
