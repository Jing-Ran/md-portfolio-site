(function () {
  'use strict';

  var randomRactContent = document.querySelector('.random-fact__content');
  var factRefreshBtn = document.querySelector('.random-fact__refresh-btn');

  function getRandomFact() {
    var randomNum = Math.floor(Math.random() * 200);
    // var url = 'http://numbersapi.com/' + randomNum;
    var url = 'https://numbersapi.p.mashape.com/' + randomNum;
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if (xhr.status === 200) {
        randomRactContent.innerHTML = xhr.response;
      }
    };

    xhr.open('GET', url);
    xhr.send();
  }

  window.addEventListener('load', getRandomFact);
  factRefreshBtn.addEventListener('click', getRandomFact);
})();