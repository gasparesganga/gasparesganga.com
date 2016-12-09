---
layout      : post
title       : jQuery LoadingOverlay 1.5.2
description : Default zIndex value
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


A few users reported that LoadingOverlay *doesn't work* using the default values when used together with Bootstrap, because of its wide use of `z-index` values.
That was the reason I had introduced a `zIndex` option in the first place, thus it makes sense to initialize it to a higer value instead of `undefined`, so who is using Bootstrap will have a LoadingOverlay working *out-of-the-box*.


### What's new in version 1.5.2

- Option `zIndex` now defaults to `9999`




## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
