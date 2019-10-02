'use strict';

// Декоратор debounce
let fn = debounce(alert, 1000);

fn(1); // выполняется немедленно
fn(2); // проигнорирован

setTimeout(() => fn(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout(() => fn(4), 1100); // выполняется
setTimeout(() => fn(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)

function debounce(func, timeout) {
  // задержка запущена?
  let timeoutStarted = false;

  function wrapper() {
    // если задержка запущена, то ничего не делать
    if (timeoutStarted) {
      return;
    }

    // запустить задержку
    timeoutStarted = true;

    // обернутая функция
    let result = func.apply(this, arguments);

    // остановить задержку
    setTimeout(() => {
      timeoutStarted = false;
    }, timeout);

    return result;
  }

  return wrapper;
}
