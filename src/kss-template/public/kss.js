(function() {
  var KssStateGenerator;

  KssStateGenerator = (function() {

    function KssStateGenerator() {
      var idx, idxs, pseudos, replaceRule, rule, stylesheet, _i, _len, _len2, _ref, _ref2;
      pseudos = /(\:hover|\:disabled|\:active|\:visited|\:focus)/g;
      // try {
      _ref = document.styleSheets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stylesheet = _ref[_i];
        idxs = [];
        _ref2 = stylesheet.cssRules || [];
        for (idx = 0, _len2 = _ref2.length; idx < _len2; idx++) {
          rule = _ref2[idx];
          if ((rule.type === CSSRule.STYLE_RULE) && pseudos.test(rule.selectorText)) {
            replaceRule = function(matched, stuff) {
              return ".pseudo-class-" + matched.replace(':', '');
            };
            this.insertRule(rule.cssText.replace(pseudos, replaceRule));
          }
        }
      }
      // } catch (_error) {console.log(_error.message);}
    }

    KssStateGenerator.prototype.insertRule = function(rule) {
      var headEl, styleEl;
      headEl = document.getElementsByTagName('head')[0];
      styleEl = document.createElement('style');
      styleEl.type = 'text/css';
      if (styleEl.styleSheet) {
        styleEl.styleSheet.cssText = rule;
      } else {
        styleEl.appendChild(document.createTextNode(rule));
      }
      return headEl.appendChild(styleEl);
    };

    return KssStateGenerator;

  })();

  new KssStateGenerator;

}).call(this);

// var MobileNav = (function() {

//   var querySelector = document.querySelector.bind(document);
//   var navdrawerContainer = querySelector('.navdrawer-container');
//   var appbarElement = querySelector('.app-bar');
//   var menuBtn = querySelector('.menu');
//   var main = querySelector('main');

//   var closeMenu = function() {
//     appbarElement.classList.remove('open');
//     navdrawerContainer.classList.remove('open');
//     main.classList.remove('open');
//   };

//   var toggleMenu = function() {
//     appbarElement.classList.toggle('open');
//     navdrawerContainer.classList.toggle('open');
//     main.classList.toggle('open');
//   };

//   var init = function() {

//     main.addEventListener('click', closeMenu);
//     menuBtn.addEventListener('click', toggleMenu);

//     $(window).resize(function() {
//       closeMenu();
//     });

//   };

//   return {
//     init: init,
//     closeMenu: closeMenu
//   };
// });

// var nav = new MobileNav();
// nav.init();