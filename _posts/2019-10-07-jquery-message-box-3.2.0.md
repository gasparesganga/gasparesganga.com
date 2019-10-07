---
layout      : post
title       : jQuery MessageBox 3.2.0
description : New input types: date, time, number, color, email
tags        : [Releases, Javascript, jQuery, Plugin, MessageBox, Modal, Dialog, Alert, Confirm, Prompt]
---


Input types... input types everywhere!
This release was driven by a kind [pull request](https://github.com/gasparesganga/jquery-message-box/pull/7), which ultimately led to the inlcusion of some common `<input>` types that are widely supported by modern browsers by now.


### What's new in version 3.2.0
- Input types `"date"`, `"time"`, `"number"`, `"color"`, `"email"`
- Input `htmlAttributes` option


#### New input type `"date"`, `"time"`, `"number"`, `"color"`, `"email"`
In late 2019 it was about time to include those input types in the list. All major browsers offer a decent support for them and eventually they degrades gracefully to `<input type="text">` if not supported.

#### New input `htmlAttributes` option
All those new input types offer different HTML attributes (e.g.: `min` and `max` for `<input type="date">`). Use this option to pass an object with specific attributes. See the [documentation](/labs/jquery-message-box/#custom-inputs-configuration) for details.



## Download and documentation

Go to the Lab page: [MessageBox](/labs/jquery-message-box/)
