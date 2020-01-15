---
layout      : post
title       : PHP Shapefile 3.1.2
description : Fixed bug affecting OPTION_FORCE_MULTIPART_GEOMETRIES with Point geometries
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


In this version it was fixed just a single bug, that was rather a design mistake and it did not allow Point (and PointZ and PointM) Shapefiles to be read when `Shapefile::OPTION_FORCE_MULTIPART_GEOMETRIES` was enabled.


### What has been fixed in Version 3.1.2
- Do not apply `Shapefile::OPTION_FORCE_MULTIPART_GEOMETRIES` to Point Shapefiles


#### Do not apply `Shapefile::OPTION_FORCE_MULTIPART_GEOMETRIES` to Point Shapefiles
Option `Shapefile::OPTION_FORCE_MULTIPART_GEOMETRIES` now applies only to Polyline and Polygon Shapefiles and have no effect on Point and of course MultiPoint ones.


  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
