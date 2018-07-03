---
layout      : post
title       : jQuery LoadingOverlay 2.1.5
description : Change visibility according to target element and clear orphaned intervals
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


### What's fixed in version 2.1.5
- Toggle LoadingOverlay visibility according to target element
- Clear orphaned intervals when target element is arbitrary removed from DOM

#### Toggle LoadingOverlay visibility according to target element
Sometimes a target element can be temporarily hidden *(eg. inside a tab panel)*, so LoadingOverlay now toggles his shown/hidden status according to that.
The idea came from an user with this [pull request](https://github.com/gasparesganga/jquery-loading-overlay/pull/35). I changed it a bit to better fit into the repository code.

#### Clear orphaned intervals when target element is arbitrary removed from DOM
This is something that went unnoticed with [2.1.1 bugfix](/posts/jquery-loading-overlay-2.1.1/). LoadingOverlays were being removed but left orphaned intervals still running wild in the browser. They are tamed now.


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
