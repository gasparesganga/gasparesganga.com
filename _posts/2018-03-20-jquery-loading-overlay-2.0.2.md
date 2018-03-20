---
layout      : post
title       : jQuery LoadingOverlay 2.0.2
description : Because fixed positioned elements might have some margins
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


A tricky one which had been there for quite some time already. Someone was using a plugin which sets some margins for an element with `position : fixed` *(weird, but perfectly legal!)* and LoadingOverlay wasn't able to position itself correctly.

### What's been fixed in version 2.0.2
- Using `getBoundingClientRect()` instead of jQuery `.position()` when LoadingOverlay is displayed on an element with `position : fixed`


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
