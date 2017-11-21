// Thanks to Shawn Van Every tutorial!

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


// Weird, we can also write node like code here!
const scanner = require('node-wifi-scanner');

scanner.scan((err, networks) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(networks);
  for (network of networks) {
    createDiv(network.ssid + ':' + network.rssi);
  }
});


function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(0);
  stroke(255);
  line(frameCount % width, 0, frameCount % width, height);
}
