'use strict';

function highlight(table) {
  const tbody = table.querySelector('tbody');
  const trs = tbody.querySelectorAll('tr');
  const age = 1;
  const gender = 2;
  const status = 3;
  const minAge = 18;

  trs.forEach(tr => {
    // массив td
    const tds = tr.querySelectorAll('td');
    // td столбца 'Status'
    const columnStatus = tds[status];
    // td столбца 'Gender'
    const columnGender = tds[gender];
    // td столбца 'Age'
    const columnAge = tds[age];

    // если у td столбца 'Status' есть атрибут 'data-available'
    if (columnStatus.hasAttribute('data-available')) {
      const classNameStatus = columnStatus.getAttribute('data-available') === 'true'
        ? 'available'
        : 'unavailable';

      // tr добавить класс 'available/unavailable'
      tr.classList.add(classNameStatus);
    } else {
      // tr проставить property hidden
      tr.setAttribute('hidden', 'true');
    }


    // tr добавить класс 'male/female' в зависимости от содержимого ячекйки 'Gender'
    const classNameGender = columnGender.innerHTML === 'm'
      ? 'male'
      : 'female';
    tr.classList.add(classNameGender);


    // если значение столбца 'Age' меньше 18, - tr установить inline-стиль
    if (Number(columnAge.innerHTML) < minAge) {
      tr.setAttribute('style', 'text-decoration: line-through');
    }

  });

}

highlight(document.querySelector('.js-teachers'));
