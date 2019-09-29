'use strict';

// Декоратор-шпион
function work(a, b) {
  alert(a + b); // произвольная функция или метод
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert('call: ' + args.join()); // "call:1,2", "call:4,5"
}

function spy(func) {
  // массив массивов аргументов, с которыми была вызвана обернутая функция
  wrapper.calls = [];

  function wrapper() {
    wrapper.calls.push([...arguments]);

    return func.apply(this, arguments);
  }

  return wrapper;
}



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
