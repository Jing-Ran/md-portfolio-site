(function () {
  'use strict';

  let randomRactContent = document.querySelector('.random-fact__content');
  const FACT_REFRESH_BTN = document.querySelector('.random-fact__refresh-btn');

  function getRandomFact() {
    const RANDOM_NUM = Math.floor(Math.random() * 200);
    const URL = 'https://numbersapi.p.mashape.com/' + RANDOM_NUM;
    const KEY = 'cCRn3ndWPPmshXp3hZ6finUK92HIp10pB2sjsne4SUvAkUkoCz';
    let xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.status === 200) {
        randomRactContent.innerHTML = xhr.response;
      }
    };

    xhr.open('GET', URL);
    xhr.setRequestHeader('X-Mashape-Authorization', KEY);
    xhr.send();
  }

  window.addEventListener('load', getRandomFact);
  FACT_REFRESH_BTN.addEventListener('click', getRandomFact);
})();