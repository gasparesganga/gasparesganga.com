---
layout      : lab
title       : jQuery LoadingOverlay
description : A flexible loading overlay jQuery plugin
updated     : 2018-03-xx
getit       :
  github        : gasparesganga/jquery-loading-overlay
  download      : true
  npm           : gasparesganga-jquery-loading-overlay
  bower         : gasparesganga-jquery-loading-overlay
  cdn           :
    name    : gasparesganga-jquery-loading-overlay
    version : 2.0.0
    files   : [dist/loadingoverlay.min.js]

assets      :
#  css   :
#    - jquery-loading-overlay/_assets/font-awesome-4.6.3/font-awesome.scss
  js    :
    - js/jquery-3.1.1.min.js
    - jquery-loading-overlay/_assets/loadingoverlay.min.js
    - jquery-loading-overlay/_assets/demo.js
    - https://use.fontawesome.com/releases/v5.0.8/js/all.js
---


{% capture current_date %}{{'now' | date: '%s'}}{% endcapture %}
{% capture expire_date %}{{'2018-04-30' | date: '%s'}}{% endcapture %}
{% if current_date < expire_date %}
<div class="alert">
    <b>XX March 2018 :</b> Version 2.0.0 released. See <a href="/posts/jquery-loading-overlay-2.0.0/">release notes</a> for migration guide and breaking changes!
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
* Easy *plug-and-play* default behaviour yet fully configurable for advanced uses
* Shows a loading overlay on the whole page or over single DOM elements
* Can auto resize according to its container (very useful if used over a DOM element being filled meanwhile)
* Tracks a *counter* to allow multiple calls on single target
* Can show an image, some text, a progress bar or even a custom element to provide feedback to the user
* Compatible with [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
* No external CSS, high performances



## Methods
There are three different methods, one to attach a LoadingOverlay to the `body` and thus covering the whole page, another to attach it to a single *DOM element* or a set of *DOM elements* and the last one to set the default parameters.

### *$.LoadingOverlay(action [,options])*
Shows the LoadingOverlay with a fixed position, covering the whole page. Optionally pass some `options` to it.
This method doesn't return anything. See [Actions](#actions) for details.

### *$(selector).LoadingOverlay(action [,options])*
Attach the LoadingOverlay to a single *DOM element* or a set of *DOM elements*. Optionally pass some `options` to it.
This method returns a *jQuery object* or a set of *jQuery objects* *(depending on the selector used)* and is **chainable**. See [Actions](#actions) for details.

### *$.LoadingOverlaySetup(options)*
Set default `options` for all future calls to **`$.LoadingOverlay()`** and **`$(selector).LoadingOverlay()`**.



## Actions
The **`$.LoadingOverlay()`** and **`$(selector).LoadingOverlay()`** methods have four variants, corresponding to four *Actions*:

##### Show
**`$[(selector)].LoadingOverlay("show" [,options])`**
Shows a LoadingOverlay, or increases the *counter* if it's been already shown. Optionally you can pass a set of `options`, but note that they only take effect if the LoadingOverlay has not been shown yet on the element.

##### Hide
**`$[(selector)].LoadingOverlay("hide" [,force])`**
Hides the LoadingOverlay or decreases the *counter* if it's higher than `1`. You can optionally pass a boolean parameter `force` to hide the LoadingOverlay even if the counter hasn't reached `0`.

##### Text
**`$[(selector)].LoadingOverlay("text", value)`**
Update the text currently shown with the one passed to the `value` parameter. Pass boolean value `false` to hide the text element.
Note that this *action* only works if LoadingOverlay was initialized with some [text](#text).

##### Progress
**`$[(selector)].LoadingOverlay("progress", value)`**
Update the progress bar with the `value` parameter. Pass boolean value `false` to hide the progress bar.
Note that this *action* only works if LoadingOverlay was initialized with [progress](#progress) option set to `true`.


## Options and defaults values
```javascript
// Background
background              : "rgba(255, 255, 255, 0.8)"        // String
backgroundClass         : ""                                // String
// Image
image                   : "data:image/svg+xml;base64,..."   // String
imageAnimation          : "2000ms rotate_right"             // String/Boolean
imageAutoResize         : true                              // Boolean
imageResizeFactor       : 1                                 // Float
imageColor              : "#202020"                         // String
imageClass              : ""                                // String
imageOrder              : 1                                 // Integer
// Font Awesome
fontawesome             : ""                                // String
fontawesomeAutoResize   : true                              // Boolean
fontawesomeResizeFactor : 1                                 // Float
fontawesomeColor        : "#202020"                         // String
fontawesomeOrder        : 2                                 // Integer
// Custom
custom                  : ""                                // String/DOM Element/jQuery Object
customAnimation         : false                             // String/Boolean
customAutoResize        : true                              // Boolean
customResizeFactor      : 1                                 // Float
customOrder             : 3                                 // Integer
// Text
text                    : ""                                // String
textAnimation           : false                             // String
textAutoResize          : true                              // Boolean
textResizeFactor        : 0.5                               // Float
textColor               : "#202020"                         // String
textClass               : ""                                // String
textOrder               : 4                                 // Integer
// Progress
progress                : false                             // Boolean
progressAutoResize      : true                              // Boolean
progressResizeFactor    : 0.25                              // Float
progressColor           : "#a0a0a0"                         // String
progressClass           : ""                                // String
progressOrder           : 5                                 // Integer
progressSpeed           : 200                               // Integer
progressMin             : 0                                 // Float
progressMax             : 100                               // Float
// Sizing
size                    : 50                                // Float/String
minSize                 : 20                                // Integer/String
maxSize                 : 120                               // Integer/String
// Misc
direction               : "column"                          // String
fade                    : [400, 200]                        // Array/Boolean/Integer/String
resizeInterval          : 50                                // Integer
zIndex                  : 2147483647                        // Integer
```

##### `background`
Overlay's CSS background-color property. Use `rgba()` to set the opacity. Keep in mind that if `backgroundClass` is provided then `background` option is ignored.

##### `backgroundClass`
Sets a custom CSS class for the background. Keep in mind that if `backgroundClass` is provided then `background` option is ignored.

##### `image`
*URL* of the image to show. It supports both raster images and vectorial SVGs. You can use *base64* encoding too (the default value is actually a *base64* representation of a SVG image). Set to an empty string `""` or `false` to show no image.

##### `imageAnimation`
Controls the animation of the *image* element. See [animations](#animations).

##### `imageAutoResize`
Controls the auto resizing of the *image* element. Set to `false` to disable it.

##### `imageResizeFactor`
Controls the proportion between the *image* element and the [size](#size) parameter.

##### `imageColor`
Image *fill* color. This setting has effect only on *SVG* images and will be useless with raster images *(JPG, PNG, GIF, etc.)*. You can use any CSS valid expression, included `rgba()`. Note that if `imageClass` is provided then `imageColor` is ignored.

##### `imageClass`
Sets a custom CSS class for the *image* element. Note that if `imageClass` is provided then `imageColor` is ignored.

##### `imageOrder`
Sets the order of the *image* element relative to the others.

##### `fontawesome`
**Class(es)** of the [Font Awesome](https://fortawesome.github.io/Font-Awesome/) icon to use. Note that you must include Font Awesome in your project if you wish to use this feature. Use an empty string `""` or `false` to disable the feature.

##### `fontawesomeAutoResize`
Controls the auto resizing of the *fontawesome* element. Set to `false` to disable it.

##### `fontawesomeResizeFactor`
Controls the proportion between the *fontawesome* element and the [size](#size) parameter.

##### `fontawesomeColor`
Sets the color of the *fontawesome* element. You can use any CSS valid expression, included `rgba()`.

##### `fontawesomeOrder`
Sets the order of the *fontawesome* element relative to the others.

##### `custom`
A *DOM element*, *jQuery object* or plain *HTML* to append to the LoadingOverlay. Use an empty string `""` or `false` to disable the feature.

##### `customAnimation`
Controls the animation of the *custom* element. See [animations](#animations).

##### `customAutoResize`
Controls the auto resizing of the *custom* element. Set to `false` to disable it.

##### `customResizeFactor`
Controls the proportion between the *custom* element and the [size](#size) parameter.

##### `customOrder`
Sets the order of the *custom* element relative to the others.

##### `text`
Displays a *text* element in the LoadingOverlay. Use an empty string `""` or `false` to disable the feature.

##### `textAnimation`
Controls the animation of the *text* element. See [animations](#animations).

##### `textAutoResize`
Controls the auto resizing of the *text* element. Set to `false` to disable it.

##### `textResizeFactor`
Controls the proportion between the *text* element and the [size](#size) parameter.

##### `textColor`
Sets the color of the *text* element. You can use any CSS valid expression, included `rgba()`. Note that if `textClass` is provided then `textColor` is ignored.

##### `textClass`
Sets a custom CSS class for the *text* element. Note that if `textClass` is provided then `textColor` is ignored.

##### `textOrder`
Sets the order of the *text* element relative to the others.

##### `progress`
Displays a *progress bar* element in the LoadingOverlay. Use `false` to disable the feature.

##### `progressAutoResize`
Controls the auto resizing of the *progress* element. Set to `false` to disable it.

##### `progressResizeFactor`
Controls the proportion between the *progress* element and the [size](#size) parameter.

##### `progressColor`
Sets the color of the *progress* element. You can use any CSS valid expression, included `rgba()`. Note that if `progressClass` is provided then `progressColor` is ignored.

##### `progressClass`
Sets a custom CSS class for the *progress* element. Note that if `progressClass` is provided then `progressColor` is ignored.

##### `progressOrder`
Sets the order of the *progress* element relative to the others.

##### `progressSpeed`
Controls the animation speed in **milliseconds** of the progress bar when its value is updated. Set to `0` to disable smooth animation.

##### `progressMin`
Sets the minimum value for the *progress* element.

##### `progressMax`
Sets the maximum value for the *progress* element.

##### `size`
Size of elements in **percentage** relative to the LoadingOverlay. Note that the computed value will be constrained between `minSize` and `maxSize`. Each element will then be resized according to the computed value and its *Resize Factor*.
Use `0` or `false` if you wish to fully control the size of the elements via custom classes.

##### `minSize`
Minimun size of elements in **pixels**. Set it to `0` or `false` for no limit.

##### `maxSize`
Maximun size of elements in **pixels**. Set it to `0` or `false` for no limit.

##### `direction`
Sets the arrangement of the elements in the LoadingOverlay. It can be `"column"` or `"row"`.

##### `fade`
Controls the *fade in* and *fade out* durations. Use `0` or `false` to disable it *(meaning a zero duration)*, an *integer* or *string* to set equal *fade in* and *fade out* times *(ie. `400` or `"fast"` or `"slow"`)* or a two-elements *array* to set respectively *fade in* and *fade out* durations *(ie. `[600, 300]`)*. Boolean value `true` will be treated like default value `[400, 200]`.

##### `resizeInterval`
Specifies an interval in **milliseconds** to resize and reposition the LoadingOverlay according to its container. This is useful when the container element changes size and/or position while the LoadingOverlay is being shown. Set it to `0` or `false` to disable this feature.

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
*xx March 2018* - [Version 2.0.0](/posts/jquery-loading-overlay-2.0.0/)
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
