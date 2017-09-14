---
layout      : post
title       : PHP ShapeFile 2.3.0
description : Main ShapeFile class can now be easily extended
tags        : [Releases, PHP, ESRI, ShapeFile, GIS]
---

It's been a long time since the last update to this library. In the meanwhile it has been gaining popularity and I have received a few requests as well.
A pretty easy one to implement was the possibility to extend the library to accomodate some custom requirements (ie. using an abstract filesystems like *flysystem*).


### What's new in Version 2.3.0
- Protected method `init()`
- Some minor code abbelishments to better comply to PSR-2


#### Protected method `init()`
The new `protected` method `init()` allows the main `ShapeFile` class to be easily extended using a custom constructor.
You will find the documentation and an example in the brand new dedicated section [Extending the Library](/labs/php-shapefile/#extending-the-library).

#### Some minor code abbelishments to better comply to PSR-2
I must confess I don't fancy all 100% of the PSR recomendations, nonetheless I updated some coding style to be fully *(I think...)* PSR-2 compliant.
To me one-line *if statements* are practical, easy to read and concise, but hey, it's not me who dictate the standard...



## Download and documentation

Go to the Lab page: [PHP ShapeFile](/labs/php-shapefile/)
