---
layout      : post
title       : jQuery PopupWindow 1.0.2
description : Some useful warnings are thrown to help developers to debug their code
tags        : [Releases, Javascript, jQuery, Plugin, PopupWindow, Dialog, Modal, Popup, Window]
---

This is a tiny improvement for the plugin's code itself, but it could be a great leap for some developers's debugging.

### What's new
Some [warnings](https://developer.mozilla.org/en-US/docs/Web/API/Console/warn) are thrown when PopupWindow's actions are called on a 
Of course the only exception is the [GetState](/labs/jquery-popup-window/#getstate) action, which still returns `undefined` when called on an element where PopupWindow has not been initialized yet.
This **does not** affect in any way the user experience, they won't even notice if one of those warnings has been thrown *(unless your users have their browser's console active to check if you made some mistakes in your code...)*.


## Download and documentation

Go to the Lab page: [jQuery PopupWindow](/labs/jquery-popup-window/)
