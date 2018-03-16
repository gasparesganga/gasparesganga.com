---
layout      : post
title       : jQuery LoadingOverlay 2.0.0
description : CSS3 animations, SVG support and more!
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


Version 2 is finally here! It includes some tiny breaking changes, so it is a good idea to reference the 1.x branch in your existing projects instead of any *latest* alias if you are not planning to make any minor adjustment in your code.


### What's new in version 2.0.0
- SVG images support
- CSS3 animations support
- 4 different built-in keyframes animations: `rotate_right`, `rotate_left`, `fadein` and `pulse`
- Text element support
- Progress element support *(basically what Extra Progress was doing in v1)*
- New *actions* `text` and `progress`
- `color` option is now named `background`
- Default image is a modern, lightweight and customizable SVG instead of the old fashioned GIF
- Default `maxSize` increased to `120px`
- Fixed size support *(don't fancy dynamic scaling? Here you go!)*
- Javascript sourcemaps
- New folder structure, with source files under `src/` and production files under `dist/`
- A bunch of new options:
  * `background`, `backgroundClass`
  * `imageAnimation`, `imageAutoResize`, `imageResizeFactor`, `imageColor`, `imageClass`, `imageOrder`
  * `fontawesomeAnimation`, `fontawesomeAutoResize`, `fontawesomeResizeFactor`, `fontawesomeColor`, `fontawesomeOrder`
  * `customAnimation`, `customAutoResize`, `customResizeFactor`, `customOrder`
  * `text`, `textAnimation`, `textAutoResize`, `textResizeFactor`, `textColor`, `textClass`, `textOrder`
  * `progress`, `progressAutoResize`, `progressResizeFactor`, `progressColor`, `progressClass`, `progressOrder`, `progressSpeed`, `progressMin`, `progressMax`
  * `direction`

All these new options might seem overwhelming at first, but if you look closely you will see a clear and simple common pattern. They are as straightforward as possible, providing great flexibility yet witouth sacrificing the original idea of an *easy plug-n-play plugin*.
The code size has grown three times but performances have increased, taking full advantage of CSS3 animations *(let's put those graphic accelerator cards to good use!)* and SVG images.


### Breaking changes amd important notes on upgrading from v1
The single most important change is related to the `color` option which has been replaced by `background`, while `imagePosition` has been removed entirely.
These changes shouldn't break many existing projects using LoadingOverlay, since most of them are likely to be using the default settings. 


### Wait, wait, wait... I see a v2.0.1 already
Yep, *they see me releasin', they hatin'*... A couple of bugfixes were necessary for Chrome and Edge, read the details [here](/posts/jquery-loading-overlay-2.0.1/).


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
