---
layout      : post
title       : PHP Shapefile 3.1.3
description : Fixed typo in LineString and MultiLineString GeoJSON output
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


There was a tiny typo in LineString and MultiLineString GeoJSON output: there were a small ***s*** where there should have been a capital one ***S***.


### What has been fixed in Version 3.1.3
- Changed `GEOJSON_BASETYPE` constants for `Shapefile\Geometry\Linestring` and `Shapefile\Geometry\MultiLinestring` respectively to `'LineString'` and `'MultiLineString'`


#### Changed `GEOJSON_BASETYPE` constants for `Shapefile\Geometry\Linestring` and `Shapefile\Geometry\MultiLinestring` respectively to `'LineString'` and `'MultiLineString'`
It shouldn't have been a very big deal since good GeoJSON parsers should be able to deal with input in a case-insensitive fashion. Anyways, GeoJSON output for `LineString` and `MultiLineString` geometries is now compliant to [RFC 7946](https://tools.ietf.org/html/rfc7946).


  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
