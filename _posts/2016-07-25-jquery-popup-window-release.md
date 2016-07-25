---
layout      : post
title       : jQuery PopupWindow release - 1.0.0
description : The ultimate popup/dialog/modal jQuery plugin is here
tags        : [Releases, Javascript, jQuery, Plugin, PopupWindow, Dialog, Modal, Popup, Window]
---

That is one bold statement:

> The ultimate popup/dialog/modal jQuery plugin

I must say I'm quite happy and confident with this plugin. How often do you need a dialog or modal window or something similar and decide to go with jQuery UI Dialog? And you most likely end up including *a lot* of apparently useless stuff, with a resulting frustrating *developer experience* (let's not even mention the *user experience*), don't you?
Personally, I don't like jQuery UI, at all. Especially for smaller projects, or for bigger ones where you only need a small single feature from the whole framework, it usually brings more headaches than benefits.
Of course there are other alternatives out there for dialog windows, but none of them quite made it for me.


## Introducing jQuery PopupWindow
The foundation for this plugin was laid out a couple of years ago, when I started to write a custom popup/modal/dialog window for my webapps.
For this first public release I did a major refactoring in order to rationalize the code and provide the most simple, straightforward yet exhaustive *developer experience* and a fluid and professional feeling for the users.

### Features
jQuery PopupWindow comes with maximizing, minimizing, collapsing, resizing, dragging, modal and status bar capabilities. There is basically everything one could need from a window plugin.
It is fully CSS customizable using a few simple classes. It is standalone and very lightweight.

### Actions and Events
jQuery PopupWindow offers a complete set of *actions* to fully control its behaviour and all the related *events* to interact with it.
At a first sight to the [documentation](/labs/jquery-popup-window/) they might seem *a lot* in number, but then you will realize they are very consistent and predictable: you want to *maximize* a PopupWindow so you use a `maximize` *action* which fires a `maximize` *event* after it's done; to perform the opposite use `unmaximize` isntead. It sounds simple enough to me!


## Download and documentation

Go to the Lab page: [jQuery PopupWindow](/labs/jquery-popup-window/)
