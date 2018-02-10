---
layout      : lab
title       : jQuery LoadingOverlay
description : A flexible loading overlay jQuery Plugin
updated     : 2018-02-10
getit       :
  github        : gasparesganga/jquery-loading-overlay
  download      : true
  npm           : gasparesganga-jquery-loading-overlay
  bower         : gasparesganga-jquery-loading-overlay
  cdn           :
    name    : gasparesganga-jquery-loading-overlay
    version : 1.6.0
    files   : [src/loadingoverlay.min.js, extras/loadingoverlay_progress/loadingoverlay_progress.min.js]

assets      :
  css   :
    - jquery-loading-overlay/_assets/font-awesome-4.6.3/font-awesome.scss
  js    :
    - js/jquery-3.1.1.min.js
    - jquery-loading-overlay/_assets/loadingoverlay.min.js
    - jquery-loading-overlay/_assets/loadingoverlay_progress.min.js
    - jquery-loading-overlay/_assets/demo.js
---


{% capture current_date %}{{'now' | date: '%s'}}{% endcapture %}
{% capture expire_date %}{{'2018-03-31' | date: '%s'}}{% endcapture %}
{% if current_date < expire_date %}
<div class="alert">
    <b>10 February 2018 :</b> Version 1.6.0 released. See <a href="/posts/jquery-loading-overlay-1.6.0/">release notes</a>.
</div>
{% endif %}

<div class="alert">
    <b>Do you like this plugin? Great! Then why don't you try my other <a href="/labs/">jQuery plugins</a>?</b>
</div>


## Contents
- [Quick Demo](#quick-demo)
- [Get it](#get-it)
- [Features](#features)
- [Methods](#methods)
- [Actions](#actions)
- [Options and defaults values](#options-and-defaults-values)
- [Examples](#examples)
- [Extras](#extras)
- [History](#history)
- [Comments and Ideas](#comments-and-ideas)


## Quick Demo
{% include_relative _demo.html demo="quick_demo" %}


## Get it
{% include getit.html %}


## Features
* Shows a loading overlay on the whole page or over single DOM elements
* Tracks a *counter* to allow multiple calls on single target
* Can auto resize according to its container (very useful if used over a DOM element being filled meanwhile)
* Compatible with [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
* Can show a custom element to provide feedback to the user
* Completely configurable
* No external CSS, small footprint



## Methods
There are three different methods, one to attach a LoadingOverlay to the `body` and thus covering the whole page, another to attach it to a single *DOM element* or a set of *DOM elements* and the last one to set the default parameters.

### *$.LoadingOverlay(action [,options])*
Shows the LoadingOverlay with a fixed position, covering the whole page. Optionally pass some `options` to it.
This method doesn't return anything.

### *$(selector).LoadingOverlay(action [,options])*
Attach the LoadingOverlay to a single DOM element or a set of DOM elements. Optionally pass some `options` to it.
This method returns a *jQuery object* or a set of *jQuery objects* *(depending on the selector used)* and is **chainable**.

### *$.LoadingOverlaySetup(options)*
Set default `options` for all future calls to **`$.LoadingOverlay()`** and **`$(selector).LoadingOverlay()`**.



## Actions
The **`$.LoadingOverlay()`** and **`$(selector).LoadingOverlay()`** methods have two variants, corresponding to two *Actions*:

##### Show
**`$[(selector)].LoadingOverlay("show" [,options])`**
Shows a LoadingOverlay, or increases the *counter* if it's already shown. Optionally you can pass a set of `options`, but note that they only take effect if the LoadingOverlay is not shown yet on the element.

##### Hide
**`$[(selector)].LoadingOverlay("hide" [,force])`**
Hides the LoadingOverlay or decreases the *counter* if it's more than 1. You can optionally pass a boolean parameter `force` to hide the LoadingOverlay even if the counter hasn't reached `0`.



## Options and defaults values
```javascript
color           : "rgba(255, 255, 255, 0.8)"    // String
custom          : ""                            // String/DOM Element/jQuery Object
fade            : true                          // Boolean/Integer/String/Array
fontawesome     : ""                            // String
image           : "data:image/gif;base64,..."   // String
imagePosition   : "center center"               // String
maxSize         : "100px"                       // Integer/String
minSize         : "20px"                        // Integer/String
resizeInterval  : 50                            // Integer
size            : "50%"                         // Integer/String
zIndex          : 9999                          // Integer
```

##### `color`
CSS background-color property. Use `rgba()` to set the opacity.

##### `custom`
A *DOM element*, *jQuery object* or plain *HTML* to append to the LoadingOverlay. You can use this feature to display some feedback for your user *(see [example 4](#example-4---show-a-countdown-in-a-custom-element) )*.
Use an empty string `""` or `false` to disable the feature.

##### `fade`
Controls the *fade in* and *fade out* durations. It can be either `0` or `false` to disable it *(meaning a zero duration)*, an *integer* or *string* to set equal *fade in* and *fade out* durations *(ie. `400` or `"fast"` or `"slow"`)* or a two-elements *array* to set specific *fade in* and *fade out* durations *(ie. `[600, 300]`)*. You can also pass the boolean value `true`, which is treated like `[400, 200]`.

##### `fontawesome`
**Class(es)** of the [Font Awesome](https://fortawesome.github.io/Font-Awesome/) icon to use. Note that you must include the Font Awesome *stylesheet* in your project if you wish to use this feature. Use an empty string `""` or `false` to disable the feature.

##### `image`
*URL* of the image to show. Use an empty string `""` or `false` to show no image.

##### `imagePosition`
This option is mapped directly to *CSS* `background-position` property to customize the position of the image.

##### `maxSize`
Maximun size of image in **pixels**. Set it to `0` or `false` for no limit.

##### `minSize`
Minimun size of image in **pixels**. Set it to `0` or `false` for no limit.

##### `resizeInterval`
Specifies an interval in **milliseconds** to resize and reposition the LoadingOverlay according to its container. This is useful when the container element changes size and/or position while the LoadingOverlay is being shown.
Set it to `0` or `false` to disable this feature.

##### `size`
Size of image in **percentage**. Use `0` or `false` to disable image resizing.

##### `zIndex`
Use this to explicitly set a `z-index` for the overlay. This is useful when LoadingOverlay is used with other *z-index intensive* libraries like Bootstrap.



## Examples

### Example 1 - Whole page Overlay 
```javascript
// Show full page LoadingOverlay
$.LoadingOverlay("show");

// Hide it after 3 seconds
setTimeout(function(){
    $.LoadingOverlay("hide");
}, 3000);
```
{% include_relative _demo.html demo="example1" %}


### Example 2 - Single element Overlay
```javascript
// Let's call it 2 times just for fun...
$("#element").LoadingOverlay("show");
$("#element").LoadingOverlay("show");

// Here we might call the "hide" action 2 times, or simply set the "force" parameter to true:
$("#element").LoadingOverlay("hide", true);
```
{% include_relative _demo.html demo="example2" %}


### Example 3 - Use Font Awesome spinner instead of gif image
```javascript
$.LoadingOverlay("show", {
    image       : "",
    fontawesome : "fa fa-spinner fa-spin"
});
```
{% include_relative _demo.html demo="example3" %}


### Example 4 - Show a countdown in a custom element
```javascript
var count           = 5;
var customElement   = $("<div>", {
    id      : "countdown",
    css     : {
        "font-size" : "50px"
    },
    text    : count
});

$.LoadingOverlay("show", {
    image   : "",
    custom  : customElement
});

var interval = setInterval(function(){
    count--;
    customElement.text(count);
    if (count <= 0) {
        clearInterval(interval);
        $.LoadingOverlay("hide");
        return;
    }
}, 1000);
```
{% include_relative _demo.html demo="example4" %}


### Example 5 - Display a LoadingOverlay during each Ajax request
You can rely on [.ajaxStart()](https://api.jquery.com/ajaxStart/) and [.ajaxStop()](https://api.jquery.com/ajaxStop/) to show and hide the LoadingOverlay during every Ajax request:

```javascript
$(document).ajaxStart(function(){
    $.LoadingOverlay("show");
});
$(document).ajaxStop(function(){
    $.LoadingOverlay("hide");
});
// Now try to make a few Ajax calls, a LoadingOverlay will be shown until the last call is completed!
```

Or, in case you need some more sophisticated control/filter, you can use [.ajaxSend()](https://api.jquery.com/ajaxSend/) and [.ajaxComplete()](https://api.jquery.com/ajaxComplete/) in the same way. LoadingOverlay will take care of multiple calls thanks to its internal counter feature.

```javascript
$(document).ajaxSend(function(event, jqxhr, settings){
    $.LoadingOverlay("show");
});
$(document).ajaxComplete(function(event, jqxhr, settings){
    $.LoadingOverlay("hide");
});
// Now try to make a few Ajax calls, a LoadingOverlay will be shown until the last call is completed!
```


### Example 6 - Play with extreme fade durations
```javascript
$.LoadingOverlay("show", {
    fade  : [2000, 1000]
});
```
{% include_relative _demo.html demo="example6" %}


### Example 7 - Set Defaults
```javascript
$.LoadingOverlaySetup({
    color           : "rgba(0, 0, 0, 0.4)",
    image           : "img/custom_loading.gif",
    maxSize         : "80px",
    minSize         : "20px",
    resizeInterval  : 0,
    size            : "50%"
});
```



## Extras
With release 1.2 I have started to include some **extras** to accomodate feedback and requests by the users, yet avoiding to bloat the plugin with *non-essential functionalities* that are really case-specific. They can be thought as *plugin modules* of LoadingOverlay that provide additional features.

### Progress
This *extra* provides basic *progress bar loader* functionality.
The idea is very similar to the one that led to the `custom` option: providing some feedback to the user while the LoadingOverlay is being shown.
In some cases, a kind of *progress bar* could fit this need very well. So instead of creating your own progress bar, you can use an instance of `LoadingOverlayProgress`.
The code is easily customizable for your specific taste, but you can use it right out-of-the-box since some customization options are available and should be enough for most cases:

```javascript
// Initialize Progress and show LoadingOverlay
var progress = new LoadingOverlayProgress();
$.LoadingOverlay("show", {
    custom  : progress.Init()
});

// Simulate some action:
var count     = 0;
var interval  = setInterval(function(){
    if (count >= 100) {
        clearInterval(interval);
        delete progress;
        $.LoadingOverlay("hide");
        return;
    }
    count++;
    progress.Update(count);
}, 100)
```
{% include_relative _demo.html demo="extraprogress1" %}

##### Customization
You can customize the look of the progress bar and text passing and object with `bar` and `text` properties to the new instance. Any CSS property is accepted.
You can pass a boolean value `false` to the `text` property to disable it.

```javascript
var progressCustom = new LoadingOverlayProgress({
    bar     : {
        "background"    : red,
        "top"           : "50px",
        "height"        : "30px",
        "border-radius" : "15px"
    },
    text    : {
        "color"         : red,
        "font-family"   : "monospace",
        "top"           : "25px"
    }
});
```



## History
*10 February 2018* - [Version 1.6.0](/posts/jquery-loading-overlay-1.6.0/)
*29 September 2017* - [Version 1.5.4](/posts/jquery-loading-overlay-1.5.4/)
*27 January 2017* - [Version 1.5.3](/posts/jquery-loading-overlay-1.5.3/)
*9 December 2016* - [Version 1.5.2](/posts/jquery-loading-overlay-1.5.2/)
*11 November 2016* - [Version 1.5.1](/posts/jquery-loading-overlay-1.5.1/)
*11 November 2016* - [Version 1.5.0](/posts/jquery-loading-overlay-1.5.1/)
*5 August 2016* - [Version 1.4.1](/posts/jquery-loading-overlay-1.4.1/)
*29 June 2016* - [Version 1.4.0](/posts/jquery-loading-overlay-1.4.0/)
*25 May 2016* - [Version 1.3](/posts/jquery-loading-overlay-version-1.3/)
*22 April 2016* - [Version 1.2](/posts/jquery-loading-overlay-version-1.2/)
*31 December 2015* - [Version 1.1](/posts/jquery-loading-overlay-version-1.1/)
*15 February 2015* - [Version 1.0](/posts/jquery-loading-overlay-release/)
