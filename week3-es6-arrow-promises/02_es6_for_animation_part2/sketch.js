// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z

function setup() {
  noCanvas();

  // Now make 500 of animating elements
  // Every 10 milliseconds
  for (let i = 0; i < 500; i++) {
    setTimeout(() => {
      // Make the element and animate it!
      const span = createSpan('0');
      animate(span);

      // This is silly but putting a space between them for spacing
      const space = createSpan(' ');
      // Just some styling
      space.parent('padded');
      span.class('box');
      span.parent('padded');
    }, i * 10);
  }
}


// A closure for animating
function animate(elt) {
  // count and elt are local to this function but live on since
  // increment continues to be called via setInterval
  let count = 0;

  // Increment every 100 milliseconds
  // Just update the contents of the DOM element
  setInterval(() => {
    count = (count + 1) % 100;
    elt.html(count);
  }, 100);
}
