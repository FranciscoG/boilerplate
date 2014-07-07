var ga_event = require('../js/modules/ga/ga_event.js');
var TinyRouter = require('../js/modules/TinyRouter.js');
var plugins = require('../js/modules/plugins.js');
var $ = require('jquery');
var Validate = require('../js/modules/validate/validate.js');

var MySite = new TinyRouter({

  // everything in the "universal" function get executed first on every page
  universal: function() {
    plugins();

    $('html').removeClass('no-js');

    // load classic GA library and attach GA tracking click events
    ga_event('UA-XXXXXXX-XX', "ga.js");
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