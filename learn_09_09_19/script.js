'use strict';

// Задание 1
let arr = [1, 2, 3, 4, 5, 6, 7];

console.log('arr.filter(inBetween(3, 6)) = ', arr.filter(inBetween(3, 6))); // 3,4,5,6
console.log('arr.filter(inArray([1, 2, 10])) = ', arr.filter(inArray([1, 2, 10]))); // 1,2

function inBetween(min, max) {
  return function (x) {
    return x >= min && x <= max;
  }
}

function inArray(arr) {
  return function (x) {
    return arr.includes(x);
  }
}

// Задание 2
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

console.log("users.sort(byField('name')) = ", users.sort(byField('name')));
// console.log("users.sort(byField('age')) = ", users.sort(byField('age')));

function byField(sortField) {
  return function (a, b) {
    return a[sortField] > b[sortField] ? 1 : -1;
  }
}

// Задание 3
// function makeArmy() {
//   let shooters = [];

//   debugger
//   let i = 0;
//   while (i < 10) {
//     let shooter = function () { // функция shooter
//       alert(i); // должна выводить порядковый номер
//     };
//     shooters.push(shooter);
//     i++;
//   }

//   return shooters;
// }

function makeArmy() {
  let shooters = [];
  let i = 0;
  
  for (let i=0; i<10; i++) {

    let shooter = function () { // функция shooter
      alert(i); // должна выводить порядковый номер
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // у 0-го стрелка будет номер 10
army[5](); // и у 5-го стрелка тоже будет номер 10
