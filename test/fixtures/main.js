/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 11/11/2017.
 */

function doubleAfter2Seconds(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (x == 21)
        reject('no puede ser 21');
      resolve(x * 2);
    }, 3000);
  });
}

async function addAsync(x) {
  // const a = await doubleAfter2Seconds(10);
  // const b = await doubleAfter2Seconds(20);
  // const c = await doubleAfter2Seconds(30);

  // const a = await doubleAfter2Seconds(10), b = await doubleAfter2Seconds(20), c = await doubleAfter2Seconds(30);

  // const [a, b, c] = [
  //   await doubleAfter2Seconds(10),
  //   await doubleAfter2Seconds(20),
  //   await doubleAfter2Seconds(30),
  // ];

  let a = doubleAfter2Seconds(10);
  let b = doubleAfter2Seconds(20);
  let c = doubleAfter2Seconds(30);

  [a, b, c] = [await a, await b, await c];

  if (x === 0) throw 'error abcd';

  return x + a + b + c;
}

let d1 = Date.now();
console.log(d1);
addAsync(10).then((sum) => {
  console.log(sum);

  let d2 = Date.now();
  console.log(d2);
  console.log(d2 - d1);
}).catch(err => console.warn(err));


