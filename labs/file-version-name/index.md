---
layout      : lab
title       : FileVersionName
description : .htaccess/PHP solution to force browsers to reload (and re-cache!) modified images, css, javascript and other resources
updated     : 2014-11-06
css         : []
js          : []
download    : file-version-name/archive/v1.0.zip
source      : file-version-name
---

## Background

First of all, this is NOT *my* idea. The concepts behind it are widely available on the Internet.
I've just taken those ideas and put together what I think is the best and easiest solution for a problem that many developers face every day.

You would find a lot of misleading solutions, like appending a querystring to the resource URLs like that:

```html
<link rel="stylesheet" href="css/style.css?v1.30">
``` 

which isn't really a great thing to do: you must change your HTML every time you modify a resource and it can even prevent some browsers to cache those resources, resulting in a slower user experience!


## What it does

The PHP static Class simply adds to the file name a timestamp of the last change made, resulting in something like:

```html
<link rel="stylesheet" href="css/style.001400349195.css">
``` 

while the `.htaccess` rewrite rule translates it back to the timestamp-less filename.
If the resource doesn't exist on the filesystem, the filename will be passed through unmodified.
This will work for every file created between `01/01/1970` and `27/09/33658`, that sound just like enough time span, doesn't it?


## Usage

Having an example html page, like that:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>FileVersionName example</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js"></script>
    </head>
    <body>
        <img src="image.png">
    </body>
</html>
```

Just require the PHP Class and wrap every resource name in the Encode method like that:

```html
<?php require_once('FileVersionName.php'); ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>FileVersionName example</title>
        <link rel="stylesheet" href="<?php echo FileVersionName::Encode('style.css'); ?>">
        <script src="<?php echo FileVersionName::Encode('script.js'); ?>"></script>
    </head>
    <body>
        <img src="<?php echo FileVersionName::Encode('image.png'); ?>">
    </body>
</html>
```

Of course don't forget to place the `.htaccess` file in your project folder!


Optionally you can set a Base Path and use relative URLs to it for every resource. This is useful when you have `php` files in different subfolders and you still want to type the resource URL as if it was plain `html`.


```php
<?php
    // Setup BasePath relative to the folder containing this file
    FileVersionName::setBasePath(dirname(__FILE__).'/');
?>
```


## Caveats

Note that the `.htaceess` rule will work for every filename which contains **12** digits right before the extension, but this shouldn't be an issue really. When was last time you named a file like that?
