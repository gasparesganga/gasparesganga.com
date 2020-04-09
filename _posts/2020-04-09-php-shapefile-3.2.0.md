---
layout      : post
title       : PHP Shapefile 3.2.0
description : New OPTION_DBF_ALLOW_FIELD_SIZE_255
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


### What's new in Version 3.2.0
- Added `Shapefile::OPTION_DBF_ALLOW_FIELD_SIZE_255` constructor option for both `ShapefileReader` and `ShapefileWriter` classes


#### Added `Shapefile::OPTION_DBF_ALLOW_FIELD_SIZE_255` constructor option for both `ShapefileReader` and `ShapefileWriter` classes
Thanks to some feedback I discovered that some well-established libraries and software (e.g.: **pgsql2shp**) do not comply to dBase specs that allow a maximum field size of 254 bytes and export shapefiles whose *DBF* files have fields with a size of 255 bytes. I ignore the reason why in the original specs they decided for a maximum length of 254 instead of 255 when a whole byte is available to define it, but it is what it is.
This new `Shapefile::OPTION_DBF_ALLOW_FIELD_SIZE_255` option comes in handy to allow PHP Shapefile to read (and write too, why not?) files that use the whole 255 lenght: by default it is set to `false` to comply to the specs, but set it to `true` and unlock the real power of the whole 255 characters!


I know this new option looks like no big deal to justify a new minor version, especially after the feature-rich [v3.1.0 release](/posts/php-shapefile-3.1.0/), nonetheless this library tries to strictly follow semantic versioning and a new feature requires a minor release.



  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
