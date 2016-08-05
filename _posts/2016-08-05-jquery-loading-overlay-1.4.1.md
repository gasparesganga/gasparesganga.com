---
layout      : post
title       : jQuery LoadingOverlay 1.4.1
description : Some bug fixes and minor improvements
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


### Auto resizing and positioning

- Fixed a bug with positioning when LoadingOverlay is attached to an element *(element overlay mode)*.
- LoadingOverlay is now **always** attached to the `body`, even if it is an *element overlay*. This means you can safely remove all the *container element's* contents while the LoadingOverlay is being shown. At the same time it shouldn't break anything in your existing code, unless you were doing something *really* tricky with it.
- The `resizeInterval` option is now active and set to `50` milliseconds by default. This makes more sense as a default value since one would activate it more often than not.


### Other
I've also taken the chance to correct a possible inconsistency with Javascript's [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) function.


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
