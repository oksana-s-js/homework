'use strict';

// *********** Перемещение мяча по полю **********

// размеры мяча
let ball = document.querySelector('#ball');
let ballSize = {};
ball.addEventListener('load', function () {
  ballSize = {
    width: this.offsetWidth,
    height: this.offsetHeight
  };
});


// клик по полю
field.addEventListener('click', moveBall);

function moveBall() {
  let fieldCoords = this.getBoundingClientRect();
  let ballCoords = {
    top: event.clientY - fieldCoords.top - field.clientTop - ballSize.height / 2,
    left: event.clientX - fieldCoords.left - field.clientLeft - ballSize.width / 2
  };

  // не выходить за верхнюю границу поля
  if (ballCoords.top < 0) {
    ballCoords.top = 0;
  }

  // не выходить за левую границу поля
  if (ballCoords.left < 0) {
    ballCoords.left = 0;
  }

  // не выходить за нижнюю границу поля
  if (ballCoords.top + ballSize.height > field.clientHeight) {
    ballCoords.top = field.clientHeight - ballSize.height;
  }

  // не выходить за правую границу поля
  if (ballCoords.left + ballSize.width > field.clientWidth) {
    ballCoords.left = field.clientWidth - ballSize.width;
  }

  ball.style.left = ballCoords.left + 'px';
  ball.style.top = ballCoords.top + 'px';
}

// *********** Раскрывающееся меню **********
