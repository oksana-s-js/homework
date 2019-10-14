'use strict';

// Часики
class Clock {
  timer;
  hours = '00';
  mins = '00';
  secs = '00';

  constructor({elem}) {
    this._element = elem;
    this._init();
  }

  _init() {
    this._element.innerHTML = `
          <span class="hours">${this.hours}</span>:<span class="mins">${this.mins}</span>:<span class="secs">${this.secs}</span>
    `
  }

  _render() {
    let date = new Date();
    let hoursElem = this._element.querySelector('.hours');
    let minsElem = this._element.querySelector('.mins');
    let secsElem = this._element.querySelector('.secs');

    this.hours = date.getHours();
    if (this.hours < 10) this.hours = '0' + this.hours;
    hoursElem.innerHTML = this.hours;

    this.mins = date.getMinutes();
    if (this.mins < 10) this.mins = '0' + this.mins;
    minsElem.innerHTML = this.mins;

    this.secs = date.getSeconds();
    if (this.secs < 10) this.secs = '0' + this.secs;
    secsElem.innerHTML = this.secs;
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this._render();
    this.timer = setInterval(() => {
      this._render();
    }, 1000);
  }
}

let elem = document.querySelector('.clock');
let pageClock = new Clock({ elem: elem });
