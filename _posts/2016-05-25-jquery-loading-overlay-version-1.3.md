---
layout      : post
title       : jQuery LoadingOverlay version 1.3
description : You won, explicit zIndex option is now available
tags        : [Javascript, jQuery, Plugin, LoadingOverlay]
---

Every now and then I get some requests to include an option to explicitly set `z-index` in my [jQuery LoadingOverlay plugin](/labs/jquery-loading-overlay/).

I ultimately decided to *give up* and release a new version with it, but I want to clarify the motivations behind my choices and why I had deliberately chosen not to include that option before.

### `z-index` is bad
I must say I don't like `z-index` at all! I think it can be *avoided* in most cases, leading to a more well-structured code.
It's all about DOM manipulation: one shouldn't rely on `z-index` when the real problem is the hierarchy in the DOM.

### But what if I really need `z-index`?
Well, if you really *need* it, it means you have set it for another element somewhere else in your CSS. That's the right place to set a `z-index` property for jQuery LoadingOverlay as well: your external CSS file, close to the other element's style you are relating to.

### But there are some cases you can't avoid it
Yes, there are. And that's why I decided to include the support for it now.
Take this scenario: another plugin is manipulating the DOM and you don't have full control over it *(whether it is a good idea or not to use a plugin which manipulates the DOM in a way that you would not, is up to you...)*, so the only way to make jQuery LoadingOverlay work as expected is setting an explicit `zIndex` option.

### What if I still don't need it?
If you are like me, then just ignore this new option. Leaving it set to `undefined` will not set any `z-index` property.


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
