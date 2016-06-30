---
layout      : post
title       : jQuery MessageBox release
description : First public release
tags        : [Releases, Javascript, jQuery, Plugin]
---

A pretty looking alternative to Javascript's window.alert(), window.confirm() and window.prompt() functions.

There are plenty of *similar* plugins, but I wanted something different and *modern* which takes advantage of the [jQuery Promise interface](http://api.jquery.com/category/deferred-object/), giving a structured feeling to the code using it:

```javascript
$.MessageBox({
    buttonDone  : "Yes",
    buttonFail  : "No",
    message     : "Would you like to continue ..... ?"
}).done(function(){
    // Do something here
}).fail(function(){
    // Don't continue, maybe do something else
});
```


## Download and documentation

Go to the Lab page: [MessageBox](/labs/jquery-message-box/)
