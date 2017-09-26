// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z

// API documentation
// http://developer.nytimes.com
// Weirdly it seems to work with 'sample-key'
// But you should probably get your own

// Input from user
let input;

function setup() {
  noCanvas();

  // Grab the input and button from HTML
  input = select('#search');
  let button = select('#submit');
  // Attach a callback to button press
  button.mousePressed(search);
}

// Run the API call
function search() {
  let term = input.value();

  // URL for querying the times
  let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?'
          + 'api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102'
          + '&q=' + term;

  // Query the URL, set a callback
  // 'jsonp' is needed for security
  loadJSON(url, gotData);
}

// Request is completed
function gotData(data) {
  console.log(data);
  // Go through and show some results
  docs = data.response.docs;

  // Iterate through the articles in "docs"
  for (let i = 0; i < docs.length; i++) {

    // Make each headline a link to the article
    let headline = createElement('h3', '');
    let link = createA(docs[i].web_url, docs[i].headline.main);
    link.parent(headline);
    headline.parent('results');

    // Make a <p> for "lead paragraph"
    let par = createP(docs[i].snippet);
    par.parent('results');
  }
}
