(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ga_event = require('../js/modules/ga/ga_event.js');
var TinyRouter = require('../js/modules/TinyRouter.js');
var utils = require('../js/modules/plugins.js');
var Validate = require('../js/modules/validate/validate.js');
var NavDrawer = require('../js/modules/navDrawer.js');

var MySite = new TinyRouter({

  // everything in the "universal" function get executed first on every page
  universal: function() {
    utils.noConsole();

    // load classic GA library and attach GA tracking click events
    ga_event('UA-XXXXXXX-XX', "ga.js");

    if (document.addEventListener) {
      var startNav = new NavDrawer();
      startNav.init();
    }
  },

  // the remaining functions are run on the respective pages with the matching data-route attribue in the body tag
  home: function() {
    console.log('this is the home page');
  },

  testpage: function() {

    $('#submit').click(function(e) {
      e.preventDefault();

      var validateme = new Validate({
        classname: "js-validate",
        error: function($elem) {
          $elem.closest('.formbox').addClass('invalid').next('.error').show();
        },
        success: function($elem) {
          $elem.closest('.formbox').removeClass('invalid').addClass('valid').next('.error').hide();
        },
        complete: function(errors) {
          if (errors === 0) {
            $('#complete').hide();
          } else {
            $('#complete').show();
          }
        },
        debug: true
      });
    });

  }

});
},{"../js/modules/TinyRouter.js":2,"../js/modules/ga/ga_event.js":3,"../js/modules/navDrawer.js":4,"../js/modules/plugins.js":5,"../js/modules/validate/validate.js":6}],2:[function(require,module,exports){
/*  
 * tinyRouter.js
 *
 * Super simple JS router class, like super super simple
 * doesn't use any regex to match url pathnames or hashes
 * just takes a route name, looks for that function that matches it and runs it
 * this is really only useful in small projects where you have a few pages and not a ton of JS
 * but enough so where you still want to keep things organized
 *
 * there is one reserved route name
 * universal : always runs this route before other routes
 *
 * this is kind of an offshoot of Paul Irish's DOM-Based routing:
 * http://www.paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
 */


module.exports = function(info) {
    this.methods = info;

    var route = document.body.getAttribute('data-route'); //supporting back to IE8, why not

    if (route === null) {
        return false; // no route so we exit quietly
    }

    if (route === 'universal') {
        throw new Error("universal is a reserved name, don't use it");
    }

    if (typeof this.methods.universal !== 'undefined') {
        // always run what's in 'universal' before other routes
        this.methods.universal();
    }

    var execRoute = this.methods[route];
    if (typeof execRoute === 'function') {
        execRoute();
    }

};

/** 
How to use:

Step 1:  on your page you add a 'data-route' attribute to your body tag like this:
        
<body data-route="users">
 
 
Step 2:  Create your Route functions, tinyRouter takes an Object Literal as its only parameter

// require it
var TinyRouter = require('../js/modules/TinyRouter.js');

// use it
var yourMainModule = new TinyRouter({
  
  universal: function() {
    // this is an optional route (but a reserved name, so don't use it in data-route)
    // runs this route on every page before the other routes
  },
  
  users: function() {
    // do stuff specific to users page
  }
  
});


*/
},{}],3:[function(require,module,exports){
var whichVersion = "ga.js";

var sendData = function(dataArray) {
  //console.log(dataArray);

  if (whichVersion === "ga.js") {
    var oldGAarray = ['_trackEvent'];
    // the old GA.js way
    // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
    // _gaq.push(['_trackEvent', 'category', 'action', 'label', value, non-interaction ]);
    oldGAarray.push(dataArray);
    _gaq.push(oldGAarray);

  } else {
    // The new analytics JS way
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
    // ga('send', 'event', 'category', 'action', value, {'nonInteraction': 1});
    ga('send', {
      'hitType': 'event',
      'eventCategory': dataArray[0],
      'eventAction': dataArray[1],
      'eventLabel': dataArray[2],
      'eventValue': dataArray[3],
      'nonInteraction': dataArray[4]
    });
  }
};

var checkDatas = function(e) {
  var link = $(e.currentTarget);
  var eventArray = [];

  var ga_cat = link.attr('data-ga-category') || false;
  var ga_action = link.attr('data-ga-action') || false;

  var ga_label = link.attr('data-ga-label') || null;
  var ga_value = link.attr('data-ga-value') || null;
  var ga_non = link.attr('data-ga-non-interaction') || null;

  if (!ga_cat || !ga_action) {
    console.warn('GA event tags require BOTH a category and an action');
    return false;
  } else {
    eventArray.push(ga_cat, ga_action, ga_label, parseFloat(ga_value) || null);
  }

  if (ga_non !== null && ga_non === "true") {
    eventArray.push(true);
  } else {
    eventArray.push(false);
  }

  sendData(eventArray);

};

var addOldGAlibrary = function(UA) {
  // usign the older ga tracking library: https://developers.google.com/analytics/devguides/collection/gajs/

  window._gaq = window._gaq || [];
  _gaq.push(['_setAccount', UA]);
  _gaq.push(['_trackPageview']);

  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[1];
  s.parentNode.insertBefore(ga, s);

};

var addNewGALibrary = function(UA) {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/

  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[1];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

  ga('create', UA, 'auto');
  ga('send', 'pageview');

};


/**
 * @param  {string}  UA         the UA account number
 * @param  {string}  version    "ga.js" or "analytics.js" , optional, which version of the analytics library to use.  defaults to "ga.js"
 * @param  {Boolean} hasDynamic true if there are dynamically generated links in the site
 */
module.exports = function(UA, version, hasDynamic) {
  var _UA = UA || false;
  whichVersion = version || "ga.js";
  var _d = hasDynamic || false;

  if (!_UA) {
    console.warn("GA_event: missing UA account ID");
    return false;
  }

  if (whichVersion === "ga.js") {
    addOldGAlibrary(_UA);
  } else {
    addNewGALibrary(_UA);
  }


  if (_d) {
    // since we add the click event on page load any links that are dynamically added after page load won't get the click event attached
    // so we use this method instead.  But we only want to use this if we NEED to, because it adds a click event to the entire <body> and
    // then every time you click on anything is traverses down the DOM to check if that element has the ga_event class which is a lot of work
    $('body').on('click', '.ga_event', function(e) {
      checkDatas(e);
    });
  } else {
    $('.ga_event').on('click', function(e) {
      checkDatas(e);
    });
  }
};
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
module.exports = {
  /****************************************************************
   * Avoid `console` errors in browsers that lack a console.
   */
  noConsole: function() {
    var method;
    var noop = function() {};
    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
  },

  /****************************************************************
   * Trace where a console.log is coming from
   * source: http://remysharp.com/2014/05/23/where-is-that-console-log/
   */
  traceLog: function() {
    if (!Array.prototype.forEach) {
      ['log', 'warn'].forEach(function(method) {
        var old = console[method];
        console[method] = function() {
          var stack = (new Error()).stack.split(/\n/);
          // Chrome includes a single "Error" line, FF doesn't.
          if (stack[0].indexOf('Error') === 0) {
            stack = stack.slice(1);
          }
          var args = [].slice.apply(arguments).concat([stack[1].trim()]);
          return old.apply(console, args);
        };
      });
    }
  },

  /****************************************************************
   *  scroll to element via its id
   *  used to fix issues on some older browsers cause they suck
   */
  scrollToAnchor: function(aid, options) {
    var opts = options || {};
    opts.duration = opts.duration || '500';
    opts.easing = opts.easing || 'swing';

    var properties = {
      scrollTop: $(aid).offset().top
    };

    $('html,body').animate(properties, opts);
  }
};
},{}],6:[function(require,module,exports){
var defaults = {
  classname: "js-validate",
  debug: false
};

function Validate(options) {
  if (typeof options !== "object") {
    console.warn('Validator: options not defined');
    return false;
  }

  options.classname = options.classname || defaults.classname;
  options.success = options.success || null;
  options.error = options.error || null;
  options.complete = options.complete || null;
  options.debug = options.debug || defaults.debug;

  this.options = options;
  this.errors = 0;
  this.index = 0;
  this.resultTable = [];

  // cache the selector
  this.$classname = $("." + options.classname);

  var self = this;

  this.$classname.each(function(i) {
    self.$elem = $(this);

    var tagname = $(this)[0].tagName.toLowerCase();

    self.index += 1; // this will match .length in the end

    if (tagname === "input") {
      self.handleInput($(this));
    } else {
      self.handleTheRest($(this), false);
    }

  });
}

Validate.prototype.handleInput = function($input) {

  if ($input[0].type !== "text") {
    this.handleTheRest($input, true);
  } else {
    var valType = $input.attr('data-validate-type');
    var valVal = $input.val();
    var valResult = this.validateText(valType, valVal);
    this.handleResult($input, valResult);
  }

};

Validate.prototype.handleTheRest = function($elem, fromInput) {
  var isValid = false;
  var tag, dataAttr, nameGroup;

  if (fromInput) {
    tag = $elem[0].type;
  } else {
    tag = $elem[0].tagName.toLowerCase();
  }

  switch (tag) {
    case "select":
      var $currentOption = $elem.find(":selected");
      dataAttr = $currentOption[0].getAttribute('data-validate-type');
      isValid = (dataAttr === null) ? true : false;
      break;
    case "checkbox":
      nameGroup = $elem.attr('name');
      var $checked = $("input[name='" + nameGroup + "']:checked");
      dataAttr = $elem[0].getAttribute('data-validate-checkbox');

      if (dataAttr !== null) {
        var total = parseFloat(dataAttr.replace(/[min|max]/g, ''));
        var quantifier = dataAttr.replace(/[0-9]/g, '');

        if (quantifier === "max") {
          isValid = ($checked.length > 0 && $checked.length <= total) ? true : false;
        } else if (quantifier === "min") {
          isValid = ($checked.length >= total) ? true : false;
        } else {
          isValid = ($checked.length === total) ? true : false;
        }

      } else {
        isValid = $elem.is(':checked');
      }

      break;
    case "radio":
      nameGroup = $elem.attr('name');
      isValid = ($("input[name='" + nameGroup + "']").is(":checked")) ? true : false;
      break;
    case "textarea":
      isValid = (!$.trim($elem.val())) ? false : true;
      break;
    default:
      console.warn('Validator: ' + tag + ' element is not supported');
      break;
  }

  if (!isValid) {
    this.errors += 1;
  }

  this.handleResult($elem, isValid);
};

Validate.prototype.validateText = function(type, val) {
  var _type = type || false;
  var _val = val || "";
  var validate_result = false; // true is good, means it passed

  if (!_type) {
    console.warn('Validator.validateText: type is undefined');
    return false;
  }

  if (_val === "") {
    // for blank entries we skip the switch and just set it to false
    validate_result = false;
  } else {

    switch (_type) {
      case "name":
        validate_result = /[a-zA-Z\d''-'\s]+/.test(_val);
        break;
      case "phone":
        validate_result = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/.test(_val);
        break;
      case "email":
        validate_result = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(_val);
        break;
      case "zip":
        validate_result = /^\d{5}$/.test(_val);
        break;
      case "zip4":
        // source: https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet#White_List_Regular_Expression_Examples
        validate_result = /^\d{5}(-\d{4})?$/.test(_val);
        break;
      case "num":
        validate_result = /^\d+$/.test(_val);
        break;
      case "state":
        // source: https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet#White_List_Regular_Expression_Examples
        validate_result = /^(AA|AE|AP|AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY)$/.test(val);
        break;
      default:
        console.warn('Validator: the data-validate-type you are using is not supported');
        break;
    }

  }

  if (!validate_result) {
    this.errors += 1;
  }

  return validate_result;
};

Validate.prototype.handleResult = function($elem, result) {

  if (!result && typeof this.options.error === 'function') {
    this.options.error($elem);
  } else if (result && typeof this.options.success === 'function') {
    this.options.success($elem);
  } else {
    // do nothing for now
  }

  if (this.index === this.$classname.length && typeof this.options.complete === "function") {
    this.options.complete(this.errors);
  }

  // some debugging with nice formating in Chrome
  if (this.options.debug) {
    var currDebug = {
      tag: $elem[0].type || $elem[0].tagName,
      name: $elem.attr('name'),
      value: $elem.val(),
      pass: result
    };

    this.resultTable.push(currDebug);
    if (this.index === this.$classname.length) {
      console.table(this.resultTable);
      console.log(this.errors + " errors found");
    }
  }

};


module.exports = Validate;
},{}]},{},[1])