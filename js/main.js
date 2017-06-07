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
    // scrollTop is equal to or greater than 100px
    if (window.pageYOffset >= 100) {
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

  window.addEventListener('scroll', function(e) {
    e.preventDefault();
    fadeInOut();
  });



  /***************************************************************************
   * Scroll-to Feature
   ***************************************************************************/
  var navAbt = document.querySelector('.nav__menu [href="#about"]');
  var navPj = document.querySelector('.nav__menu [href="#projects]');
  var navSkl = document.querySelector('.nav__menu [href="#skills]');
  var navCt = document.querySelector('.nav__menu [href="#contact]');
  var navBtns = document.querySelectorAll('.nav__menu a');
  var navBtnsArr = [].slice.call(navBtns);
  var navBtnsLen = navBtns && navBtns.length || 0;
  var i;
  //TODO: add off-canvas nav menu btns
  var ocAbt = document.querySelector('.off-canvas-menu [href="#about"]');

  var abtSec = document.querySelector('#about');
  var pjSec = document.querySelector('#projects');
  var sklSec = document.querySelector('#skills');
  var ctSec = document.querySelector('#contact');

  function scrollToSec() {
    console.log('enter scrollTo func');
    var secId = this.getAttribute('href');
    var section = document.querySelector(secId);
    var topPos = section.offsetTop;


  }


  for (i = 0; i < navBtnsLen; i++) {
    // navBtns[i].addEventListener('click', scrollToSec);
  }



  /***************************************************************************
   * Sidebar & Top nav bar
   ***************************************************************************/

})();
