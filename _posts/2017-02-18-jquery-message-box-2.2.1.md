---
layout      : post
title       : jQuery MessageBox 2.2.1
description : Tiny bugfix release
tags        : [Releases, Javascript, jQuery, Plugin, MessageBox, Modal, Dialog, Alert, Confirm, Prompt]
---


### What's new in Version 2.2.1
A minor bugfix release that addresses some event bubbling issues when keyboard is used instead of the buttons **and** there have been attached some other event handlers to the document after the MessageBox is displayed *(talk about corner cases!)*.
It was a really weird behaviour and I suspect it was related to a jQuery bug *(if you see the correction in the code you understand why)*, but honestly I haven't had time to investigate deeply on that, so let's just forget it!


## Download and documentation

Go to the Lab page: [MessageBox](/labs/jquery-message-box/)
