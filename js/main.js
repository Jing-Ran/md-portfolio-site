(function() {
  /***************************************************************************
   * Back-to-top Feature
   ***************************************************************************/
  var backTopBtn = document.getElementById("back-top");
  var backTopTimer;

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -40);
      backTopTimer = window.setTimeout(backToTop, 10);
    } else {
      window.clearTimeout(backTopTimer);
    }
    return false;
  }

  function fadeInOut() {
    // scrollTop > 100px
    if (window.pageYOffset > 100) {
      backTopBtn.style.visibility = 'visible';
      backTopBtn.className = 'bt-fade-in';
    } else { // scrollTop is less than 100px
      backTopBtn.className = 'bt-fade-out';
    }
  }

  backTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    backToTop();
  });




  /***************************************************************************
   * Scroll-to Feature
   ***************************************************************************/
  var topNavMenu = document.querySelector('.nav__menu ul');
  var sideBarMenu = document.querySelector('.sidebar ul');
  var offcanvasMenu = document.querySelector('.off-canvas-menu');
  //TODO: add off-canvas nav menu btns


  function scrollTo(section) {
    var currentPos = section.getBoundingClientRect().top;
    var scrollByY = Math.abs(currentPos) / 10 >= 1 ? Math.abs(currentPos) / 10 : 1;
    var viewportHeight = window.innerHeight;
    var docHeight = Math.floor(
      document.documentElement.getBoundingClientRect().height);
    var timer;

    if (currentPos > 0 && currentPos - scrollByY >= 0 &&
      viewportHeight + window.pageYOffset < docHeight) {
      console.log('if');
      window.scrollBy(0, scrollByY);
      timer = window.setTimeout(function () {
        scrollTo(section);
      }, 10);
    } else if (currentPos < 0 && currentPos + scrollByY <= 0) {
      console.log('else if');
      window.scrollBy(0, -scrollByY);
      timer = window.setTimeout(function () {
        scrollTo(section);
      }, 10);
    } else {
      console.log('else');
      window.clearTimeout(timer);
    }
  }

  topNavMenu.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.tagName === 'A') {
      var targetSec = document.querySelector(e.target.getAttribute('href'));
      scrollTo(targetSec);
    }
  });

  offcanvasMenu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      var targetSec = document.querySelector(e.target.getAttribute('href'));
      scrollTo(targetSec);
    }
    if (e.target.textContent === 'projects') {
      document.querySelector('.off-canvas-submenu').classList.toggle('off-canvas-submenu--expand');
    }
  });

  sideBarMenu.addEventListener('click', function (e) {
    var targetSec;
    e.preventDefault();
    if (e.target.tagName === 'A') {
      targetSec = document.querySelector(e.target.getAttribute('href'));
    } else if (e.target.tagName === 'SPAN') {
      targetSec =
        document.querySelector(e.target.parentNode.getAttribute('href'));
    } else {
      return false;
    }
    scrollTo(targetSec);
  });



  /***************************************************************************
   * Sidebar & Top nav bar
   ***************************************************************************/
  var navBar = document.querySelector('.nav');
  var sidebar = document.querySelector('.sidebar');
  var lastPos = window.pageYOffset;

  // for large screen: > 768px
  function showOrHideNav() {
    if (window.pageYOffset > 100) {
      navBar.classList.add('nav--hide');
      sidebar.classList.remove('sidebar--hide');
    } else {
      navBar.classList.remove('nav--hide');
      sidebar.classList.add('sidebar--hide');
    }
  }

  // for smaller screen: <= 768px
  function showOrHideNavOnScroll(currentP) {
    console.log('last ' + lastPos);
    if (lastPos <= currentP) {
      console.log('hide nav');
      navBar.classList.add('nav--hide');
    } else {
      console.log('show nav');
      navBar.classList.remove('nav--hide');
    }
    lastPos = currentP;
    console.log('new last ' + lastPos);
  }



  window.addEventListener('scroll', function(e) {
    e.preventDefault();
    fadeInOut();
    showOrHideNav();
    if (window.innerWidth <= 786) {
      showOrHideNavOnScroll(window.pageYOffset);
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    showOrHideNav();
    fadeInOut();
  });

})();
