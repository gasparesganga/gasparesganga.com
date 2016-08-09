---
layout      : post
title       : jQuery MessageBox 2.0.0
description : Some big xxxxxxxx
tags        : [Releases, Javascript, jQuery, Plugin, MessageBox, Modal, Dialog, Alert, Confirm, Prompt]
---

Time for a big makeover for **jQuery MessageBox**! Many new functionalities have been added, yet retaining the *simple-as-it-gets* philosophy that was the foundation of this plugin.
It still doesn't feel *bloated with loads of useless stuff you don't really need from an alert plugin*, but it exposes its new features using almost the same configuration options as before.
The major version change is mostly related to the breaking changes in the CSS: *classes* are now used instead of *ids*, because thanks to the brand-new `queue` option more than one MessageBox can be displayed at the same time.


### What's new in Version 2.0.0
- Custom buttons: you can now completely customize the buttons, defining as many as you like.
- Custom inputs: no more limitation to a single *textbox*! You can display multiple *textboxes* and/or *selects*.
- New option `buttonsOrder`: you can now decide the order of the buttons.
- New option `queue`: you can decide whether sending a MessageBox to the *queue* or display it immediately.
- CSS organization: all the *required* CSS is now provided by the Javascript code, leaving only the customizable *classes* in the external CSS file.


### Breaking changes since versions 1.x
- CSS *classes* instead of *ids*. Please note that this is absolutely **NOT** related to the foolish *never use ids in your CSS* guidelines that CSS linters give. Those are as dumb as they sound *(W3C standards are available for everybody, no need to argumentate here)*. This change was a **need** since the introduction of the `queue` option.
- Maybe some other little things (read: *"since I was set to release a new major version I didn't care about breaking changes at all*).


## Download and documentation

Go to the Lab page: [MessageBox](/labs/jquery-message-box/)
