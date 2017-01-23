---
layout      : post
title       : jQuery MessageBox 2.2.0
description : Added filters before deferred handlers
tags        : [Releases, Javascript, jQuery, Plugin, MessageBox, Modal, Dialog, Alert, Confirm, Prompt]
---


A feature some users might have missed until now is the possibility to execute some kind of *check* on the user's input before actually executing the `.done()` or `.fail()` handlers.
Version 2.2.0 makes up for that, as well as adding a couple of nice new features and fixes.

### What's new in version 2.2.0
- Filters
- Inputs *autotrim*
- Error message
- Default keycodes for buttonDone
- Minor CSS fix
- Minor focus fix

##### Filters
Brand new options `doneFilter` and `failFilter` have been added. You can pass some functions to be executed **before** the deferred is resolved or rejected, optionally keeping the deferred in the *pending* and preventing the execution of the deferred's handlers. See [Filters](/labs/jquery-message-box/#filters) for the detailed documentation.

##### Inputs *autotrim*
Input types `"text"` and `"password"` can now be *trimmed* auotmatically before passing the values to the deferred handlers. See [custom inputs configuration](/labs/jquery-message-box/##custom-inputs-configuration) for details.

##### Error message
From a `doneFilter` or `failFilter` function you can return a *string* representing an *error message* that will be displayed to the user. 

##### Default keycodes for buttonDone
When only a single `buttonDone` is displayed and `buttonFail` is disabled, the *Escape* key (keyCode `27`)* will also trigger the `.done()` handler.

##### Minor CSS fix
Added a `margin-bottom` for buttons *(moved away from buttons parent padding)* in the default CSS file. Now large buttons will stack one over the other nicely if the MessageBox width isn't enough to contain them on one line.

##### Minor focus fix
The focus was being removed from an existing MessageBox input if another MessageBox was created and queued while the former one was displayed. This kind of *corner case* is now fixed.


## Download and documentation

Go to the Lab page: [MessageBox](/labs/jquery-message-box/)
