---
layout      : post
title       : PHP ShapeFile version 1.1
description : Version 1.1 released, with some minor improvements
tags        : [PHP, ShapeFile, GIS]
---


### What's new in Version 1.1

* New constructor
* New public method `getPRJ()`. It provides the raw WKT from the `.prj` file if present
* Invalid polygons handling
* Updated error codes

<br>

#### New constructor

The new constructor provides a cleaner and more elegant way to specify the file paths. **You will need to update your code** if you were explicitly passing the `.dbf` file path.

#### New public method `getPRJ()`

After some user's requests, I wanted to provide a basic method to read the WKT in the `.prj` file.
I attempted to write a generic parser, but it ultimately turned out to be useless. I don't have the time and the will to write a [Standard compliant](http://www.opengeospatial.org/standards/requests/112) parser, so you only get some raw WKT directly from the `.prj` file. It's up to you to eventually parse the significant parts.

#### Invalid polygons handling

Some invalid or ultra-small polygons could fool the library and lead to a memory-limit fatal error. They should be now intercepted with a specific `ShapeFileException`.

#### Updated error codes

If you were relying on the specific error codes thrown by `ShapeFileException` then **you will need to update your code**. Some of them are changed to better accomodate future implementations. Not a big deal actually.



## Download and documentation

Go to the Lab page: [ShapeFile](/labs/php-shapefile/)
