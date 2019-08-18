'use strict';

let a = {
  name: 'Misha',
  order: {
    price: 20
  },
};

let b = {
  name: 'Misha',
  order: {
    price: 20,
  }
};


console.log('a === b result: ', a === b);

// сравнить 2 объекта,
// свойствами которых могут быть примитивы или объекты
let deepEqual = function (a, b) {
  let dEResult = false;

  for (const key in a) {
    const aElement = a[key];
    const bElement = b[key];

    // существует в каждом объекте ключ key?
    if (a.hasOwnProperty(key) !== b.hasOwnProperty(key)) {
      dEResult = false;
    } else if (typeof aElement !== typeof bElement) { // типы свойств равны?
      dEResult = false;
    } else {
      switch (typeof aElement) {
        // если свойство - объект
        case 'object':
          if (!deepEqual(aElement, bElement)) {
            dEResult = false;
          }
          break;
        
        // если свойство - примитив
        default:
          dEResult = aElement === bElement;
          break;
      }
    }
  }

  return dEResult;
}

let deepEqualResult = deepEqual(a, b);
console.log('deepEqual result: ', deepEqualResult);
