---
layout      : lab
title       : jQuery LoadingOverlay
description : A flexible loading overlay jQuery Plugin
updated     : 2016-04-22
css         :
  - jquery-loading-overlay/_assets/font-awesome-4.6.3/font-awesome.scss
js          :
  - js/jquery-2.1.3.min.js
  - jquery-loading-overlay/_assets/loadingoverlay.min.js
  - jquery-loading-overlay/_assets/loadingoverlay_progress.min.js
  - jquery-loading-overlay/_assets/demo.js
download    : jquery-loading-overlay/archive/master.zip
source      : jquery-loading-overlay
---

<div class="alert">
    <b>22 April 2016 :</b> Time for another release, version 1.2. This plugin has become the most popular of mine and I started to get more feedbacks. Fade in/out capabilities have been added as well as the first <i>Extra</i>: <b>Progress</b>. Check <a href="/posts/jquery-loading-overlay-version-1.2/">this post</a> for a complete explaination of the changes.
</div>

<div class="alert">
    <b>31 December 2015 :</b> Version 1.1 released! After some feedback and requests from the users, I've added support for <a href="https://fortawesome.github.io/Font-Awesome/">Font Awesome</a> and custom elements inside the overlay. Check <a href="/posts/jquery-loading-overlay-version-1.1/">this post</a> for a complete explaination of the changes.
</div>


## Quick Demo
{% include_relative _demo.html demo="quick_demo" %}



## Features
* Shows a loading overlay on the whole page or over single DOM elements
* Tracks a "counter" (or a queue) to allow multiple calls on single target
* Can auto resize according to its container (very useful if used over a DOM element being filled meanwhile)
* Compatible with [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
* Can show a custom element to provide feedback to the user
* Completely configurable
* No external CSS, small footprint



## Methods
There are three different methods, one to attach a Loading Overlay to the `body` and thus covering the whole page, another to attach it to a single DOM element or a set of DOM elements and the last one to set the default parameters.

#### *$.LoadingOverlay(action [,options])*
Shows the Loading Overlay with a fixed position, covering the whole page. Optionally pass some `options` to it.
This method doesn't return anything.

#### *$(selector).LoadingOverlay(action [,options])*
Attach the Loading Overlay to a single DOM element or a set of DOM elements. Optionally pass some `options` to it.
This method return a jQuery object or a set of jQuery objects (depending on the selector used) and is **chainable**.

#### *$.LoadingOverlaySetup(options)*
Set default `options` for all future calls to `$.LoadingOverlay` and `$(selector).LoadingOverlay`.



## Actions
The `$.LoadingOverlay` and `$(selector).LoadingOverlay` methods have two variants, corresponding to two *actions*:

##### *$[(selector)].LoadingOverlay("show" [,options])*
Show a Loading Overlay, or increase the *counter* if it's already shown. Optionally you can pass a set of `options`, but note that they only take effect if the Loading Overlay is not shown yet on the element.

##### *$[(selector)].LoadingOverlay("hide" [,force])*
Hide the Loading Overlay or decrease the *counter* if it's more than 1. You can optionally pass a boolean parameter `force` to hide the Loading Overlay even if the counter hasn't reached `0`.



## Options and defaults values
```javascript
color           : "rgba(255, 255, 255, 0.8)"    // String
custom          : ""                            // String/DOM Element/jQuery Object
fade            : true                          // Boolean/Integer/String/Array
fontawesome     : ""                            // String
image           : "loading.gif"                 // String
maxSize         : "100px"                       // Integer/String
minSize         : "20px"                        // Integer/String
resizeInterval  : 0,                            // Integer
size            : "50%"                         // Integer/String
```

##### `color`
CSS background-color property. Use `rgba` to set the opacity.

##### `custom`
A DOM element, jQuery object or plain HTML to append to the LoadingOverlay. You can use this feature to display some feedback for your user. See [example5](#example-5---show-a-countdown-in-a-custom-element) Use an empty string `""` or `false` to disable the feature.

##### `fade`
Controls the *fade in* and *fade out* durations. It can be either `0` or `false` to disable it *(meaning a zero duration)*, an integer or string to set equal *fade in* and *fade out* durations *(ie. `400` or `fast` or `slow`)* or a two-elements array to set specific *fade in* and *fade out* durations *(ie. `[600, 300]`)*. Boolean value `true` acts like `[400, 200]`.

##### `fontawesome`
**Class(es)** of the [Font Awesome](https://fortawesome.github.io/Font-Awesome/) icon to use. Note that you must include the Font Awesome *stylesheet* in your project if you wish to use this feature. Use an empty string `""` or `false` to disable the feature.

##### `image`
URL of the image to show. Use an empty string `""` or `false` to show no image.

##### `maxSize`
Maximun size of image in **pixels**. Set it to `0` or `false` for no limit.

##### `minSize`
Minimun size of image in **pixels**. Set it to `0` or `false` for no limit.

##### `resizeInterval`
Specifies an interval in **milliseconds** to resize the Loading Overlay accoring to its container.
Use this when the DOM element is supposed to change size while the Loading Overlay is shown.
Use `0` or `false` to disable this feature.

##### `size`
Size of image in **percentage**. Use `0` or `false` to disable image resizing.



## Examples

### Example 1 - Whole page Overlay 
```javascript
// Show full page Loading Overlay
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


### Example 3 - Single element Overlay with auto resize
Place a test `div` in your html page like that:

```html
<div id="element" style="width:50px; height:50px; background:red; border:2px solid black;"></div>
```

And try the auto resize feature:

```javascript
$("#element").LoadingOverlay("show", {
    resizeInterval : 20
});

setInterval(function(){
    if ($("#element").width() < 500) $("#element").height("+=5").width("+=10");
}, 300);
```
{% include_relative _demo.html demo="example3" %}


### Example 4 - Use Font Awesome spinner instead of gif image
```javascript
$.LoadingOverlay("show", {
    image       : "",
    fontawesome : "fa fa-spinner fa-spin"
});
```
{% include_relative _demo.html demo="example4" %}


### Example 5 - Show a countdown in a custom element
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
{% include_relative _demo.html demo="example5" %}


### Example 6 - Use the counter feature to hide the Loading Overlay only when all Ajax calls are completed
```javascript
$(document).ajaxStart(function(){
    $.LoadingOverlay("show");
});
$(document).ajaxStop(function(){
    $.LoadingOverlay("hide");
});
// Now try to make a few Ajax calls, a Loading Overlay will be shown until the last call is completed!
```


### Example 7 - Play with extreme fade durations
```javascript
$.LoadingOverlay("show", {
    fade  : [2000, 1000]
});
```
{% include_relative _demo.html demo="example7" %}


### Example 8 - Set Defaults
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
