---
layout      : post
title       : jQuery LoadingOverlay 2.1.0
description : Control over both SVG fill and stroke colors and progressFixedPosition option
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


Not even a month since the *revolutionary* v2 release and here we are with a 2.1.0 release already! Thanks to all the users with their valuable feedback and ideas to keep improving this plugin.


### What's new in version 2.1.0
- New `Resize` *action*
- New `progressFixedPosition` option
- Control over both SVG *fill* and *stroke* through `imageColor` option passed as two-elements array
- Default SVG image uses `circle` elements instead of `ellipse` ones

#### New `Resize` *action*
Sometimes you don't need the auto-resize feature at all and prefer to set [resizeInterval](/labs/jquery-loading-overlay/#resizeInterval) option to `0` or `false`. But what happens if you know something has changed in your page and you need a one-off resizing of your LoadingOverlay? The new [Resize](/labs/jquery-loading-overlay/#resize) *action* does just that.

#### New `progressFixedPosition` option
It actually makes sense to have the possibility to place the *progress* element in a fixed position on top or bottom of the LoadingOverlay. Thanks to this new [progressFixedPosition](/labs/jquery-loading-overlay/#progressFixedPosition) option it is now possible to do so.

#### Control over both SVG *fill* and *stroke* through `imageColor` option passed as two-elements array
It might actually be useful to override inline *fill* and *stroke* styles for provided SVGs using [imageColor](/labs/jquery-loading-overlay/#imageColor) option, so why not? You can keep using a single string value for *fill* color, or adopt the new array syntax to specify both *fill* and *stroke*.

#### Default SVG image uses `circle` elements instead of `ellipse` ones
This little change saves some bytes that cannot be minified in the production file, hurray!


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
