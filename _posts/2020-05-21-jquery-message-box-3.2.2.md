---
layout      : post
title       : jQuery MessageBox 3.2.2
description : Default overlay z-index
tags        : [Releases, Javascript, jQuery, Plugin, MessageBox, Modal, Dialog, Alert, Confirm, Prompt]
---


A few months without any release means the plugin is pretty solid and feature-rich. But sometimes an easy and trivial change comes up, like this one.


### What's fixed (*new* actually) in version 3.2.2
- Added `z-index : 9999` to `.messagebox_overlay` class in default CSS file to improve interaction with external components and plugins.

This is self-explanatory: sometimes there are external components or plugins that use a high `z-index` value in their CSS. Having a default value high enough should provide a better interaction with them, or at least a solid base to easily apply a customization (*i.e.: a higher value*) when needed.


## Download and documentation

Go to the Lab page: [MessageBox](/labs/jquery-message-box/)
