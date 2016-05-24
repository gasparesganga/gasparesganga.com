---
layout      : lab
title       : jQuery MessageBox
description : A jQuery Plugin to replace Javascript's window.alert(), window.confirm() and window.prompt() functions
updated     : 2016-01-07
css         :
  - jquery-message-box/_assets/messagebox.css
js          :
  - js/jquery-2.1.3.min.js
  - jquery-message-box/_assets/messagebox.min.js
  - jquery-message-box/_assets/demo.js
download    : jquery-message-box/archive/master.zip
source      : jquery-message-box
---

<div class="alert">
    <b>7 January 2016 :</b> Version 1.1 released to accomodate some requests from the users. Check <a href="/posts/jquery-message-box-version-1.1/">this post</a> for an explaination of the changes.
</div>


## Quick Demo
{% include_relative _demo.html demo="quick_demo" %}


## Features
* Substitutes Javascript's window.alert(), window.confirm() and window.prompt() functions
* Implements [jQuery Promise interface](http://api.jquery.com/category/deferred-object/)
* Fully CSS customizable



## Methods
There are two methods, one to actually call the MessageBox and one to set the default parameters.

#### *$.MessageBox(options)*
Shows the MessageBox. You can pass an `Object` with some [options](#options-and-defaults-values) or simply a `String`.
This method implements [jQuery Promise interface](http://api.jquery.com/category/deferred-object/), so you can use `.done()`, `.fail()`, `.always()` and even chain multiple handlers with `.then()`.

#### *$.MessageBoxSetup(options)*
Set default `options` for all future calls to `$.MessageBox()`.



## Options and defaults values
```javascript
buttonDone   : "OK"         // String
buttonFail   : undefined    // String
message      : ""           // String
input        : false        // Boolean/DOM Element/jQuery Object/String
speed        : 200          // Integer/String
top          : "25%"        // Integer/String
width        : undefined    // Integer/String
```

##### `buttonDone`
If provided shows a button with the specified text that triggers the `.done()` handler. The `Enter` key *(and the `Escape` one if `buttonFail` is not defined)* will trigger the `.done()` handler as well.

##### `buttonFail`
If provided shows a button with the specified text that triggers the `.fail()` handler. The `Escape` key will trigger the `.fail()` handler as well.

##### `message`
Actual text of the message. `HTML` is supported.

##### `input`
Set it to `true` to display a `textbox` or pass a DOM element, jQuery object or plain HTML to use your custom input. User's input will be passed to the `.done()` and `.fail()` handlers *(see [Example 3](#example-3---prompt) )*.

##### `speed`
Speed in milliseconds. It is passed to jQuery's [.animate()](http://api.jquery.com/animate/) function, so you can use supported strings as well.

##### `top`
Distance from the top of the viewport. You can specify an amount in pixels or any other CSS-compatible unit *(Es. `"25%"`)*.

##### `width`
Width of the MessageBox. You can specify an amount in pixels or any other CSS-compatible unit *(Es. `"80%"`)*.




## Examples

### Example 1 - Alert 
```javascript
$.MessageBox("A plain MessagBox can replace Javascript's window.alert(), and it looks definitely better...");
```
{% include_relative _demo.html demo="example1" %}


### Example 2 - Confirm
```javascript
$.MessageBox({
    buttonDone  : "Yes",
    buttonFail  : "No",
    message     : "Do you like me?"
}).done(function(){
    $.MessageBox("Thanks!");
}).fail(function(){
    $.MessageBox("Well, I don't like you either!");
});
```
{% include_relative _demo.html demo="example2" %}


### Example 3 - Prompt
```javascript
$.MessageBox({
    input    : true,
    message  : "What's your name?"
}).done(function(data){
    if ($.trim(data)) {
        $.MessageBox("Hi <b>"+data+"</b>!");
    } else {
        $.MessageBox("You are shy, aren't you?");
    }
});
```
{% include_relative _demo.html demo="example3" %}


### Example 4 - Custom input
```javascript
// Create a Select and populate it
var select = $("<select>");
select.append("<option>Option One</option>");
select.append("<option>Option Two</option>");
select.append("<option>Option Three</option>");

// Show a MessageBox with custom Input
$.MessageBox({
    message : "Choose an Option:",
    input   : select
}).done(function(data){
    $.MessageBox("You chose: " + data)
});
```
{% include_relative _demo.html demo="example4" %}


### Example 5 - Set Defaults
```javascript
$.MessageBoxSetup({
    buttonDone  : "Yes",
    buttonFail  : "No",
    speed       : 300,
    top         : "40%"
});
```



## Why this name?
My little personal tribute to Visual Basic 6 `MsgBox()` function.

