---
layout      : post
title       : PHP ShapeFile 2.4.0
description : Added GeoJSON output format
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


### What's new in Version 2.4.0
- Public method `setDefaultGeometryFormat()`
- `GEOMETRY_GEOJSON_GEOMETRY` and `GEOMETRY_GEOJSON_FEATURE` formats
- Changes to `getRecord()` public method


#### Public method `setDefaultGeometryFormat()`
This new method, as its name suggests, sets the default geometry output format. Extremely useful when you rely on the Iterator interface. See [setDefaultGeometryFormat](/labs/php-shapefile/#setdefaultgeometryformat).

#### `GEOMETRY_GEOJSON_GEOMETRY` and `GEOMETRY_GEOJSON_FEATURE` formats
I've never thought GeoJSON was a big deal, being mosty an attempt to *jsonize* everything back in 2007. In the meanwhile [RFC 7946](https://tools.ietf.org/html/rfc7946) was published and I have received some requests to support it. Here you go!
The format does **NOT** support *measured* geometries out of the box, but I customized it sligtly in order to accomodate them.

#### Changes to `getRecord()` public method
The most important change here is the `$geometry_format` parameter, which is now a *bitmask*. You can combine as many output formats as you like using a *bitwise Or* operator.
Also, the default format is now `ShapeFile::GEOMETRY_ARRAY`, while the `ShapeFile::GEOMETRY_BOTH` format has been deprecated.



## Download and documentation

Go to the Lab page: [PHP ShapeFile](/labs/php-shapefile/)
