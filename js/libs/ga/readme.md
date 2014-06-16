## Google Analytics helper

https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide

### requires jQuery

This script will load the google analytics library for you and then attach click handlers for event tracking

usage:

####in your JS:

1. include this file after you include jQuery but before your main JS file
2. in your main js you call the init function:

```javascript
GA_event.init('UA-XXXXXXX-XX');
GA_event.init('UA-XXXXXXX-XX', true);  <-- if you have dynamically added content
```

####in your HTML:  

1. add the css classname "ga_event" to any element you want to track a click on
2. add data attributes to the html element for each part of the trackEvent 

```
data-ga-category        - required, any string
data-ga-action          - required, any string
data-ga-label           - optional, any string
data-ga-value           - optional, must only be a number like this:  data-value="55"
data-ga-non-interaction - optional, only true or false, default is false so only use when true
```

for easy copy and paste:

```html
<a href="#" class="ga_event" data-ga-category="" data-ga-action="" data-ga-label="" data-ga-value="" data-ga-non-interaction="true"></a>
```

