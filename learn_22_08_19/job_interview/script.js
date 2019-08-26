'use strict';

// исходная строка
const sourceStr = 'aaassdbbsaa';


//** вариант решения с подсчетом символов до первого отличающегося */
const groupedArr = groupBeforeFirstDifferent(sourceStr);

// результирующая строка
const resultStr = groupedArr.join('');
console.log('resultStr = ', resultStr);


// возвращает массив вида: [3, "a", 2, "s", 1, "d", 2, "b", 1, "s", 2, "a"]
function groupBeforeFirstDifferent(str) {
  const arr = str.split('');
  let result = [];
  let counter = 1;

  for (let i = 1; i < arr.length+1; i++) {
    const curr = arr[i];
    const prev = arr[i-1];
    
    if (curr === prev) {
      counter++;
    } else {
      result.push(counter);
      result.push(prev);
      counter = 1;
    }
  }

  return result;
}





//** вариант решения с подсчетом всех идентичных символов в строке */
const groupedObj = groupByIdentical(sourceStr);

// результирующая строка
let resultStr2 = '';
Object.keys(groupedObj).map(function (key) {
  const val = groupedObj[key];

  return resultStr2 += key + val;
});
console.log('resultStr2 = ', resultStr2);


// возвращает объект, где ключи - символы из строки,
// а значения - количество этих символов в строке
function groupByIdentical(str) {

  return str
    .split('')
    .reduce(function (accum, curv) {

      accum[curv] = accum[curv]
        ? Number(accum[curv]) + 1
        : 1;

      return accum;
    }, {});
}
