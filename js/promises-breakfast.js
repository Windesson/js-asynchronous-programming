
var order = false;

const breakfastPromise = new Promise( (resolve, reject) => {
  setTimeout( () => { 
      if(order){
          resolve('You order is ready');
      } else{
          reject("oops.. system could not process request.")
      }
    }, 3000);
});

console.log(breakfastPromise);
breakfastPromise.then( val => console.log(val)).catch(error => console.log(error));
