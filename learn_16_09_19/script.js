'use strict';

// Создайте калькулятор
let calculator = {
  read() {
    this.num1 = +prompt('Введите первое число', 0);
    this.num2 = +prompt('Введите второе число', 0);
  },

  sum() {
    return this.num1 + this.num2;
  },

  mul() {
    return this.num1 * this.num2;
  }
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());



// Цепь вызовов
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function () { // показывает текущую ступеньку
    alert(this.step);
    return this;
  }
};

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1

ladder.up().up().down().showStep(); // 1



// Деструктурирующее присваивание
let user = {
  name: "John",
  years: 30
};

let {name, years: age, isAdmin = false} = user;

alert(name); // John
alert(age); // 30
alert(isAdmin); // false



// Максимальная зарплата
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

console.log('employee with the maximum salary - ', topSalary(salaries));

function topSalary(obj) {
  let maxSalary = 0;
  let maxSalaryName = null;

  for (let [name, salary] of Object.entries(obj)) {
    if (salary > maxSalary) {
      maxSalaryName = name;
      maxSalary = salary;
    }
  }

  return maxSalaryName;
}
