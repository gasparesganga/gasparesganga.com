---
layout      : post
title       : jQuery LoadingOverlay 1.5.4
description : New zIndex default and some MS Edge compatibility fixes
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


A few users have reported that Bootstrap and other plugins place themselves in front of LoadingOverlay, using a *highests z-index detection* mechanism. Well, let's make their life difficult with the highest `z-index` available as default!
Some other minor fixes are included too.


### What's new in version 1.5.4

- Option `zIndex` defaults to the highests value allowed (`2147483647`) to prevent other elements to be displayed over LoadingOverlay
- Object keys always expressed as string literals instead of identifiers (fixes some weird Microsoft Edge behaviour)
- Minor code fixes and improvements
- Added `main` field to package.json according to jsDelivr recommendations



## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
