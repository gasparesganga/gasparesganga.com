---
layout      : post
title       : PHP ShapeFile release
description : First public release
tags        : [Releases, PHP, Shapefile, GIS]
---

Working on a system to import and process ESRI Shapefiles directly to PostGIS, I needed a library to read those files in PHP.

There are a few ones floating online, but after trying almost all of them, I decided to build my own for a number of reasons: 

* Bugs and limitations found in other libraries, especially related to multilinestrings and multipolygons
* Performance should remain high with huge files
* I have included native support for [WKT](http://en.wikipedia.org/wiki/Well-known_text) output, which makes the import to PostGIS trivial


## Download and documentation

Go to the Lab page: [ShapeFile](/labs/php-shapefile/)
