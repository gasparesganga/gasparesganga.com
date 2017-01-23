---
layout      : lab
title       : jQuery MessageBox
description : A jQuery Plugin to replace Javascript's window.alert(), window.confirm() and window.prompt() functions
updated     : 2017-01-23
getit       :
  github        : gasparesganga/jquery-message-box
  download      : true
  npm           : gasparesganga-jquery-message-box
  bower         : gasparesganga-jquery-message-box
  cdn           :
    name   : jquery.messagebox
    files  : [messagebox.min.js, messagebox.css]

assets      :
  css   :
    - jquery-message-box/_assets/messagebox.css
    - jquery-message-box/_assets/demo.css
  js    :
    - js/jquery-3.1.1.min.js
    - jquery-message-box/_assets/messagebox.min.js
    - jquery-message-box/_assets/demo.js
---


{% capture current_date %}{{'now' | date: '%s'}}{% endcapture %}
{% capture expire_date %}{{'2017-02-28' | date: '%s'}}{% endcapture %}
{% if current_date < expire_date %}
<div class="alert">
    <b>23 January 2017 :</b> Version 2.2.0 released: see <a href="/posts/jquery-message-box-2.2.0">release notes</a>
</div>
{% endif %}


## Contents
- [Quick Demo](#quick-demo)
- [Get it](#get-it)
- [Features](#features)
- [Methods](#methods)
- [Options and defaults values](#options-and-defaults-values)
- [Custom Buttons configuration](#custom-buttons-configuration)
- [Custom Inputs configuration](#custom-inputs-configuration)
- [Handlers](#handlers)
- [Filters](#filters)
- [Examples](#examples)
- [Why this name?](#why-this-name)
- [History](#history)
- [Comments and Ideas](#comments-and-ideas)


## Quick Demo
{% include_relative _demo.html demo="quick_demo" %}


## Get it
{% include getit.html %}


## Features
- Substitutes Javascript's window.alert(), window.confirm() and window.prompt() functions
- Implements [jQuery Promise interface](https://api.jquery.com/category/deferred-object/)
- Customizable [buttons](#custom-buttons-configuration) and [inputs](#custom-inputs-configuration)
- Flexible *message-queue*
- Fully CSS customizable



## Methods
There are two methods, one display a MessageBox and one to set the default parameters.

#### *$.MessageBox([options])*
Shows a MessageBox. The `options` parameter is optional and can be either a plain **object** with some [options](#options-and-defaults-values) or a *string* which will be assumed as [message](#message).
This method implements [jQuery Promise interface](https://api.jquery.com/category/deferred-object/), so you can use `.done()`, `.fail()`, `.always()` and even chain multiple promises with `.then()`. See the [handlers](#handlers) section.

#### *$.MessageBoxSetup(options)*
Set default [options](#options-and-defaults-values) for all future calls to **`$.MessageBox([options])`**.




## Options and defaults values
```javascript
buttonDone   : "OK"         // String / Object / Boolean
buttonFail   : undefined    // String / Object / Boolean
buttonsOrder : "done fail"  // String
customClass  : ""           // String
filterDone   : undefined    // Function/Deferred
filterFail   : undefined    // Function/Deferred
input        : false        // Boolean / String / Array / Object / jQuery object / DOM element
message      : ""           // String / jQuery object / DOM Element
queue        : true         // Boolean
speed        : 200          // Integer / String
top          : "25%"        // Integer / String
width        : undefined    // Integer / String
```

##### `buttonDone`
If a ***string*** is provided, a button with the specified text which executes the [done handler](#handlers) will be shown. By default the *Enter* key *(keyCode `13`)* and the *Escape* key *(keyCode `27`)* too in case `buttonFail` is disabled, will also trigger the [done handler](#handlers).
If an ***object*** is provided, a collection of buttons will be created, all of them triggering the [done handler](#handlers). See [custom buttons configuration](#custom-buttons-configuration) for details.
Set it to `false` to disable it *(note that disabling it will prevent any [done handler](#handlers) from being triggered)*.

##### `buttonFail`
If a ***string*** is provided, a button with the specified text which triggers the [fail handler](#handlers) will be shown. By default the *Escape* key *(keyCode `27`)* will also trigger the [fail handler](#handlers).
If an ***object*** is provided, a collection of buttons will be created, all of them triggering the [fail handler](#handlers). See [custom buttons configuration](#custom-buttons-configuration) for details.
Leave it `undefined` or set it to `false` to disable it *(note that disabling it will prevent any [fail handler](#handlers) from being triggered)*.

##### `buttonsOrder`
Defines the order in which `buttonDone` and `buttonFail` are shown from left to right: it can be `"done fail"` or `"fail done"`. This option is case insensitive and you can optionally use only the first letters if you prefer *(ie. `"df"`)*.

##### `customClass`
You can specify one or more CSS classes separated by a space here. They will be appended to the MessageBox to customize its appearance.

##### `filterDone`
Here you can pass a **function** or a **deferred** that will be executed before resolving the MessageBox deferred and calling any eventual `.done()` handler. See [Filters](#filters) for details.

##### `filterFail`
Here you can pass a **function** or a **deferred** that will be executed before rejecting the MessageBox deferred and calling any eventual `.fail()` handler. See [Filters](#filters) for details.

##### `input`
Set it to `true` to display a simple empty *textbox*, or a ***string*** to display a *textbox* with a default value.
Use an ***array*** to create multiple *textboxes* or a structured ***object*** to define a complex combination of different *inputs* and/or *select boxes*. See [custom inputs configuration](#custom-inputs-configuration) for details.
Alternatively you can also pass a *DOM element* or *jQuery object* to use your own custom input. This feature was introduced before the [custom inputs configuration](#custom-inputs-configuration) was available and it's now unlikely that you need it unless you want some very special behaviour from your inputs. Just in case, you can even pass a *collection* of *jQuery objects*, but be sure to give a **`name`** to each input.

##### `message`
Actual text of the message. Alternatively you can pass raw *HTML*, a *DOM element* or even a *jQuery object/collection*.

##### `queue`
If `true` the MessageBox will be placed into the *queue* to be shown after all the MessageBoxes created before are cleared. If `false` the current MessageBox will be **immediately placed on top** of any eventual MessageBox already shown. See it in action in [Example 3](#example-3---to-queue-or-not-to-queue).

##### `speed`
Speed in milliseconds. It is passed directly to jQuery's [.animate()](http://api.jquery.com/animate/) function, so you can use supported strings as well.

##### `top`
Distance from the top of the viewport. Set it to `"auto"` to vertically center the MessageBox, or use a numeric value *(assumed to be in **pixels**)* or any other CSS-compatible unit *(eg. `"10%"`)* to manually place it.
Note that specifying a value different than `"auto"` will imply the proportional calulation of the MessageBox's maximum height, overriding any CSS `max-height` rule *(ie. `top : "10%"` will set a `max-height` of `"85%"`)*.

##### `width`
Width of the MessageBox. You can specify an amount in pixels or any other CSS-compatible unit *(Es. `"80%"`)*.



## Custom Buttons configuration
If two simple buttons triggering the `.done()` and `.fail()` handlers are not enough, you can completely customize them using a configuration ***object*** for [buttonDone](#buttonDone) and [buttonFail](#buttonFail) options. All the button's properties are **optional**. Check [Example 4](#example-4---buttons-capabilities) to see custom buttons in action.

```javascript
// Each property represents a button. Here is a template with default values:
{
    name : {
        class   : undefined // String
        text    : ""        // String
        keyCode : undefined // Integer / String / Array
    },
    ...
}
```

You can also pass a simple *string* to the button definition instead of a complete object. In this case it will be assumed as `text` property, leaving the others undefined:

```javascript
// This as a short version:
{
    button1 : "Some caption",
    button2 : "Some other caption"
}

// This is slightly longer, but it's the exact same:
{
    button1 : {
        text    : "Some caption"
    },
    button2 : {
        text    : "Some other caption"
    }
}
```

##### `name`
Each object represents a button. Its `name` will be returned as [button](#button) argument for the [handler function](#handlers).

##### `class`
You can specify one or more CSS classes separated by a space to customize the button. See [Example 7](#example-7---customize-it).

##### `text`
The actual text of the button.

##### `keyCode`
The keyboard's [keyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Value_of_keyCode) associated to the button. It can be either an `integer` *(`strings` will be converted into `integers`)* or an ***array*** to specify multiple key codes.



## Custom Inputs configuration
The [input](#input) option is very versatile. It can accept a ***boolean*** or a ***string*** to show a simple *textbox*, an ***array*** to create multiple textboxes in the most simple and straightforward way, or an ***object*** to define complex of different *inputs* and/or *select boxes*, providing additional properties.
All the input's properties are **optional** *(in case of `selects` a warning will be thrown if no `option` is provided, though)*. Check [Example 5](#example-5---inputs-capabilities) to see custom inputs in action.

```javascript
// Array: each element represents a textbox's default value. You can use empty strings if you don't want to set any default value:
["default value 1", "default value 2", "default value 3" ... ]

// Object: each property represents an <input> or <select>. Additional details may be provided. Here is a template with default values:
{
    name : {
        type        : "text"            // String
        label       : undefined         // String
        title       : undefined         // String
        default     : undefined         // String
        autotrim    : true              // Boolean      - Only applicable to type == "text or "password"
        maxlength   : undefined         // Integer      - Only applicable to type == "text or "password"
        options     : {"" : "&nbsp;"}   // Object/Array - Only applicable to type == "select"
    },
    ...
}
```

##### `name`
Each object represents an input/select. Its `name` will be returned as a `key` of the [data](#data) object passed to the [handler function](#handlers).

##### `type`
It can be `"text"`, `"password"` or `"select"`. Default is `"text"`.

##### `label`
If provided, the input/select will be wrapped by a `<label>` having this value as caption.

##### `title`
If provided, the input/select will have this value as `title` and `placeholder` *HTML attributes*.

##### `default`
You can use this property to provide a default value. In case of a `select` type the **value** of the default option here, not the text.

##### `autotrim`
Only applicable to `"text"` and `"password"` types. If set to `true` it will auotmatically remove spaces, non-breaking spaces and tabs from the beginning and the end of the inputted string value.

##### `maxlength`
Only applicable to `"text"` and `"password"` types. If provided, sets a maximum length for the typed string.

##### `options`
Only applicable to `"select"` types. It can be either an ***object*** or an ***array***. *HTML* is supported for values.

```javascript
// Object: you can specify values and displayed texts separately
{
    "value1"  : "Displayed text 1",
    "value2"  : "Displayed text 2",
    "value3"  : "Displayed text 3"
    ...
}

// Array: values are the same as displayed texts
[
    "value1", "value2", "value3" ... ]
]
```



## Handlers

The **`$.MessageBox([options])`** method returns a *jQuery promise*, which means you can attach one or more *handlers* using [.done()](https://api.jquery.com/deferred.done/), [.fail()](https://api.jquery.com/deferred.fail/), [.always()](https://api.jquery.com/deferred.always/) and [.then()](https://api.jquery.com/deferred.then/).
Every *handler* function will be provided with two arguments: `data` and `button`.

```javascript
$.MessageBox({
    input    : true,
    message  : "Some message"
}).done(function(data, button){
    // Check data and button values
    console.log(data);
    console.log(button);
});
```

#### `data`
It holds the input value(s) provided by the user. In case of a simple `textbox` *(ie. the `input` parameter was set simply to `true`)* it returns the actual ***string*** typed by the user.
If multiple inputs were defined using [custom inputs configuration](#custom-inputs-configuration), it returns an ***object*** having the names of the inputs as keys and the values typed/chosen by the user as values.

#### `button`
If you have defined a [custom buttons configuration](#custom-buttons-configuration) it returns the `name` of the clicked button, otherwise it will default to `"buttonDone"` or `"buttonFail"`.



## Filters
Filters functions can be defined using the `filterDone` and `filterFail` options. You can pass either a *Function* or a *Deferred*/*Promise*.

#### Function
If a *Function* is used, its return value determines the outcome of the filter:

###### Boolean value `false`
The execution is blocked and the MessageBox remains visible.

###### *String* or *(jQuery) Object*
The *String*, *DOM Object/Collection* or *jQuery Object/Collection* is appended to an error message, the execution is blocked and the MessageBox remains visible.

###### Javascript [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object
The `Error.message` property is used as error message, the execution is blocked and the MessageBox remains visible. Note that to be recognized as such, jQuery 1.9.0+ is required.

###### Anything else
The filter is ignored and the execution continue normally.


#### Deferred or Promise
If you prefer to use a *Deferred* or a *Promise* object as `filterDone` or `filterFail` *(maybe you want to perform an Ajax call to validate the inputs)*, its resolved or rejected status represents the outcome of the filter.

##### Rejected
The execution is blocked and the MessageBox remains visible. You can pass an optional *String*, a *DOM Object/Collection* or a *jQuery Object/Collection* that will be appended to an error message.

##### Resolved
The filter is ignored and the execution continue normally.


Due to the great flexibility offered, it sounds more complicated than it really is. Check [Example 6](#example-6---filters-and-validation) to see filters in action.




## Examples

### Example 1 - Substitute for Alert(), Confirm(), Prompt()
```javascript
// Alert
$.MessageBox("A plain MessageBox can replace Javascript's window.alert(), and it looks definitely better...");

// Confirm
 $.MessageBox({
    buttonDone  : "Yes",
    buttonFail  : "No",
    message     : "This looks better than a window.confirm(), don't you agree?"
}).done(function(){
    $.MessageBox("Me too!");
}).fail(function(){
    $.MessageBox("Yeah, sure... you IE6 nostalgic!");
});

// Prompt
$.MessageBox({
    input    : true,
    message  : "What's your name?"
}).done(function(data){
    if ($.trim(data)) {
        $.MessageBox("Hi <b>"+data+"</b>!");
    } else {
        $.MessageBox("You are a mysterious one...");
    }
});
```
{% include_relative _demo.html demo="example1" %}


### Example 2 - Build a wrapper function for common cases
If you feel lazy or often need the same option, you can use some *wrapper functions*:

```javascript
// Wrapper functions
function MessageBoxConfirm(message){
    return $.MessageBox({
        buttonDone  : "Yes",
        buttonFail  : "No",
        message     : message
    });
}

function MessageBoxPrompt(message){
    return $.MessageBox({
        input   : true,
        message : message
    });
}

// Concise Confirm
MessageBoxConfirm("Is this simple enough?").done(function(){
    // Do something in response to YES
}).fail(function(){
    // Do something in response to No
});

// Concise Prompt
MessageBoxPrompt("Give me some data:").done(function(data){
    // Do something with this data
});
```
{% include_relative _demo.html demo="example2" %}


### Example 3 - To *queue* or not to *queue*?
The [`queue`](#queue) option controls whether the MessageBox has to be placed in the *queue* after the other MessageBoxes already created, or it must take precedence and be shown **immediately** and **on top**.

```javascript
// Just a regular MessageBox, all options to default
$.MessageBox("First");

// The same as the first one, it goes to the queue after it
$.MessageBox("Second");

// Now the interesting one: setting queue to false will show this MessageBox immediately on top of the others
$.MessageBox({
    message : "Third",
    queue   : false
});
```
{% include_relative _demo.html demo="example3" %}


### Example 4 - Buttons capabilities
Try all the different buttons modes. The executed handler and selected button will be logged in the box below.

```javascript
// Simple buttons: pass a string to buttonDone and buttonFail
$.MessageBox({
    buttonDone  : "OK",
    buttonFail  : "Cancel",
    message     : "Some message..."
}).done(function(data, button){
    console.log("Handler: .done()");
    console.log("Button: " + button);
}).fail(function(data, button){
    console.log("Handler: .fail()");
    console.log("Button: " + button);
});

// Custom buttons: use a configuration object
$.MessageBox({
    buttonDone  : {
        one : {
            text    : "1 - Nice",
            keyCode : [49, 97]
        },
        two : {
            text    : "2 - Super",
            keyCode : [50, 98]
        },
        three : {
            text    : "3 - Great",
            keyCode : [51, 99]
        }
    },
    buttonFail  : {
        zero : {
            text    : "0 - Meh",
            keyCode : [48, 96]
        },
    },
    buttonsOrder    : "fail done",
    message         : "How do you like it?<br>Click a button or press keys 0 to 3 on your keyboard:"
}).done(function(data, button){
    console.log("Handler: .done()");
    console.log("Button: " + button);
}).fail(function(data, button){
    console.log("Handler: .fail()");
    console.log("Button: " + button);
});

// Shorthand: define only the buttons' name and text
$.MessageBox({
    buttonDone  : {
        yes         : "Yes",
        maybe       : "Maybe"
    },
    buttonFail  : {
        no          : "No"
    },
    message     : "Will you marry me?"
}).done(function(data, button){
    console.log("Handler: .done()");
    console.log("Button: " + button);
}).fail(function(data, button){
    console.log("Handler: .fail()");
    console.log("Button: " + button);
});
```
{% include_relative _demo.html demo="example4" %}


### Example 5 - Inputs capabilities
Here is a demonstration of the input capabilities. Values will appear in the box below.

```javascript
// Simple textbox
$.MessageBox({
    input    : true,
    message  : "Input some string:"
}).done(function(data){
    console.log(data);
});

// Simpe textbox with default value
$.MessageBox({
    input    : "Some default value",
    message  : "Input some string (again):"
}).done(function(data){
    console.log(data);
});

// Multiple textboxes with default values
$.MessageBox({
    input    : ["Default value 1", "Default value 2", ""],
    message  : "Now let's try with three simple textbox.<br>For the first two a default value is provided:"
}).done(function(data){
    console.log(data);
});

// Multiple inputs of different types
$.MessageBox({
    message : "<b>Here is a complex form with different input types!</b>",
    input   : {
        text1    : {
            type        : "text",
            label       : "Some text:",
            title       : "Input some text"
        },
        text2    : {
            type        : "text",
            label       : "Some other text (max 10 characters and default value):",
            title       : "Input some other text",
            default     : "Hi!",
            maxlength   : 10
        },
        password : {
            type    : "password",
            label   : "Secret password:",
            title   : "Type password here"
        },
        select1 : {
            type    : "select",
            label   : "Select with values same as displayed texts:",
            title   : "Select a letter",
            options : ["A", "B", "C", "D", "E"]
        },
        select2 : {
            type    : "select",
            label   : "Select with values and texts specified and a default choice selected:",
            title   : "Select S",
            options : {
                "A"   : "Letter A",
                "B"   : "Letter B",
                "C"   : "Letter C",
                "D"   : "Letter D",
                "E"   : "Letter E"
            },
            default : "C"
        }
    }
}).done(function(data){
    console.log(data);
});

// Custom DOM/jQuery Element
var select = $("<select>", {
    css : {
        "width"         : "100%",
        "margin-top"    : "1rem"
    }
});
select.append("<option>Option One</option>");
select.append("<option>Option Two</option>");
select.append("<option>Option Three</option>");
$.MessageBox({
    message : "Choose an Option:",
    input   : select
}).done(function(data){
    console.log(data);
});
```
{% include_relative _demo.html demo="example5" %}


### Example 6 - Filters and validation
```javascript
// Simple
$.MessageBox({
    buttonDone      : "OK",
    buttonFail      : "Cancel",
    message         : "You won't be able to continue unless you enter some string here:",
    input           : true,
    filterDone      : function(data){
        if (data === "") return false;
    }
});

// Error
$.MessageBox({
    buttonDone      : "OK",
    buttonFail      : "Cancel",
    message         : "If you don't compile both fields an error message will pop up:",
    input           : ["", ""],
    filterDone      : function(data){
        if (data[0] === "") return "Please fill the first input";
        if (data[1] === "") return "Please fill the second input";
    }
});

// Ajax
$.MessageBox({
    buttonDone      : "OK",
    buttonFail      : "Cancel",
    message         : "You can even perform an ajax request<br>to validate the inputs:",
    input           : {
        username : {
            type    : "text",
            label   : "Username (user):",
            title   : "Username"
        },
        password : {
            type    : "password",
            label   : "Password (secret):",
            title   : "Password"
        }
    },
    filterDone      : function(data){
        // Note the use of ".then()" instead of ".done()" to return a new promise
        return $.ajax({
            url     : "login_1.php",
            type    : "post",
            data    : data
        }).then(function(response){
            if (response == false) return "Wrong username or password";
        });
    }
});

// Ajax with HTTP status code
$.MessageBox({
    buttonDone      : "OK",
    buttonFail      : "Cancel",
    message         : "A better example, using HTTP status codes:",
    input           : {
        username : {
            type    : "text",
            label   : "Username (user):",
            title   : "Username"
        },
        password : {
            type    : "password",
            label   : "Password (secret):",
            title   : "Password"
        }
    },
    filterDone      : function(data){
        // Note the use of ".then()" instead of ".done()" to return a new promise
        return $.ajax({
            url     : "login_2.php",
            type    : "post",
            data    : data
        }).then(function(){
            // HTTP status code 200: Login OK
            return true;
        }, function(jqXHR, textStatus, errorThrown){
            // Any other HTTP status code: Login failed
            return "Message from server (" + jqXHR.status + "):<br>" + jqXHR.responseText;
        });
    }
});
```

Here is a server-side PHP example for the simple **Ajax** validation:
```php
<?php
    // Some "very secure" check going on here...
    echo ($_POST['username'] != 'user' || $_POST['password'] != 'secret') ? 0 : 1;
    });
?>
```

And here is another server-side PHP example for the **Ajax with HTTP status code** validation:
```php
<?php
    // Again, the check is likely to be performed against a Database,
    // but you get the idea about HTTP headers nonetheless
    if ($_POST['username'] != 'user' || $_POST['password'] != 'secret') {
        header($_SERVER['SERVER_PROTOCOL'].' 401', true, 401);
        exit('Wrong username or password');
    }
    ?>
});
```
{% include_relative _demo.html demo="example6" %}


### Example 7 - Customize it!
You can customize the whole MessageBox using the `customClass` option.
Or you can customize single buttons using the `class` property in the button definition. Don't forget to use the `.messagebox_buttons` in your CSS in this case! See the example code:

```javascript
// Custom MessageBox
$.MessageBox({
    customClass : "custom_messagebox",
    message     : "You can customize the MessageBox using the <i>customClass</i> option"
});

// Custom Buttons
$.MessageBox({
    buttonDone  : {
        cool : {
            text    : "Cool",
            class   : "custom_button",
            keyCode : 13
        }
    },
    buttonFail  : "Boring",
    message     : "You can customize single buttons using their <i>class</i> property"
});
```

CSS:

```css
.custom_messagebox {
    background-color    : #ddf0b0;
    border              : 1px solid #99bb55;
}
    .custom_messagebox .messagebox_buttons {
        background-color    : #ccea88;
        border-top          : 1px solid #99bb55;
    }


/* DON'T FORGET TO USE ".messagebox_buttons" CLASS HERE! */
.messagebox_buttons .custom_button {
        color               : #ffffff;
        background-color    : #0a66cc;
    }
        .messagebox_buttons .custom_button:hover {
            color               : #ffffff;
            background-color    : #4088cc;
        }
        .messagebox_buttons .custom_button:active {
            color               : #ffffff;
            background-color    : #0055aa;
            box-shadow          : none;
        } 
```
{% include_relative _demo.html demo="example7" %}


### Example 8 - Set Defaults
Using the [**`$.MessageBoxSetup(options)`**](#messageboxsetupoptions) method you can change the default values for all the MessageBox created in the future:

```javascript
$.MessageBoxSetup({
    buttonDone  : "Got it!",
    speed       : 300,
    top         : "auto"
});
```



## Why this name?
My little personal tribute to Visual Basic 6 `MsgBox()` function.


## History
*23 January 2017* - [Version 2.2.0](/posts/jquery-message-box-2.2.0/)
*12 November 2016* - [Version 2.1.0](/posts/jquery-message-box-2.1.0/)
*18 October 2016* - [Version 2.0.1](/posts/jquery-message-box-2.0.1/)
*9 August 2016* - [Version 2.0.0](/posts/jquery-message-box-2.0.0/)
*7 January 2016* - [Version 1.1](/posts/jquery-message-box-version-1.1/)
*29 April 2015* - [Version 1.0](/posts/jquery-message-box-release/)
