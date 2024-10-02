/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 12/11/2017.
 */

function* iteratorGenerator(arr = []) {
  for (let obj of arr) {
    yield obj;
  }

  //No pincha con programacion funcional
  // arr.map(function (obj) {
  //   yield obj;
  // });
}

let iterator = iteratorGenerator(['apple', 'orange', 'watermelon']);

let currentItem = iterator.next();

while (!currentItem.done) {
  console.log(currentItem.value);
  currentItem = iterator.next();
}
