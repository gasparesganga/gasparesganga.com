---
layout      : post
title       : PHP Shapefile 3.3.1
description : Prevented a PHP warning when encoding a boolean value
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


A tiny bugfix release thanks to a user's feedback and proposed fix.


### What has been fixed in Version 3.3.1
- A PHP warning was being raised when encoding a boolean `false` value for a `Shapefile::DBF_TYPE_LOGICAL` field.


This release has no impact on existing code.

  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
