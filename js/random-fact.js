(function () {
  'use strict';

  var randomRactContent = document.querySelector('.random-fact__content');
  var factRefreshBtn = document.querySelector('.random-fact__refresh-btn');

  function getRandomFact() {
    var randomNum = Math.floor(Math.random() * 200);
    // var url = 'http://numbersapi.com/' + randomNum;
    var url = 'https://numbersapi.p.mashape.com/' + randomNum;
    var xhr = new XMLHttpRequest();
    var key = 'cCRn3ndWPPmshXp3hZ6finUK92HIp10pB2sjsne4SUvAkUkoCz';

    xhr.onload = function () {
      if (xhr.status === 200) {
        randomRactContent.innerHTML = xhr.response;
      }
    };

    xhr.open('GET', url);
    xhr.setRequestHeader('X-Mashape-Authorization', key);
    xhr.send();
  }

  window.addEventListener('load', getRandomFact);
  factRefreshBtn.addEventListener('click', getRandomFact);
})();