(function () {
  // Add to cookie feature to remember return visitor
  'use strict';

  let allCookies = document.cookie;
  let welcomeMsg = document.querySelector('h1.welcome-msg');

  function isFirstTime() {
    return allCookies.indexOf('visited=true') === -1;
  }

  function setCookie() {
    // Cookie will expire in 30 days after the first visit
    const ONE_MONTH = 60 * 60 * 24 * 30;
    document.cookie = 'visited=true;max-age=' + ONE_MONTH;
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