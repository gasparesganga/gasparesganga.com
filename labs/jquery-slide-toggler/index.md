---
layout      : lab
title       : jQuery SlideToggler
description : A jQuery Plugin to turn an element into a collapsible sliding panel with a title
updated     : 2015-07-08
getit       :
  github        : gasparesganga/jquery-slide-toggler
  download      : true

assets      :
  css   :
    - jquery-slide-toggler/_assets/slidetoggler.css
    - jquery-slide-toggler/_assets/demo.css
  js    :
    - js/jquery-2.1.3.min.js
    - jquery-slide-toggler/_assets/slidetoggler.min.js
    - jquery-slide-toggler/_assets/demo.js
---


## Contents
- [Quick Demo](#quick-demo)
- [Get it](#get-it)
- [Methods](#methods)
- [Options and defaults values](#options-and-defaults-values)
- [Events](#events)
- [Examples](#examples)
- [History](#history)
- [Comments and Ideas](#comments-and-ideas)


## Quick Demo
{% include_relative _demo.html demo="quick_demo" %}


## Get it
{% include getit.html %}



## Methods

### *$(selector).SlideToggler([options])*
Initialize the SlideToggler on an element, providing some [options](#options-and-defaults-values).


### *$(selector).SlideToggler(action [,customSpeed])*
There are 4 ***actions*** available: `show`, `hide`, `status` and `remove`.

##### Show & Hide
`$(selector).SlideToggler("show" [,customSpeed])`
`$(selector).SlideToggler("hide" [,customSpeed])`
Use the actions `show` and `hide` to programmatically open and close the SlideToggler, optionally providing a `customSpeed` to override the [speed setting](#speed). A **chainable jQuery object/collection** is returned.

##### Status
`$(selector).SlideToggler("status")`
Use the action `status` to get a boolean value representing the current open *(true)* or closed *(false)* status of the SlideToggler. The return value corresponds to the **first element** in the set of matched elements.

##### Remove
`$(selector).SlideToggler("remove")`
Use the action `remove` to revert the element back to its original condition, removing the SlideToggler. A **chainable jQuery object/collection** is returned.


#### *$.SlideTogglerSetup(options)*
Set default `options` for all future calls to `$(selector).SlideToggler(options)`.



## Options and defaults values
```javascript
autoHide        : true              // Boolean
speed           : 400               // Integer/String
statusHide      : "▲"               // String
statusPosition  : "left"            // String
statusShow      : "▼"               // String
title           : "Slide Toggler"   // String
titleAlign      : "center"          // String
toggler         : true              // Boolean
toolTipHide     : "Hide"            // String
toolTipShow     : "Show"            // String
```

##### `autoHide`
Set to `true` to initialize the SlideToggler in closed status. Set to `false` to leave it open.

##### `speed`
Speed in **milliseconds**. It is passed to jQuery [.slideToggle()](http://api.jquery.com/slidetoggle/) function as `duration`, so you can use supported strings as well.

##### `statusHide`
Text/Html to show in the status when the SlideToggler is open.

##### `statusPosition`
Defines position of the status icon/text. It can be `left`, `right` or `both`.

##### `statusShow`
Text/Html to show in the status when the SlideToggler is closed.

##### `title`
The title of the SlideToggler.

##### `titleAlign`
Defines alignment of the title. It can be `left`, `center` or `right`.

##### `toggler`
Set to `false` to produce an open static SlideToggler. This can be useful for user interface purposes, i.e. you would like to apply a consistent style without actually enable any toggling functionality on some elements.

##### `toolTipHide`
Tool tip to show when mouse pointer passes over open SlideToggler.

##### `toolTipShow`
Tool tip to show when mouse pointer passes over closed SlideToggler.



## Events
See [Example 2](#example-2---events) for details, especially about `data` passed to the event handlers.

#### BeforeShow
`$(selector).on("beforeshow.slidetoggler", function(event, data){})`
Fired **before** the `show` action is performed. Actual `speed` *(default or custom one)* and `title` are passed as `data` to the event handler.

#### AfterShow
`$(selector).on("aftershow.slidetoggler", function(event, data){})`
Fired **after** the `show` action is performed. `title` is passed as `data` to the event handler.

#### BeforeHide
`$(selector).on("beforehide.slidetoggler", function(event, data){})`
Fired **before** the `hide` action is performed. Actual `speed` *(default or custom one)* and `title` are passed as `data` to the event handler.

#### AfterHide
`$(selector).on("afterhide.slidetoggler", function(event, data){})`
Fired **after** the `hide` action is performed. `title` is passed as `data` to the event handler.



## Examples

### Example 1 - Default options and get Status

##### HTML
```html
<div id="example1">
    Lorem ipsum dolor sit amet..... 
</div>
<input id="example1_button" type="button" value="Get Status">
```

##### Javascript
```javascript
$("#example1").SlideToggler({
    title   : "Example 1"
});
$("#button").on("click", function(event){
    console.log($("#example1").SlideToggler("status") ? "SlideToggler is Open" :  "SlideToggler is Closed");
});
```

##### Result
{% include_relative _demo.html demo="example1" %}



### Example 2 - Events

##### HTML
```html
<div id="example2">
    Look at the box down here, it will show the events fired
</div>
```

##### Javascript
```javascript
$("#example2").SlideToggler({
    autoHide   : false,
    speed      : 2000,
    title      : "Example 2"
}).on("beforeshow.slidetoggler", function(event, data){
    console.log("Event BeforeShow fired. Data:");
    console.log(data);
}).on("aftershow.slidetoggler", function(event, data){
    console.log("Event AfterShow fired. Data:");
    console.log(data);
}).on("beforehide.slidetoggler", function(event, data){
   console.log("Event BeforeHide fired. Data:");
   console.log(data);
}).on("afterhide.slidetoggler", function(event, data){
    console.log("Event AfterHide fired. Data:");
    console.log(data);
});
```

##### Result
{% include_relative _demo.html demo="example2" %}



### Example 3 - Using events create an accordion-like behaviour

##### HTML
```html
<div id="example3">
    <div id="example3_content1">Content 1 Content 1 Content 1 ... </div>
    <div id="example3_content2">Content 2 Content 2 Content 2 ... </div>
    <div id="example3_content3">Content 3 Content 3 Content 3 ... </div>
    <div id="example3_content4">Content 4 Content 4 Content 4 ... </div>
</div>
```

##### Javascript
```javascript
// Initialize SlideTogglers
$("#example3_content1").SlideToggler({title : "Title 1"});
$("#example3_content2").SlideToggler({title : "Title 2"});
$("#example3_content3").SlideToggler({title : "Title 3"});
$("#example3_content4").SlideToggler({title : "Title 4"});
// Use BeforeShow event to hide the other panels
$("#example3").on("beforeshow.slidetoggler", ".slidetoggler", function(event, data){
    $("#example3").find(".slidetoggler").not(event.currentTarget).SlideToggler("hide", data.speed);
});
```

##### Result
{% include_relative _demo.html demo="example3" %}



### Example 4 - Static

##### HTML
```html
<div id="example4">
    Lorem ipsum dolor sit amet.....
</div>
```

##### Javascript
```javascript
$("#example4").SlideToggler({
    title     : "Example 4",
    toggler   : false
});	
```

##### Result
{% include_relative _demo.html demo="example4" %}



### Example 5 - Playing with title and status

##### Javascript
```javascript
$("#example5_content1").SlideToggler({
    statusPosition  : "left",
    title           : "Title 1",
    titleAlign      : "left"
});
$("#example5_content2").SlideToggler({
    statusPosition  : "right",
    title           : "Title 2",
    titleAlign      : "left"
});
$("#example5_content3").SlideToggler({
    statusPosition  : "right",
    title           : "Title 3",
    titleAlign      : "right"
});
$("#example5_content4").SlideToggler({
    statusHide      : "<img src='hide.png'>",
    statusPosition  : "both",
    statusShow      : "<img src='show.png'>",
    title           : "Title 4",
    titleAlign      : "center"
});
```

##### Result
{% include_relative _demo.html demo="example5" %}



### Example 6 - Using a wrapper to manipulate width

##### HTML
```html
<div id="example6_wrapper">
    <div id="example6_content">
        Lorem ipsum dolor sit amet.....
    </div>
</div>
```

##### Javascript
```javascript
$("#example6_content").SlideToggler({
    title : "Example 6"
});
$("#example6_button").on("click", function(event){
    var wrapper = $("#example6_wrapper");
    wrapper.animate({
        width : "200px"
    }, 3000, function(){
        wrapper.animate({
            width : "100%"
        }, 3000);
    });
});
```

##### Result
{% include_relative _demo.html demo="example6" %}



### Example 7 - Create and Remove a SlideToggler

##### HTML
```html
<div id="example7">
    Lorem ipsum dolor sit amet.....
</div>
```

##### Javascript
```javascript
$("#example7_create").on("click", function(event){
    $("#example7").SlideToggler({
        title : "Example 7"
    });
});
$("#example7_remove").on("click", function(event){
    $("#example7").SlideToggler("remove");
});
```

##### Result
{% include_relative _demo.html demo="example7" %}



### Example 8 - Set defaults

##### Javascript
```javascript
$.SlideTogglerSetup({
    autoHide      : true,
    speed         : 800,
    title         : "Custom Default Title",
    titleAlign    : "Left",
    toggler       : true,
    toolTipHide   : "Hide Me!",
    toolTipShow   : "Show Me!"
});
```


## History
*8 July 2015* - [Version 1.1](/posts/jquery-slide-toggler-version-1.1/)
*3 July 2015* - [Version 1.0](/posts/jquery-slide-toggler-release/)
