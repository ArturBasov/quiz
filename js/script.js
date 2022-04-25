"use strict";

import { words1 } from "./topics/topic1.js";
import { words2 } from "./topics/topic2.js";

let arrRus1;
let arrEng1;
let arrRus2;
let arrEng2;

const container = document.querySelector(".text-center");
let ranomWord;
let form;
let inputText;
let resetButton;

let inputVar = "";
let inputEng = "";
let someIndex = 0;
let incorrect = {};

let current;

const start = () => {
  container.innerHTML = ``;
  container.innerHTML = `<h3>Выберете тему</h3>
  <br>
  <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Здания и транспорт</a>
  <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Школа</a>`;
  const btn = document.querySelectorAll(".btn-primary");
  btn[0].addEventListener("click", (e) => {
    e.preventDefault();
    current = new Date();
    arrRus1 = JSON.parse(JSON.stringify(Object.keys(words1)));
    arrEng1 = JSON.parse(JSON.stringify(Object.values(words1)));

    typeWord(arrRus1, arrEng1);
  });
  btn[1].addEventListener("click", (e) => {
    e.preventDefault();
    current = new Date();
    arrRus2 = JSON.parse(JSON.stringify(Object.keys(words2)));
    arrEng2 = JSON.parse(JSON.stringify(Object.values(words2)));
    typeWord(arrRus2, arrEng2);
  });
};

start();

const typeWord = (rusArr, engArr) => {
  container.innerHTML = "";
  container.innerHTML += `<form class="input_form">
        <span>Введите перевод слова</span>
        <br />
        <br />
        <h1 class="word"></h1>
        <br />
        <input class="input" type="text" placeholder="Перевод..." />
        <button class="btn-success">Ok</button>
      </form>`;

  ranomWord = document.querySelector(".word");
  form = document.querySelector(".input_form");
  inputText = form.querySelector(".input");

  if (rusArr.length == 0) {
    result(rusArr);
    return;
  }
  someIndex = Math.floor(Math.random() * rusArr.length);
  ranomWord.textContent = `${rusArr[someIndex]}`;
  console.log(`Type word ${rusArr[someIndex]}`);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    inputVar = inputText.value;
    inputEng = engArr[someIndex];
    console.log(inputEng);
    console.log(`Введенное значение: ${inputVar}`);
    console.log(`Правильное значение: ${inputEng}`);

    if (typeof inputEng == "object") {
      let arrElement = false;
      for (let element of inputEng) {
        if (inputVar == element) {
          arrElement = true;
          break;
        }
      }
      if (!arrElement) {
        incorrect[inputEng] = inputVar;
      }
    } else {
      if (inputEng !== inputVar) {
        incorrect[inputEng] = inputVar;
      }
    }

    rusArr.splice(someIndex, 1);
    engArr.splice(someIndex, 1);

    form.reset();
    typeWord(rusArr, engArr);
  });
};

const result = () => {
  const t = Math.round((new Date() - current) / 1000);
  container.style = "max-width: 350px";
  container.innerHTML = "";
  container.innerHTML = `<h1>Ошибки</h1>
  <h5>Затраченное время: ${t} сек</h5>
  <ul class="list">
  <li class="item">
  </li>
  </ul>`;

  const inner = document.querySelectorAll(".list");
  inner[0].innerHTML = "";
  if (Object.keys(incorrect) == 0) {
    container.style = "max-width: 1000px";
    inner[0].innerHTML += `<h3>Поздравляем, вы не сделали ни одной ошибки!</h3>`;
  } else {
    for (let e in incorrect) {
      inner[0].innerHTML += `<li class="item">Правильно: ${e}, вы написали - ${incorrect[e]}</li>`;
    }
  }
  inner[0].innerHTML += `<br><button class="resetbtn btn-success">Начать заново</button>`;
  resetButton = document.querySelector(".resetbtn");
  resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    start();
  });
};
