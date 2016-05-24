---
layout      : post
title       : jQuery LoadingOverlay version 1.2
description : New 1.2 release, with new features and extras
tags        : [Javascript, jQuery, Plugin, LoadingOverlay]
---

My [jQuery LoadingOverlay plugin](/labs/jquery-loading-overlay/) continues be the most popular release of mine. It gets downloaded and I recieve feedback messages and emails almost daily, wow!
Among those messages, I liked a couple of requests from a very nice user (**Gianclaudio Oliveira**) who also provided some sample code to demonstrate his idea. So I decided to include a new *fade* functionality and release the first *extra*: *Progress*.


### What do you mean by *extras*
I wanted to accomodate a request that made sense, yet I didn't think it was generalized enough to be included in the core code.
I always try to keep that fine line between features and functionalities. I know many users could get rather overwhelmed and frustrated by the complexity of some plugins *(I am the first of them!)*, so I want to keep my code as simple and effective as possible.
Those *extras* are like *plugins modules* of LoadingOverlay *(plugin-ception...?)* that provide additional features. 


### What's new in Version 1.2

#### Fade In and Fade Out
It seems almost silly I hadn't thought about that before, because that was very easy and it gives a pleasant effect *(it's now enabled by default!)*. The new `fade` option gives the capability to set *fade in* and *fade out* durations. Of course you can disable it setting the option to either `0` or `false`.

#### Extra *Progress*
This *extra* provides basic *progress bar loader* functionality.
The idea is very similar to the one that led to the `custom` option: providing some feedback to the user while the LoadingOverlay is being shown.
In some cases, a kind of *progress bar* could fit this need very well. So instead of creating your own progress bar, you can use an instance of `LoadingOverlayProgress`.
The code is easily customizable for your specific taste, but you can use it right out-of-the-box since some customization options are available and should be enough for most cases *(please refer to the [documentation](/labs/jquery-loading-overlay/))*.


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
