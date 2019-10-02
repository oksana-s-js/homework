'use strict';

// Тормозящий (throttling) декоратор
function fn2(a) {
  console.log(a)
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let fn1000 = throttle(fn2, 1000);

fn1000(1); // показывает 1
fn1000(2); // (ограничение, 1000 мс ещё нет)
fn1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано

function throttle(func, timeout) {
  let timeoutStarted = false;

  wrapper.calls = [];

  function wrapper() {
    if (timeoutStarted) {
      // сохранить аргументы не вызванных функций
      wrapper.calls.push(...arguments);

      return;
    }

    timeoutStarted = true;

    // создаём новую функцию с привязанным this
    let boundResult = func.bind(this);

    setTimeout(() => {
      timeoutStarted = false;

      if (wrapper.calls.length) {
        // вызываем функцию с привязанным this и аргументами последней не вызванной функции
        boundResult(wrapper.calls[wrapper.calls.length - 1]);
        wrapper.calls = [];
      }
    }, timeout);

    // возвращаем функцию с привязанным this и текущими аргументами
    return boundResult(...arguments);
  }

  return wrapper;
}
