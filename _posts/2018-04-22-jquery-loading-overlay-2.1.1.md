---
layout      : post
title       : jQuery LoadingOverlay 2.1.1
description : Gracefully hides when target element is arbitrarly removed from DOM
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


### What's fixed in version 2.1.1
- Gracefully hides when target element is arbitrarly removed from DOM

#### Gracefully hides when target element is arbitrarly removed from DOM
I hadn't tought about this case, but what should happen when the target element is removed from DOM? LoadingOverlay still remained visible and *orphaned* (poor him).
Alright, one could argue that if a programmer is removing the target element he could as well hide the LoadingOverlay beforehand, but I won't go into the details right now and let's just assume it's some kind of nasty plugin on which he has no control whatsoever that is removing DOM elements.
This behaviour is now fixed and DOM is *cleaned* of orphaned LoadingOverlay floating around.


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
