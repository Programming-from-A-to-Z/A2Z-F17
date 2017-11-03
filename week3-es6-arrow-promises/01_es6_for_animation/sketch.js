// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z

function setup() {
  noCanvas();

  // Select and animate three DOM elements
  const one = select('#apple');
  animate(one, 100);

  const two = select('#pear');
  animate(two, 200);

  // This one only starts animating when you click on it!
  var click = select('#click');
  click.mousePressed(() => {
    const three = select('#orange');
    animate(three, 300);
  });
}

// A closure for animating
function animate(elt, wait) {
  // count and elt are local to this function but live on since
  // increment continues to be called via setInterval
  let count = 0;
  // Increment every "wait" milliseconds
  setInterval(() => {
    count = (count + 1);
    elt.html(count);
  }, wait);
}
