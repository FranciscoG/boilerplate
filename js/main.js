var MySite = new tinyRouter({

  universal: function() {

    $('html').removeClass('no-js');

    // load classic GA library
    // GA_event.init('UA-XXXXXXX-XX', "ga.js");
  },

  home: function() {
    // do stuff specific to home page
  }

});