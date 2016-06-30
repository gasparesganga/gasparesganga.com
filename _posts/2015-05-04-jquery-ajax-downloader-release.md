---
layout      : post
title       : jQuery AjaxDownloader release
description : First public release
tags        : [Releases, Javascript, jQuery, Plugin, PHP]
---

Sometimes your web app needs to download a file and you suddenly have to switch from your super modular Javascript code to an old school kludgy HTML form to simulate ad ajax-like user experience...

AjaxDownloader is a tiny jQuery Plugin that does just that, with a well-recognizable syntax:

```javascript
$.AjaxDownloader({
    url  : "./download_manager.php",
    data : {
        param1   : "xxx",
        param2   : "yyy",
        param3   : "zzz"
    }
});
```


## Download and documentation

Go to the Lab page: [AjaxDownloader](/labs/jquery-ajax-downloader/)
