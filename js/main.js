(function() {
  var backTopBtn = document.getElementById("back-top");
  var backTopTimer;

  var topNavMenu = document.querySelector('.nav__menu ul');
  var sidebarMenu = document.querySelector('.sidebar ul');
  var allSidebarLis = sidebarMenu.querySelectorAll('li');
  var offCanvasMenu = document.querySelector('.off-canvas-menu');

  var navBar = document.querySelector('.nav');
  var sidebar = document.querySelector('.sidebar');
  var lastPos = window.pageYOffset;

  /***************************************************************************
   * Back-to-top Feature
   ***************************************************************************/

  // back-to-top function
  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -40);
      backTopTimer = window.setTimeout(backToTop, 10);
    } else {
      window.clearTimeout(backTopTimer);
    }

    toggleCurrentClass(sidebarMenu.querySelector('li'));

    return false;
  }

  // backTop button fade in or out
  function fadeInOut() {
    // pageYOffset > 100px
    if (window.pageYOffset > 100) {
      backTopBtn.style.visibility = 'visible';
      backTopBtn.className = 'bt-fade-in';
    } else { // pageYOffset is less than 100px
      backTopBtn.className = 'bt-fade-out';
    }
  }


  /***************************************************************************
   * Scroll-to Feature
   ***************************************************************************/

  function scrollTo(section) {
    var currentSidebarA = sidebarMenu.querySelector('a[href="#' + section.getAttribute('id') + '"]');
    var currentPos = section.getBoundingClientRect().top;
    var scrollByY = Math.abs(currentPos) / 10 >= 1 ? Math.abs(currentPos) / 10 : 1;
    var viewportHeight = window.innerHeight;
    var docHeight = Math.floor(
      document.documentElement.getBoundingClientRect().height);
    var timer;

    if (currentPos > 0 && currentPos - scrollByY >= 0 &&
      viewportHeight + window.pageYOffset < docHeight) {
      window.scrollBy(0, scrollByY);
      timer = window.setTimeout(function () {
        scrollTo(section);
      }, 10);
    } else if (currentPos < 0 && currentPos + scrollByY <= 0) {
      window.scrollBy(0, -scrollByY);
      timer = window.setTimeout(function () {
        scrollTo(section);
      }, 10);
    } else {
      window.clearTimeout(timer);
    }

    toggleCurrentClass(currentSidebarA.parentNode);
  }

  function toggleCurrentClass(currentLi) {
    for (var i = 0; i < allSidebarLis.length; i++) {
      allSidebarLis[i].classList.remove('sidebar__current');
    }
    currentLi.classList.add('sidebar__current');
  }

  function topPositionOfSections() {
    var allSecs = document.querySelectorAll('.section');
    var topPosArr = [];

    for (var i = 0; i < allSecs.length; i++) {
      topPosArr.push(allSecs[i].offsetTop);
    }
    return topPosArr;
  }

  function changeCurrentActiveLi() {
    var posArr = topPositionOfSections();
    var currentPos = window.pageYOffset;

    for (var i = 0; i < posArr.length; i++) {
      if (i < posArr.length - 1 && currentPos >= posArr[i] && currentPos < posArr[i + 1]) {
        toggleCurrentClass(allSidebarLis[i]);
        return;
      } else if (i === posArr.length - 1) {
        toggleCurrentClass(allSidebarLis[i]);
      }
    }
  }





  /***************************************************************************
   * Sidebar & Top nav bar
   ***************************************************************************/

  // Show or hide top navbar
  function showOrHideNav() {
    if (window.pageYOffset > 100) {
      navBar.classList.add('nav--hide');
      sidebar.classList.remove('sidebar--hide');
    } else {
      navBar.classList.remove('nav--hide');
      sidebar.classList.add('sidebar--hide');
    }
  }

  // Only for smaller screen: <= 768px
  // When page onscroll: scroll down hide top navbar, scroll up show top navbar
  function showOrHideNavOnScroll(currentP) {
    if (lastPos <= currentP) {
      navBar.classList.add('nav--hide');
    } else {
      navBar.classList.remove('nav--hide');
    }
    lastPos = currentP;
  }


  /***************************************************************************
   * Add Event Listeners
   ***************************************************************************/

  backTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    backToTop();
  });

  // Add scrollTo listener to topNavMenu
  topNavMenu.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.tagName === 'A') {
      var targetSec = document.querySelector(e.target.getAttribute('href'));
      scrollTo(targetSec);
    }
  });

  // Add scrollTo listener to offCanvasMenu
  offCanvasMenu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      var targetSec = document.querySelector(e.target.getAttribute('href'));
      scrollTo(targetSec);
    }
    if (e.target.textContent === 'projects') {
      document.querySelector('.off-canvas-submenu').classList.toggle('off-canvas-submenu--expand');
    }
  });

  // Add scrollTo listener to sidebarMenu
  sidebarMenu.addEventListener('click', function (e) {
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

  window.addEventListener('scroll', function(e) {
    e.preventDefault();
    fadeInOut();
    showOrHideNav();
    if (window.innerWidth <= 786) {
      showOrHideNavOnScroll(window.pageYOffset);
    }
    changeCurrentActiveLi();
  });

  document.addEventListener('DOMContentLoaded', function() {
    fadeInOut();
    showOrHideNav();
  });

  window.addEventListener('load', function () {
    changeCurrentActiveLi();
  });

})();
