---
layout      : post
title       : jQuery LoadingOverlay 2.0.1
description : Yay, time to bugfix weird Edge behaviour already!
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


Right after v2.0.0 release I thought *"hey, I haven't actually tested the very final version with Chrome and Edge"*... my bad!
A couple of minor bugs were affecting v2.0.0 already, so here you are a bugfix release addressing them.

### What's been fixed in version 2.0.1
- Edge doesn't really recognize `space-evenly` as a `justify-content` possible value. Nothing lost, we like `space-around` better after all, don't we?
- Chrome needs some explicit `width` and `height` for SVG elements contained in flexbox items... I don't know why (even Edge was working as expected!) but things are fixed now.


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
