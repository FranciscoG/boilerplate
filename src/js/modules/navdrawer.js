/**************************************************************************
 * LeftSide sliding Nav Drawer
 * Borrowed from the Google Web Starter Kit
 */


var MobileNav = (function() {

  var querySelector = document.querySelector.bind(document);
  var navdrawerContainer = querySelector('.navdrawer-container');
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');

  var closeMenu = function() {
    appbarElement.classList.remove('open');
    navdrawerContainer.classList.remove('open');
    main.classList.remove('open');
  };

  var toggleMenu = function() {
    appbarElement.classList.toggle('open');
    navdrawerContainer.classList.toggle('open');
    main.classList.toggle('open');
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