---
layout      : post
title       : jQuery LoadingOverlay version 1.4.0
description : CDN, imagePosition option and more
tags        : [Javascript, jQuery, Plugin, LoadingOverlay]
---


Time for big *(only formal, don't you worry)* changes with my versioning system!
I've decided to make my releases compliant with [SemVer](http://semver.org/). Current version is **1.4.0** instead of just **1.4**, not a big deal actually. My bad I overlooked that with my first releases.


### CDN
This subtle change in the versioning system has been made in order to use [jsDelivr](http://www.jsdelivr.com/) CDN. Further details will soon be available in the [documentation](/labs/jquery-loading-overlay/).

### Default `loading.gif` image is now embedded ad Data URI
The original gif image is still available in the repository, but it's not used by default.
You can now use LoadingOverlay inlcuding a single file *(ie. loadingoverlay.min.js)* directly from the CDN.

### `imagePosition` option
A brand new `imagePosition` option is now available. Its value is passed directly to CSS `background-position` property, to allow a customized placement of the image.
This feature has been requested by an user who had a LoadingOverlay on an element overflowing the viewport.


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
