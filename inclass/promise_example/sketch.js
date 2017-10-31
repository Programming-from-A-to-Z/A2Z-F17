function setup() {
  noCanvas();

  delay(1000)
    .then(function() {
      createP('First first thing');
      return delay(1000);
    })
    .then(function() {
      createP('second second one');
      return delay(1000);
    })
    .then(function() {
      createP('third third one');
    })
    .catch(function() {
      console.log("Something went wrong");
    });


  // setTimeout(function() {
  //   createP('First thing');
  //   setTimeout(function() {
  //     createP('Second one');
  //     setTimeout(function() {
  //       createP('The third');
  //     }, 1000)
  //   }, 1000);
  // }, 1000);
}


function delay(wait) {
  return new Promise(
    function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, wait);
    }
  );
}


var hello = () => {
  console.log('All finished');
}

allDone.then(hello);
.catch(() => {
  console.log('error!')
});
