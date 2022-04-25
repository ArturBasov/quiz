"use strict";

import { words1 } from "./topics/topic1.js";
import { words2 } from "./topics/topic2.js";
import { words3 } from "./topics/topic3.js";
import { words4 } from "./topics/topic4.js";

let arrRus;
let arrEng;

const container = document.querySelector(".text-center");
let ranomWord;
let form;
let inputText;
let resetButton;

let inputVar = "";
let inputEng = "";
let someIndex = 0;
let incorrect = {};
let countQ;

let current;

const start = () => {
  container.style = "max-width: 500px";
  countQ = -1;

  container.innerHTML = `<h3>Выберите тему</h3>
  <br>
  <ul>
    <li><a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Здания и транспорт</a></li>
    <br>
    <li><a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Школа</a></li>
    <br>
    <li><a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Профессии</a></li>
    <br>
    <li><a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Хобби</a></li>
    <br>
  </ul>
  `;
  const btn = document.querySelectorAll(".btn-primary");

  btn[0].addEventListener("click", (e) => {
    e.preventDefault();
    preStart(words1);
  });

  btn[1].addEventListener("click", (e) => {
    e.preventDefault();
    preStart(words2);
  });

  btn[2].addEventListener("click", (e) => {
    e.preventDefault();
    preStart(words3);
  });

  btn[3].addEventListener("click", (e) => {
    e.preventDefault();
    preStart(words4);
  });
};

const preStart = (arr) => {
  current = new Date();
  arrRus = JSON.parse(JSON.stringify(Object.keys(arr)));
  arrEng = JSON.parse(JSON.stringify(Object.values(arr)));
  const amount = arrRus.length;
  incorrect = {};
  typeWord(arrRus, arrEng, amount);
};

start();

const typeWord = (rusArr, engArr, amount) => {
  countQ++;
  container.style = "max-width: 400px";
  container.innerHTML = "";
  container.innerHTML += `<form class="input_form">
        <span>Введите перевод слова</span>
        <br />
        <br />
        <h1 class="word"></h1>
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        style="width: ${((countQ + 1) * 100) / amount}%"
        aria-valuenow="${countQ + 1}"
        aria-valuemin="0"
        aria-valuemax="${amount}"
      >
        ${countQ + 1}
      </div>
    </div>

        <br />
        <input class="input" type="text" placeholder="Перевод..." />
        <button class="btn-success">Ok</button>
      </form>`;

  ranomWord = document.querySelector(".word");
  form = document.querySelector(".input_form");
  inputText = form.querySelector(".input");

  if (rusArr.length == 0) {
    result(countQ);
    return;
  }
  someIndex = Math.floor(Math.random() * rusArr.length);

  ranomWord.textContent = `${rusArr[someIndex].replace(/_/gi, " ")}`;

  inputText.focus();
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    inputVar = inputText.value.trim().toLowerCase();
    inputEng = engArr[someIndex];

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
    typeWord(rusArr, engArr, amount);
  });
};

const result = (count) => {
  const t = Math.round((new Date() - current) / 1000);

  const correctAns = count - Object.keys(incorrect).length;
  container.style = "max-width: 600px";
  container.innerHTML = "";
  container.innerHTML = `<h1>Ошибки</h1>
  <h5>Затраченное время: <strong>${t}</strong> сек</h5>
  <h6><strong>${correctAns}</strong> правильных ответов,
  <strong>${Object.keys(incorrect).length}</strong> не правильных</h6>
  <h6>Ваш балл: <strong>${Math.round(
    (correctAns * 10) / count
  )}</strong> из <strong>10</strong></h6>
  <ul class="list">
  <li class="item">
  </li>
  </ul>`;
  container.innerHTML += `<button class="resetbtn btn-success">Начать заново</button><br><br>`;
  container.innerHTML += `<table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Правильный ответ</th>
            <th scope="col">Вы ответили</th>
          </tr>
        </thead>
        <tbody id="table-body">
        </tbody>
      </table>`;

  const tbody = document.querySelector("#table-body");
  let counter = 1;

  const inner = document.querySelectorAll(".list");
  inner[0].innerHTML = "";
  if (Object.keys(incorrect) == 0) {
    container.style = "max-width: 1000px";
    inner[0].innerHTML += `<h3>Поздравляем, вы не сделали ни одной ошибки!</h3>`;
  } else {
    for (let e in incorrect) {
      tbody.innerHTML += `<tr>
            <th scope="row">${counter}</th>
            <td>${e}</td>
            <td>${incorrect[e]}</td>
          </tr>`;
      counter++;
    }
  }
  resetButton = document.querySelector(".resetbtn");
  resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    start();
  });
};
