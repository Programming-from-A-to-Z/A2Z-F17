/**
 * Loading Tabular Data
 * by Daniel Shiffman.
 *
 * This example demonstrates how to use loadTable()
 * to retrieve data from a CSV file and make objects
 * from that data.
 *
 * Here is what the CSV looks like:
 *
 x,y,diameter,name
 160,103,43.19838,Happy
 372,137,52.42526,Sad
 273,235,61.14072,Joyous
 121,179,44.758068,Melancholy
 */

// An Array of Bubble objects
let bubbles;
// A Table object
let table;

function setup() {
  noCanvas();
  loadTable("data.csv", "header", gotData);
}


function gotData(table) {

  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  bubbles = [];

  // You can access iterate over all the rows in a table
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    // You can access the fields via their column name (or index)
    let x = row.get("x");
    let y = row.get("y");
    let d = row.get("diameter");
    let n = row.get("name");
    let div = createDiv(n);
    div.position(x,y);
    div.style('padding','20px');
    div.style('background-color','#CCC');
  }
}
