---
layout      : post
title       : PHP Shapefile 3.3.3
description : Fixed a bug affecting ShapefileWriter with certain Point geometries
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


Another bugfix release, this time addressing a bug in ShapefileWriter::packPoint() method affecting *Z* and *M* geometries.

Also, I took the chance to add a new [example](/labs/php-shapefile/#example-4---deal-with-record-level-errors-individually) in the documentation, useful for the ones who want to deal with record-level errors individually.


### What has been fixed in Version 3.3.3
- Fixed a bug in ShapefileWriter::packPoint() method affecting *Z* and *M* geometries.


This release has no impact on existing code.

  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
