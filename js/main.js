(function() {
  'use strict';

  let backTopBtn = document.getElementById('back-top');
  let topNavMenu = document.querySelector('.nav__menu ul');
  let sidebarMenu = document.querySelector('.sidebar ul');
  let allSidebarLis = sidebarMenu.querySelectorAll('li');
  let offCanvasMenu = document.querySelector('.off-canvas-menu');
  let navBar = document.querySelector('.nav');
  let sidebar = document.querySelector('.sidebar');
  let lastPos = window.pageYOffset;
  let backTopTimer;

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
    const CURRENT_POS = section.getBoundingClientRect().top;
    const SCROLL_BY_Y = Math.abs(CURRENT_POS) / 10 >= 1 ?
      Math.abs(CURRENT_POS) / 10 : 1;
    const VIEWPORT_HEIGHT = window.innerHeight;
    const DOC_HEIGHT = Math.floor(
      document.documentElement.getBoundingClientRect().height);
    // const CURRENT_SIDEBAR_A = sidebarMenu.querySelector('a[href="#' + section.getAttribute('id') + '"]');
    const CURRENT_SIDEBAR_A = sidebarMenu.querySelector(`a[href="#${section}.getAttribute('id')"]`);

    let timer;

    if (CURRENT_POS > 0 && CURRENT_POS - SCROLL_BY_Y >= 0 &&
      VIEWPORT_HEIGHT + window.pageYOffset < DOC_HEIGHT) {
      window.scrollBy(0, SCROLL_BY_Y);
      timer = window.setTimeout(function () {
        scrollTo(section);
      }, 10);
    } else if (CURRENT_POS < 0 && CURRENT_POS + SCROLL_BY_Y <= 0) {
      window.scrollBy(0, -SCROLL_BY_Y);
      timer = window.setTimeout(function () {
        scrollTo(section);
      }, 10);
    } else {
      window.clearTimeout(timer);
    }

    toggleCurrentClass(CURRENT_SIDEBAR_A.parentNode);
  }

  // Toggle sidebar__current class for sidebar to indicate current section
  function toggleCurrentClass(currentLi) {
    // console.log('toggle');
    for (let i = 0; i < allSidebarLis.length; i++) {
      allSidebarLis[i].classList.remove('sidebar__current');
    }
    currentLi.classList.add('sidebar__current');
  }

  function topPositionOfSections() {
    const ALL_SECS = document.querySelectorAll('.section');
    let topPosArr = [];

    for (let i = 0; i < ALL_SECS.length; i++) {
      topPosArr.push(ALL_SECS[i].offsetTop);
    }
    return topPosArr;
  }

  function changeCurrentActiveLi() {
    const POS_ARR = topPositionOfSections();
    const CURRENT_POS = window.pageYOffset;

    for (let i = 0; i < POS_ARR.length; i++) {
      if (i < POS_ARR.length - 1 && CURRENT_POS >= POS_ARR[i] - 1 && CURRENT_POS < posArr[i + 1] - 1) { // not the last sec, & in between target sec & the
        // next sec
        toggleCurrentClass(allSidebarLis[i]);
        return;
      } else if (i === POS_ARR.length - 1) {// the last sec
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

  backTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    backToTop();
  });

  // Add scrollTo listener to topNavMenu
  topNavMenu.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'A') {
      const TARGET_SEC = document.querySelector(e.target.getAttribute('href'));
      scrollTo(TARGET_SEC);
      toggleCurrentClass(sidebarMenu.querySelector(`[href="#${TARGET_SEC}.id"]`).parentNode);
    }
  });

  // Add scrollTo listener to offCanvasMenu
  offCanvasMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      scrollTo(document.querySelector(e.target.getAttribute('href')));
    }
    if (e.target.textContent === 'projects') {
      document.querySelector('.off-canvas-submenu').classList.toggle('off-canvas-submenu--expand');
    }
  });

  // Add scrollTo listener to sidebarMenu
  sidebarMenu.addEventListener('click', (e) => {
    let targetSec;
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

  window.addEventListener('scroll', (e) => {
    e.preventDefault();
    fadeInOut();
    showOrHideNav();
    if (window.innerWidth <= 786) {
      showOrHideNavOnScroll(window.pageYOffset);
    }
    changeCurrentActiveLi();
  });

  document.addEventListener('DOMContentLoaded', () => {
    fadeInOut();
    showOrHideNav();
  });

  window.addEventListener('load', () => {
    changeCurrentActiveLi();
  });

})();
