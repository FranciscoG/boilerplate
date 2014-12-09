/**************************************************************************
 * LeftSide sliding Nav Drawer
 * Borrowed from the Google Web Starter Kit
 */

// because classList doesn't work in IE9, I have to manually create this 
// I don't want to use a polyfill because it adds too many lines of code that I don't need
var removeClass = function(elem, cls) {
  var cn = elem.className;
  elem.className = cn.replace(cls, "");
};

var toggleClass = function(elem, cls) {
  var cn = elem.className;
  if (cn.indexOf(cls) >= 0) {
    elem.className = cn.replace(cls, "");
  } else {
    elem.className += " " + cls;
  }
};

var MobileNav = (function() {

  var querySelector = document.querySelector.bind(document);
  var navdrawerContainer = querySelector('.navdrawer-container');
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');

  var closeMenu = function() {
    removeClass(appbarElement, "open");
    removeClass(navdrawerContainer, "open");
    removeClass(main, "open");
  };

  var toggleMenu = function() {
    toggleClass(appbarElement, "open");
    toggleClass(navdrawerContainer, "open");
    toggleClass(main, "open");
  };

  var init = function() {

    main.addEventListener('click', closeMenu);
    menuBtn.addEventListener('click', toggleMenu);

    $(window).resize(function() {
      closeMenu();
    });

  };

  return {
    init: init,
    closeMenu: closeMenu
  };
});

module.exports = MobileNav;