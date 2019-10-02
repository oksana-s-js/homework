'use strict';

// Задерживающий декоратор
function f(x, y, z) {
  console.log('x = ', x, 'y = ', y, 'z = ', z);
}

// создаём обёртки
let f1000 = delay(f, 1000);
let f1500 = delay(f, 5000);

f1000('test', 'test2', 'test3'); // показывает "test" после 1000 мс
f1500('test4', 'test5', 'test6'); // показывает "test" после 1500 мс

function delay(func, timeout) {

  function wrapper() {
    setTimeout(() => {
      return func.apply(this, arguments);
    }, timeout);
  }

  return wrapper;
}
