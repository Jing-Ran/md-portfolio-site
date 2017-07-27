(function () {
  // Add to cookie feature to remember return visitor
  'use strict';

  var allCookies = document.cookie;
  var welcomeMsg = document.querySelector('h1.welcome-msg');
  var firstTimeVisit = false;

  function isFirstTime() {
    return allCookies.indexOf('visited=true') === -1;
  }

  function setCookie() {
    // Cookie will expire in 30 days after the first visit
    var oneMonth = 60 * 60 * 24 * 30;
    document.cookie = 'visited=true;max-age=' + oneMonth;
  }

  function populateWelcomeMsg() {
    if (isFirstTime()) {
      welcomeMsg.innerHTML = 'Welcome to my site';
      setCookie();
    }
    else welcomeMsg.innerHTML = 'Hi there, welcome back';
  }

  populateWelcomeMsg();
})();