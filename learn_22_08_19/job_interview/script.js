'use strict';

// исходная строка
const sourceStr = 'aaassdbbsaa';


//** вариант решения с подсчетом символов до первого отличающегося */

// результирующая строка
const resultStr = groupBeforeFirstDifferent(sourceStr);
console.log('resultStr = ', resultStr);

// возвращает строку вида: "3a2s1d2b1s2a"
function groupBeforeFirstDifferent(str) {
  let result = '';
  let counter = 1;

  for (let i = 1; i < str.length + 1; i++) {
    const curr = str[i];
    const prev = str[i - 1];

    if (curr === prev) {
      counter++;
    } else {
      result += counter;
      result += prev;
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
