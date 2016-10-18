---
layout      : post
title       : jQuery MessageBox 2.0.1
description : Bugfix for inconsistent flexbox browsers' behaviours
tags        : [Releases, Javascript, jQuery, Plugin, MessageBox, Modal, Dialog, Alert, Confirm, Prompt]
---

In late 2016 one would think those times when a developer needed to do all the tests agains different browsers *(and different versions too!)* for every single detail were over.
They are not!
According to the latest [specs](https://drafts.csswg.org/css-flexbox/#item-margins), browsers *CAN* behave differently to flexbox's paddings and margins.
Needless to say, this breaks jQuery MessageBox vertical positioning in webkit based browsers and possibly in IE too.

### Alright, so what's new in Version 2.0.1?
A simple workaround for these inconsistent behaviours is provided with this bugfix release. It will not impact the rest of your code in any way, as it simply uses a *spacer* element instead of `margin-top` for vertical positioning (which is used only when `top` option is not set to `"auto"`).


## Download and documentation

Go to the Lab page: [MessageBox](/labs/jquery-message-box/)
