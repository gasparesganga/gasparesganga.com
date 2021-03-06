---
layout      : lab
title       : jQuery PopupWindow
description : The ultimate popup/dialog/modal jQuery plugin
updated     : 2016-08-13
getit       :
  github        : gasparesganga/jquery-popup-window
  download      : true
  npm           : gasparesganga-jquery-popup-window
  bower         : gasparesganga-jquery-popup-window
  #cdn           :
  #  name    : gasparesganga-jquery-popup-window
  #  version : 1.0.3
  #  files   : [src/popupwindow.min.js, src/popupwindow.css]

assets      :
  css   :
    - jquery-popup-window/_assets/popupwindow.css
    - jquery-popup-window/_assets/demo.css
  js    :
    - js/jquery-3.1.0.min.js
    - jquery-popup-window/_assets/popupwindow.min.js
    - jquery-popup-window/_assets/demo.js
---


{% capture current_date %}{{'now' | date: '%s'}}{% endcapture %}
{% capture expire_date %}{{'2016-10-01' | date: '%s'}}{% endcapture %}
{% if current_date < expire_date %}
<div class="alert">
    <b>13 August 2016 :</b> Version 1.0.3 released. See <a href="/posts/jquery-popup-window-1.0.3/">release notes</a>.
</div>
{% endif %}


## Contents
- [Quick Demo](#quick-demo)
- [Get it](#get-it)
- [Features](#features)
- [Methods](#methods)
- [Actions](#actions)
- [Options and defaults values](#options-and-defaults-values)
- [Events](#events)
- [Customization](#customization)
- [Examples](#examples)
- [History](#history)
- [Comments and Ideas](#comments-and-ideas)


## Quick Demo
{% include_relative _demo.html demo="quick_demo" %}


## Get it
{% include getit.html %}


## Features

* All the capabilities *(maximizing, minimizing, modal/non-modal, etc.)* you would expect from a regular window and more *(collapsing, keepInViewport, animations, etc.)*
* Exhaustive set of [Actions](#actions) to control it
* Exhaustive set [Events](#events) to interact with it
* Fully CSS customizable
* Low footprint and great performances



## Methods

### *$(selector).PopupWindow([action] [,options])*
This is the main method. It supports different *actions* and provides the interaction with the PopupWindow. See the [Actions](#actions) section for more details.

### *$.PopupWindowSetup(options)*
Changes the default `options` for all the PopupWindow [initialized](#init) in the future.

### *$.PopupWindowMinimizedArea(options)*
Changes the position of the *minimized area* in the browser's window where all the PopupWindows are minimized. The `options` object can contain one or both of the following properties *(the default values are shown here)*:

```javascript
{
    position    : "bottom left"   // String
    direction   : "horizontal"    // String
}
```

For the `position` value you can use a combination of *`top`* or *`bottom`* for vertical placement and *`left`* or *`right`* for horizzontal placement
For the `direction` value you can use either *`horizzontal`* or *`vertical`*.
Both of them are case insensitive. Words' order doesn't matter, as well as spaces. You can shorten the words if you prefer: `top left` is the same as `tl` and `v` is the same as `vertical`.



## Actions
The **`$(selector).PopupWindow([action] [,options])`** method supports the following *actions*:

##### Init
**`$(selector).PopupWindow("init" [,options])`**
**`$(selector).PopupWindow([options])`**
Initializes a new PopupWindow. Optionally you can pass a some [options](#options-and-defaults-values) to override the default values. The `init` string can be omitted, this is the default action. If a PopupWindow has already been initialized for the matched element, it does nothing. It is **chainable** and returns all the elements matched by `selector`.

##### Open
**`$(selector).PopupWindow("open")`**
Opens a previously initialized and closed PopupWindow. If the PopupWindow was in *collapsed* or *minimized* state when it was closed, the *normal* state will be restored. If the PopupWindow is already opened, nothing will happen. It is **chainable** and returns all the elements matched by `selector`.

##### Close
**`$(selector).PopupWindow("close")`**
Closes an open PopupWindow. It's equivalent to a click on the *close button* in the titlebar. If the PopupWindow is already in *closed* state, nothing will happen. It is **chainable** and returns all the elements matched by `selector`.

##### Maximize
**`$(selector).PopupWindow("maximize")`**
Maximizes an open PopupWindow. It's equivalent to a click on the *maximize button* in the titlebar. Note that a *closed*, *collapsed*, *minimized* or already *maximized* PopupWindow can't be maximized, thus nothing will happen in these cases. It is **chainable** and returns all the elements matched by `selector`.

##### Unmaximize
**`$(selector).PopupWindow("unmaximize")`**
Unmaximizes a maximized PopupWindow. It's equivalent to a click on the *unmaximize button* in the titlebar. If the PopupWindow is not in *maximized* state, nothing will happen. It is **chainable** and returns all the elements matched by `selector`.

##### Collapse
**`$(selector).PopupWindow("collapse")`**
Collapses an open PopupWindow. It's equivalent to a click on the *collapse button* in the titlebar. Note that a *closed*, *maximized*, *minimized* or already *collapsed* PopupWindow can't be collapsed, thus nothing will happen in these cases. It is **chainable** and returns all the elements matched by `selector`.

##### Uncollapse
**`$(selector).PopupWindow("uncollapse")`**
Uncollapses a collapsed PopupWindow. It's equivalent to a click on the *uncollapse button* in the titlebar. If the PopupWindow is not in *collapsed* state, nothing will happen. It is **chainable** and returns all the elements matched by `selector`.

##### Minimize
**`$(selector).PopupWindow("minimize")`**
Minimizes an open PopupWindow. It's equivalent to a click on the *minimize button* in the titlebar. Note that a *closed*, *collapsed* or already *minimized* PopupWindow can't be minimized, thus nothing will happen in these cases. If the PopupWindow is *maximized*, it will be restored to its normal state before minimizing. It is **chainable** and returns all the elements matched by `selector`.

##### Unminimize
**`$(selector).PopupWindow("unminimize")`**
Unminimizes a minimized PopupWindow. It's equivalent to a click on the *unminimize button* in the titlebar. If the PopupWindow is not in *minimized* state, nothing will happen. It is **chainable** and returns all the elements matched by `selector`.

##### GetPosition
**`$(selector).PopupWindow("getposition")`**
Gets the position of PopupWindow for the first element in the set of matched elements. It returns an object with numeric `top` and `left` values.

```javascript
{
    top     : numeric
    left    : numeric
}
```

##### SetPosition
**`$(selector).PopupWindow("setposition", position)`**
Sets the position of PopupWindow for all the elements in the set of matched elements. It is **chainable** and returns all the elements matched by `selector`. You can pass any *(or all)* of the following values using the `position` parameter:

```javascript
position : {
    top             : numeric, optional  // Set PopupWindow's top position 
    left            : numeric, optional  // Set PopupWindow's left position
    animationTime   : numeric, optional  // Overrides PopupWindow's animationTime for this call
}
```

##### GetSize
**`$(selector).PopupWindow("getsize")`**
Gets the size of PopupWindow for the first element in the set of matched elements. It returns an object with numeric `width` and `height` values.

```javascript
{
    width   : numeric
    height  : numeric
}
```

##### SetSize
**`$(selector).PopupWindow("setsize", size)`**
Sets the size of PopupWindow for all the elements in the set of matched elements. It is **chainable** and returns all the elements matched by `selector`. You can pass any *(or all)* of the following values using the `size` parameter:

```javascript
size : {
    width           : numeric, optional  // Set PopupWindow's width
    height          : numeric, optional  // Set PopupWindow's height
    animationTime   : numeric, optional  // Overrides PopupWindow's animationTime for this call
}
```

##### GetState
**`$(selector).PopupWindow("getstate")`**
Gets the state of PopupWindow for the first element in the set of matched elements. It returns `undefined` if PopupWindow has not been initialized on the element, or a string representing its state: `normal`, `closed`, `collapsed`, `minimized` or `maximized`.

##### SetState
**`$(selector).PopupWindow("setstate", state)`**
Sets the state of PopupWindow for all the elements in the set of matched elements. There's no difference between using this action or the corresponding specific ones *(ie. `$(selector).PopupWindow("setstate", "collapsed")` is the same as `$(selector).PopupWindow("collapse")`)*. It is **chainable** and returns all the elements matched by `selector`. You must pass a string using the `state` parameter:

```javascript
state   : string    // "normal", "closed", "maximized", "unmaximized", "collapsed", "uncollapsed", "minimized", "unminimized"
```

##### SetTitle
**`$(selector).PopupWindow("settitle", title)`**
Sets the title in the *titlebar* of PopupWindow for all the elements in the set of matched elements. It is **chainable** and returns all the elements matched by `selector`. You must pass a string using the `title` parameter.

##### StatusBar
**`$(selector).PopupWindow("statusbar", content)`**
Sets the content in the *status bar* of PopupWindow for all the elements in the set of matched elements. It is **chainable** and returns all the elements matched by `selector`. You cas pass a string or even a DOM element using the `content` parameter.

##### Destroy
**`$(selector).PopupWindow("destroy")`**
Removes a PopupWindow, restoring the content to its original parent. It is **chainable** and returns all the elements matched by `selector`.



## Options and defaults values
```javascript
title           : "Popup Window"    // String
modal           : true              // Boolean
autoOpen        : true              // Boolean
animationTime   : 300               // Integer
customClass     : ""                // String

buttons         : {
    close           : true          // Boolean
    maximize        : true          // Boolean
    collapse        : true          // Boolean
    minimize        : true          // Boolean
}
buttonsPosition : "right"           // String
buttonsTexts    : {
    close           : "Close"       // String
    maximize        : "Maximize"    // String
    unmaximize      : "Restore"     // String
    minimize        : "Minimize"    // String
    unminimize      : "Show"        // String
    collapse        : "Collapse"    // String
    uncollapse      : "Expand"      // String
}  

draggable       : true              // Boolean
dragOpacity     : 0.6               // Numeric

resizable       : true              // Boolean
resizeOpacity   : 0.6               // Numeric

statusBar       : true              // Boolean

top             : "auto"            // String/Integer
left            : "auto"            // String/Integer

height          : 200               // Integer
width           : 400               // Integer
maxHeight       : undefined         // Integer
maxWidth        : undefined         // Integer
minHeight       : 100               // Integer
minWidth        : 200               // Integer
collapsedWidth  : undefined         // Integer

keepInViewport  : true              // Boolean
mouseMoveEvents : true              // Boolean
```

##### `title`
Text appearing in the PopupWindow's *titlebar*. You can change this at any time using the [setTitle action](#settitle).

##### `modal`
Set to `true` to create a modal PopupWindow. It is possible to create other PopupWindows (modal or not) *over* a modal one. 

##### `autoOpen`
Set to `true` to trigger the [open action](#open) immediately.

##### `animationTime`
This is the duration of all the animations *(collapsing, minimizing, maximizing, etc.)* expressed in **milliseconds**.

##### `customClass`
You can specify one or more CSS classes separated by a space here. They will be appended to the PopupWindow in order to customize its appearance.

##### `buttons`
Enable/disable the corresponding button in the *titlebar*.

##### `buttonsPosition`
Controls the buttons position in the *titlebar*. I can be either `"left"` or `"right"`.

##### `buttonsTexts`
Tooltip text of the corrisponding action for the buttons in the *titlebar*.

##### `draggable`
Set to `true` to allow the users to move the PopupWindow around by clicking and dragging the *titlebar*.

##### `dragOpacity`
Opacity of the PopupWindow during the dragging.

##### `resizable`
Set to `true` to allow the users to resize the PopupWindow by its borders and the handle placed in the right corner of the *status bar*.

##### `resizeOpacity`
Opacity of the PopupWindow during the resizing.

##### `statusBar`
Set to `true` to display a *status bar* at the bottom of the PopupWindow. You can set the text/contents of the *status bar* using the [statusBar action](#statusbar).

##### `top`
Starting top position of the PopupWindow, expressed in **pixels**. Use the string `"auto"` to display the PopupWindow centered in the viewport.

##### `left`
Starting left position of the PopupWindow, expressed in **pixels**. Use the string `"auto"` to display the PopupWindow centered in the viewport.

##### `height`
Initial height of the PopupWindow, expressed in **pixels**.

##### `width`
Initial width of the PopupWindow, expressed in **pixels**.

##### `maxHeight`
If set, it forces the maximum height of the PopupWindow to this value. Expressed in **pixels**.

##### `maxWidth`
If set, it forces the maximum width of the PopupWindow to this value. Expressed in **pixels**.

##### `minHeight`
Forces the minimum height of the PopupWindow to this value. Expressed in **pixels**.

##### `minWidth`
Forces the minimum width of the PopupWindow to this value. Expressed in **pixels**.

##### `collapsedWidth`
If set, forces the width of the PopupWindow when it is in *collapsed* status, expressed in **pixels**.

##### `keepInViewport`
Set to `true` to prevent the PopupWindow to overflow the viewport. Also, if the browser's window is resized the PopupWindow will be moved accordingly.

##### `mouseMoveEvents`
Set to `true` to fire [move](#move) and [rezize](#rezize) events while the mouse pointer is moving *(`mousemove` event)*, or set to `false` to fire the events on the `mouseup` event.



## Events
All the events are fired **after** something has happened and the corresponding animation is completed. The only exceptions are `move.popupwindow` and `resize.popupwindow` events, which can be fired continuously depending on the [mouseMoveEvents](#mousemoveevents) option.
The namespace `popupwindow` is used for all the events fired by PopupWindow.

#### Open
**`$(selector).on("open.popupwindow", handler)`**
Fired when a PopupWindow is opened. No additional parameters are passed to the `handler` function.

#### Close
**`$(selector).on("close.popupwindow", handler)`**
Fired when a PopupWindow is closed. No additional parameters are passed to the `handler` function.

#### Collapse
**`$(selector).on("collapse.popupwindow", handler)`**
Fired when a PopupWindow is collapsed. No additional parameters are passed to the `handler` function.

#### Uncollapse
**`$(selector).on("uncollapse.popupwindow", handler)`**
Fired when a PopupWindow is uncollapsed. No additional parameters are passed to the `handler` function.

#### Minimize
**`$(selector).on("minimize.popupwindow", handler)`**
Fired when a PopupWindow is minimized. No additional parameters are passed to the `handler` function.

#### Unminimize
**`$(selector).on("unminimize.popupwindow", handler)`**
Fired when a PopupWindow is unminimized. No additional parameters are passed to the `handler` function.

#### Maximize
**`$(selector).on("maximize.popupwindow", handler)`**
Fired when a PopupWindow is maximized. No additional parameters are passed to the `handler` function.

#### Unmaximize
**`$(selector).on("unmaximize.popupwindow", handler)`**
Fired when a PopupWindow is unmaximized. No additional parameters are passed to the `handler` function.

#### Move
**`$(selector).on("move.popupwindow", handler)`**
Fired when a PopupWindow is moved. Additional parameter `position` is passed to the `handler` function.

#### Resize
**`$(selector).on("resize.popupwindow", handler)`**
Fired when a PopupWindow is resized. Additional parameter `size` is passed to the `handler` function.

#### Destroy
**`$(selector).on("destroy.popupwindow", handler)`**
Fired when a PopupWindow is destroyed. No additional parameters are passed to the `handler` function.



## Customization
The default CSS file is simple and well commented. It exposes all the customizable classes and is intended especially for styling *(the required CSS for layout and core is provided by the code internally)*.
You can edit the main CSS file, create a new custom one using it as a template, or override some classes/styles using an external CSS file *(in this case remember to load your CSS file **after** the default one)*.
In addition to that, you can use the [customClass](#customclass) option to apply custom styles even to a single PopupWindow, having many windows styled differently. See [Example 3](#example-3---custom-style).



## Examples

### Example 1 - Complete playground
This sample code shows all the actions available. Use the buttons below to test them and see the logged events. Note how the *implicit actions* performed interacting directly with the PopupWindow produce the same effects and events.

```javascript
// Log all Events
$("#example1").on(  
    "open.popupwindow      close.popupwindow      " +
    "collapse.popupwindow  uncollapse.popupwindow " +
    "minimize.popupwindow  unminimize.popupwindow " +
    "maximize.popupwindow  unmaximize.popupwindow " +
    "move.popupwindow      resize.popupwindow     " +
    "destroy.popupwindow",
function(event, data){
    console.log(event);
    console.log(data);
});

// Buttons to test Actions
$("#example1_init").on("click", function(event){
    if ($("#example1").PopupWindow("getState")) $("#example1").PopupWindow("destroy");
    $("#example1").PopupWindow({
        title   : "Example 1 - Complete playground",
        modal   : false,
        // .....
        // .....
    });
});
$("#example1_destroy").on("click", function(event){
    $("#example1").PopupWindow("destroy");
});

$("#example1_open").on("click", function(event){
    $("#example1").PopupWindow("open");
});
$("#example1_close").on("click", function(event){
    $("#example1").PopupWindow("close");
});

$("#example1_collapse").on("click", function(event){
    $("#example1").PopupWindow("collapse");
});
$("#example1_uncollapse").on("click", function(event){
    $("#example1").PopupWindow("uncollapse");
});

$("#example1_minimize").on("click", function(event){
    $("#example1").PopupWindow("minimize");
});
$("#example1_unminimize").on("click", function(event){
    $("#example1").PopupWindow("unminimize");
});

$("#example1_maximize").on("click", function(event){
    $("#example1").PopupWindow("maximize");
});
$("#example1_unmaximize").on("click", function(event){
    $("#example1").PopupWindow("unmaximize");
});

$("#example1_getposition").on("click", function(event){
    console.log($("#example1").PopupWindow("getPosition"));
});
$("#example1_setposition").on("click", function(event){
    $("#example1").PopupWindow("setPosition", {
        top             : 100,
        left            : 100,
        animationTime   : 500
    });
});

$("#example1_getsize").on("click", function(event){
    console.log($("#example1").PopupWindow("getSize"));
})
$("#example1_setsize").on("click", function(event){
    $("#example1").PopupWindow("setSize", {
        width           : 500,
        height          : 300,
        animationTime   : 100
    });
});

$("#example1_getstate").on("click", function(event){
    console.log($("#example1").PopupWindow("getState"));
});
$("#example1_setstate").on("click", function(event){
    $("#example1").PopupWindow("setState", "normal");
});

$("#example1_settitle").on("click", function(event){
    $("#example1").PopupWindow("setTitle", "New Title");
});

$("#example1_statusbar").on("click", function(event){
    $("#example1").PopupWindow("statusbar", "Some text...");
});

$("#example1_minimizedarea").on("click", function(event){
    $.PopupWindowMinimizedArea({
        position    : "top left",
        direction   : "vertical"
    });
});
```
{% include_relative _demo.html demo="example1" %}


### Example 2 - Modal window
A **modal** PopupWindow will be displayed over the page, but you can still open more PopupWindows on top of it.

```javascript
$("#example2_first").PopupWindow({
    title       : "Example 2 - Modal window",
    modal       : true,
    statusBar   : false,
    height      : 250,
    width       : 400,
    top         : 100,
    left        : 300
});
$("#example2_second").PopupWindow({
    title       : "Other window",
    modal       : false,
    statusBar   : false,
    top         : 400,
    left        : 100
});
$("#example2_third").PopupWindow({
    title       : "Yet another one",
    modal       : false,
    statusBar   : false,
    top         : 400,
    left        : 600
});

// Close the other PopupWindows when the modal one is closed
$("#example2_first").on("close.popupwindow", function(event){
    $("#example2_second").PopupWindow("close");
    $("#example2_third").PopupWindow("close");
});
```
{% include_relative _demo.html demo="example2" %}


### Example 3 - Custom style
If you want to apply a custom style just to a specific PopupWindow without overriding the default style for all the others, the `customClass` option comes in handy. Here is an example using the `buttonsPosition` option as well:

```javascript
$("#example3_default").PopupWindow({
    title       : "Example 3 - Default Style",
    modal       : false,
    buttons     : {
        collapse    : false
    },
    left        : 100
});
$("#example3_custom").PopupWindow({
    title           : "Example 3 - Custom Style",
    modal           : false,
    customClass     : "custom_style",
    buttons         : {
        collapse        : false
    },
    buttonsPosition : "left",
    left            : 600
});
```

And here is some CSS for this `.custom_style` class:

```css
/* Content's background */
.custom_style .popupwindow_content {
    background-color    : #f0f0f0;
}

/* Center Titlebar text */
.custom_style .popupwindow_titlebar_text {
    padding-left    : 8px;
}

/* Round buttons */
.custom_style .popupwindow_titlebar_button {
    width           : 18px;
    height          : 18px;
    margin-left     : 4px;
    border          : none;
    border-radius   : 50%;
}
    /* Button's icon on hover */
    .custom_style .popupwindow_titlebar_button svg {
        display : none; 
    }
    .custom_style .popupwindow_titlebar_button:hover svg {
        display : block; 
    }

/* Close button */
.custom_style .popupwindow_titlebar_button_close {
    background-color    : #d03020;
}
    .custom_style .popupwindow_titlebar_button_close:hover {
        background-color    : #ca3020;
        stroke              : #803020;
    }
    .custom_style .popupwindow_titlebar_button_close:active {
        background-color    : #c03020;
    }

/* Maximize button */   
.custom_style .popupwindow_titlebar_button_maximize {
    background-color    : #ffbb66;
}
    .custom_style .popupwindow_titlebar_button_maximize:hover {
        background-color    : #ee9922;
        stroke              : #885511;
    }
    .custom_style .popupwindow_titlebar_button_maximize:active {
        background-color    : #dd8811;
    }

/* Minimize button */
.custom_style .popupwindow_titlebar_button_minimize {
    background-color    : #99b055;
}
    .custom_style .popupwindow_titlebar_button_minimize:hover {
        background-color    : #77a055;
        stroke              : #223311;
    }
    .custom_style .popupwindow_titlebar_button_minimize:active {
        background-color    : #559044;
    }
```
{% include_relative _demo.html demo="example3" %}



## History
*13 August 2016* - [Version 1.0.3](/posts/jquery-popup-window-1.0.3/)
*5 August 2016* - [Version 1.0.2](/posts/jquery-popup-window-1.0.2/)
*29 July 2016* - [Version 1.0.1](/posts/jquery-popup-window-release/)
*27 July 2016* - [Version 1.0.0](/posts/jquery-popup-window-release/)
