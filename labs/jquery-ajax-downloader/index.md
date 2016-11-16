---
layout      : lab
title       : jQuery AjaxDownloader
description : A jQuery Plugin to perform Ajax style downloads
updated     : 2016-11-12
getit       :
  github        : gasparesganga/jquery-ajax-downloader
  download      : true
  npm           : gasparesganga-jquery-ajax-downloader
  bower         : gasparesganga-jquery-ajax-downloader
  cdn           :
    name   : jquery.ajaxdownloader
    files  : [ajaxdownloader.min.js]

assets      :    
  css   : []
  js    :
    - js/jquery-3.1.0.min.js
    - jquery-ajax-downloader/_assets/ajaxdownloader.min.js
    - jquery-ajax-downloader/_assets/demo.js
---


{% capture current_date %}{{'now' | date: '%s'}}{% endcapture %}
{% capture expire_date %}{{'2016-12-31' | date: '%s'}}{% endcapture %}
{% if current_date < expire_date %}
<div class="alert">
    <b>12 November 2016 :</b> Version 1.1.0 released: see <a href="/posts/jquery-ajax-downloader-1.1.0">release notes</a>
</div>
{% endif %}


## Contents
- [Quick Demo](#quick-demo)
- [Get it](#get-it)
- [How it works](#how-it-works)
- [Methods](#methods)
- [Options and defaults values](#options-and-defaults-values)
- [Examples](#examples)
- [Server Side](#server-side)
- [History](#history)
- [Comments and Ideas](#comments-and-ideas)


## Quick Demo
{% include_relative _demo.html demo="quick_demo" %}


## Get it
{% include getit.html %}


## How it works
An `HTML` form is created and submitted to ad invisible `IFrame`. You can pass parameters like you would in a regular Ajax request.
The server should answer the request providing a file to download of course.



## Methods
The only method provided works like any other Ajax call made with jQuery, thus using the defaults provided with [$.ajaxSetup()](http://api.jquery.com/jquery.ajaxsetup/).

#### *$.AjaxDownloader(options)*
Performs an *ajax-style* download



## Options and defaults values
```javascript
data   : $.ajaxSetup()["data"]    // Object
url    : $.ajaxSetup()["url"]     // String
```

##### `data`
Data to send to the server along the request *(it acts the same way as [jQuery.ajax()](http://api.jquery.com/jQuery.ajax/) data parameter)*.

##### `url`
URL to which the request is sent (it can be a static file to download as well).



## Examples
A couple of examples using both a static file and a dynamic request:

### Example 1 - Static File
```javascript
$.AjaxDownloader({
    url  : "./static_file.zip"
});
```
{% include_relative _demo.html demo="example1" %}

### Example 2 - Dynamic Request
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
{% include_relative _demo.html demo="example2" %}


## Server Side
Some care should be taken server side too. In my first example I requested a static file and it seemed to work just fine. But what would have happened with a PDF file or any other file format that your browser can actually open?
The solution is easy, just do some server side *magic*, like sending the right headers. Here is a `PHP` example to serve a static file forcing a download dialog on the user's browser:

```php
<?php
    /*
        Do some parameters checks, database data collection, etc. etc. here
    */
    // Force a download dialog on the user's browser:
    $filepath = '/path/to/file.pdf';
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($filepath).'"');
    header('Content-Transfer-Encoding: binary');
    header('Cache-Control: must-revalidate');
    header('Content-Length: '.filesize($filepath));
    ob_clean();
    flush();
    readfile($filepath);
    exit();
?>
```


## History
*12 November 2016* - [Version 1.1.0](/posts/jquery-ajax-downloader-1.1.0/)
*4 May 2015* - [Version 1.0](/posts/jquery-ajax-downloader-release/)
