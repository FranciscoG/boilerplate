var ga_event = require('../js/modules/ga/ga_event.js');
var TinyRouter = require('../js/modules/TinyRouter.js');
var plugins = require('../js/modules/plugins.js');
var $ = require('jquery');
var Validate = require('../js/modules/validate/validate.js');

var MySite = new TinyRouter({

    universal: function() {
        plugins();

        $('html').removeClass('no-js');

        // load classic GA library
        ga_event('UA-XXXXXXX-XX', "ga.js");
    },

    home: function() {
        // do something on the home page
        console.log('this is the home page');
    },

    testpage: function() {

        $('#submit').click(function(e) {
            e.preventDefault();

            var validateme = new Validate({
                classname: "js-validate",
                error: function($elem) {
                    $elem.siblings('.error').show();
                },
                success: function($elem) {
                    $elem.siblings('.error').hide();
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