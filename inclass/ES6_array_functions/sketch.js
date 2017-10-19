// let values = [8, 7, 15, -3];


// for (let i = 0; i < values.length; i++) {
//   values[i] = values[i] / 2;
// }

// values = values.map(x => x / 2);

// console.log(values);

// let sum = 0;
// for (let i = 0; i < values.length; i++) {
//   sum += values[i];
// }
let values = [8, 7, 15, -3];

let sum = values.reduce((acc, x, i) => {
  return acc + x;
}, 0);
console.log(sum);
