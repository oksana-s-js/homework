'use strict';

const style = `
  position: absolute;
  top: -999px;
  left: 0px;
  right: auto;
  bottom: auto;
  border: 0px;
  box-sizing: content-box;
  word-wrap: break-word;
  overflow: hidden;
  height: 0px !important;
  min-height: 0px !important;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0px;
  text-transform: none;
  word-spacing: 0px;
  text-indent: 0px;
  line-height: 20px;
  width: 191px;
`;

function styleToObject(str) {
  let obj = {};
  // массив стилей
  const arrayOfStyles = str.split(';');

  for (let i = 0; i < arrayOfStyles.length; i++) {
    // очистить элемент массива от пробелов и символов конца строки
    const element = arrayOfStyles[i].trim();

    if (element !== '') {
      const arr = element.split(':');
      // ключ нового объекта стилей
      const key = arr[0].trim();

      // свойство объекта с ключом
      obj[key] = arr[1].trim();
    }
  }

  return obj;
}

const objectOfStyles = styleToObject(style);
console.log('Style object = ', objectOfStyles);
