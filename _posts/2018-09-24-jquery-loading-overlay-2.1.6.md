---
layout      : post
title       : jQuery LoadingOverlay 2.1.6
description : Fixed an interesting corner case when LoadingOverlay was hidded real quick
tags        : [Releases, Javascript, jQuery, Plugin, LoadingOverlay]
---


### What's fixed in version 2.1.6
- Corner case when LoadingOverlay was being hidden with a long fade out time after the target element was resized and before `resizeInterval` was triggered

#### Corner case when LoadingOverlay was being hidden with a long fade out time after the target element was resized and before `resizeInterval` was triggered
Yes, this is as cumbersome as it sounds. I would never have found that without some feedback from a user (*thank you!*).
Basically, let's say you have displayed a LoadingOverlay over an empty element. Then you make an ajax call to fill that element, which of course will change its size. But the ajax request is super duper fast and you end up hiding the LoadingOverlay in no time after it's completed (in a time which is lower than `resizeInterval`). All of this while you had set a fairly high `fade` time, which caused a bad visual outcome. If **all of this** was happening, then LoadingOverlay failed to resize itself to cover the target element...!
Now it's fixed and we can go back sleeping soundly again.


## Download and documentation

Go to the Lab page: [LoadingOverlay](/labs/jquery-loading-overlay/)
