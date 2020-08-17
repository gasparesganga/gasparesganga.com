---
layout      : post
title       : PHP Shapefile 3.3.2
description : Removed duplicated header introduced in v3.2.1
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


A bugfix release addressing an *embarassing* bug introduced with last release... I didn't check file encoding after merging a pull request and all `LF` characters had been replaced by `CRLF`. As a consequence, a double file header was added during deployment.


### What has been fixed in Version 3.3.2
- Removed duplicated doc block header from `ShapefileWriter.php` file


This release has no impact on existing code.

  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
