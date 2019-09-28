'use strict';

// Сумма с помощью замыканий
console.log('sum(1)(2)  = ', sum(1)(2) ); //= 3
console.log('sum(5)(-1) = ', sum(5)(-1)); // = 4

function sum(num1) {
  return function (num2) {
    return num1 + num2;
  }
}



// Фильтрация с помощью функции
let arr = [1, 2, 3, 4, 5, 6, 7];

console.log('arr.filter(inBetween(3, 6)) = ', arr.filter(inBetween(3, 6))); // 3,4,5,6
console.log('arr.filter(inArray([1, 2, 10])) = ', arr.filter(inArray([1, 2, 10]))); // 1,2

function inBetween(min, max) {
  return function (item) {
    return item >=min && item <= max;
  }
}

function inArray(arr) {
  return function (item) {
    return arr.includes(item);
  }
}



// Сортировать по полю
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

console.log("users.sort(byField('name')) = ", users.sort(byField('name')));
console.log("users.sort(byField('age')) = ", users.sort(byField('age')));

function byField(fieldName) {
  // return function (curr, next) {
  //   return curr[fieldName] > next[fieldName] ? 1 : -1;
  // }

  return (curr, next) => curr[fieldName] > next[fieldName] ? 1 : -1;
}



// Армия функций
function makeArmy() {
  let shooters = [];

  let serialNumber = 0;
  for (; serialNumber < 10; serialNumber++) {
    // 1
    // const shooter = function (num) {
    //   return function () {
    //     console.log('serialNumber = ', num);
    //   }
    // }
    // shooters.push(shooter(serialNumber));

    // 2
    // shooters.push(
    //   (function (num) {
    //     return function () {
    //       console.log('serialNumber = ', num);
    //     };
    //   })(serialNumber)
    // );

    // 3
    shooters.push(
      ((num) => () => console.log('serialNumber = ', num))(serialNumber)
    );
  }

  return shooters;
}

let army = makeArmy();

army[0]();
army[5]();
