---
layout      : post
title       : jQuery LoadingOverlay 2.1.4
description : Fixed corner case bug with global Ajax events
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


### What's fixed in version 2.1.4
- Replaced the `.load()` method with a custom `ajax()` request to load external SVG images in order to prevent conflicts with `ajaxStart()` and `ajaxSend()` event handlers

Using jQuery method `.load()` was causing a fuzzy behaviour (and a potential recursive chain) when a `LoadingOverlay("show")` call was being used in `ajaxStart()` or `ajaxSend()` event handlers coupled with a custom SVG file passed to the `image` parameter *(talk about corner cases...)*.
A custom ajax request taking advantage of jQuery `global` parameter fixed it. Now you can safely use LoadingOverlay in global Ajax events as [suggested in the docs](/labs/jquery-loading-overlay/#example-6---display-a-loadingoverlay-during-each-ajax-request).


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
