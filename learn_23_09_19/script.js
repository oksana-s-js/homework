'use strict';

// Работа с прототипами
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert(rabbit.jumps); // ? (1) = true

delete rabbit.jumps;

alert(rabbit.jumps); // ? (2) = null

delete animal.jumps;

alert(rabbit.jumps); // ? (3) = undefined



// Алгоритм поиска
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};

// pockets → bed → table → head
table.__proto__ = head;
bed.__proto__ = table;
pockets.__proto__ = bed;



// Куда будет произведена запись?
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
// Какой объект получит свойство full при вызове rabbit.eat(): animal или rabbit?
// Ответ: rabbit



// Почему наедаются оба хомяка?
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  stomach: [],
  __proto__: hamster
};

let lazy = {
  stomach: [],
  __proto__: hamster
};

// Этот хомяк нашёл еду
speedy.eat("apple");
alert(speedy.stomach); // apple

// У этого хомяка тоже есть еда. Почему? Исправьте
alert(lazy.stomach); // apple



// Изменяем "prototype"
function Rabbit() { }
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert(rabbit.eats); // true

// 1
function Rabbit() { }
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype = {};

alert(rabbit.eats); // ? = true

// 2
function Rabbit() { }
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype.eats = false;

alert(rabbit.eats); // ? false

// 3
function Rabbit() { }
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

delete rabbit.eats;

alert(rabbit.eats); // ? = true

// 4
function Rabbit() { }
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

delete Rabbit.prototype.eats;

alert(rabbit.eats); // ? undefined



// Создайте новый объект с помощью уже существующего
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert(user2.name); // Pete (сработало!)

function User(name) {
  this.name = name;
}
User.prototype = {}; // (*)

let user = new User('John');
let user2 = new user.constructor('Pete');

alert(user.name); // John
alert(user2.name); // undefined



// Добавить функциям метод "f.defer(ms)"
function f() {
  alert("Hello!");
}

Function.prototype.defer = function (ms) {
  setTimeout(this, ms);
}

f.defer(1000); // выведет "Hello!" через 1 секунду



// Добавьте функциям декорирующий метод "defer()"
function f(a, b) {
  alert(a + b);
}

Function.prototype.defer = function (ms) {
  const fn = this;

  let result = function (...args) {
    setTimeout(fn.apply(this, args), ms);
  }

  return result;
}

f.defer(1000)(1, 2); // выведет 3 через 1 секунду.



// Добавьте toString в словарь
let dictionary = Object.create(null, {
  toString: {
    value() {
      return Object.keys(this).join();
    }
  }
});

// добавляем немного данных
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ

// только apple и __proto__ выведены в цикле
for (let key in dictionary) {
  alert(key); // "apple", затем "__proto__"
}

// ваш метод toString в действии
alert(dictionary); // "apple,__proto__"
