/*
Google Analytics event tagging
https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide

dependency:  jQuery

This script will load the google analytics library for you and then attach click handlers for event tracking

usage:

in your HTML:
1. add the css classname "ga_event" to any element you want to track a click on
2. add data attributes to the html element for each part of the trackEvent 

data-ga-category        - required, any string
data-ga-action          - required, any string

data-ga-label           - optional, any string
data-ga-value           - optional, must only be a number like this:  data-value="55"
data-ga-non-interaction - optional, only true or false, default is false so only use if true like this:  data-non-interaction="true"

for easy copy and paste:
class="ga_event" data-ga-category="" data-ga-action="" data-ga-label="" data-ga-value="" data-ga-non-interaction="true"

example:
<a href="/something" class="ga_event" data-ga-category="Account" data-ga-action="click" data-ga-label="User Account">User Account</a>

in your js:
1. include this file after you include jQuery but before your main JS file
2. in your main js you call the init function:  
GA_event.init('UA-XXXXXXX-XX');
GA_event.init('UA-XXXXXXX-XX', true);  <-- if you have dynamically added content
*/

var GA_event = (function () {

    var checkDatas = function (e) {
        var link = $(e.currentTarget);
        var eventArray = ['_trackEvent'];

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
        }

        _gaq.push(eventArray);

    };

    var addGAlibrary = function (UA) {
        // usign the older ga tracking library: https://developers.google.com/analytics/devguides/collection/gajs/

        window._gaq = window._gaq || [];
        _gaq.push(['_setAccount', UA]);
        _gaq.push(['_trackPageview']);

        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

    };

    var init = function (UA, hasDynamic) {
        var _UA = UA || false;
        var _d = hasDynamic || false;

        if (!_UA) {
            console.warn("GA_event: missing UA account ID");
            return false;
        }
        addGAlibrary(UA);

        if (_d) {
            // since we add the click event on page load any links that are dynamically added after page load won't get the click event attached
            // so we use this method instead.  But we only want to use this if we NEED to, because it adds a click event to the entire <body> and
            // then every time you click on anything is traverses down the DOM to check if that element has the ga_event class which is a lot of work
            $('body').on('click', '.ga_event', function (e) {
                checkDatas(e);
            });
        } else {
            $('.ga_event').on('click', function (e) {
                checkDatas(e);
            });
        }
    };

    return {
        init: init
    };

})();