---
layout      : post
title       : PHP Shapefile 3.3.0
description : Polygons/MultiPolygons rings orientation made simple
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


After that last underwhelming (feature-wise) release, this new minor version comes with many new features and capabilities.

Lately I have received an interesting amount of feedback from users from a specific country who are dealing with some official shapefiles that are not compliant with ESRI specs, especially when it comes to Polygons/MultiPolygons orientation.
This new release is focused on this specific aspect, adding a number of new methods to check and manipulate Polygons/MultiPolygons rings and *autosensing* capabilities when reading shapefiles.
The result is more flexibility than ever, a wider *out-of-the-box* compatibility with different (and uncompliant...) shapefiles and a simpler yet more precise approach to ring orientation.

In order to have clearer idea of new default behaviour (which is no different than before in presence of a compliat shapefile of course) and capabilities, please read [this note about Polygons orientation](/labs/php-shapefile/#a-note-about-polygons-orientation).


### What's new in Version 3.3.0
- `Shapefile\Geometry\Linestring` class counts with 4 new public methods:
    - [isClockwise()](/labs/php-shapefile/#linestringisclockwise)
    - [forceClockwise()](/labs/php-shapefile/#linestringforceclockwise)
    - [forceCounterClockwise()](/labs/php-shapefile/#linestringforcecounterclockwise)
    - [forceClosedRing()](/labs/php-shapefile/#linestringforceclosedring)
- `Shapefile\Geometry\Polygon` class counts with 5 new public methods:
    - [isClockwise()](/labs/php-shapefile/#polygonisclockwise)
    - [isCounterClockwise()](/labs/php-shapefile/#polygoniscounterclockwise)
    - [forceClockwise()](/labs/php-shapefile/#polygonforceclockwise)
    - [forceCounterClockwise()](/labs/php-shapefile/#polygonforcecounterclockwise) 
    - [forceClosedRings()](/labs/php-shapefile/#polygonforceclosedrings)
- `Shapefile\Geometry\MultiPolygon` class counts with 5 new public methods:
    - [isClockwise()](/labs/php-shapefile/#multipolygonisclockwise)
    - [isCounterClockwise()](/labs/php-shapefile/#multipolygoniscounterclockwise)
    - [forceClockwise()](/labs/php-shapefile/#multipolygonforceclockwise)
    - [forceCounterClockwise()](/labs/php-shapefile/#multipolygonforcecounterclockwise)
    - [forceClosedRings()](/labs/php-shapefile/#multipolygonforceclosedrings)
- `Shapefile\Geometry\Polygon` and `Shapefile\Geometry\MultiPolygon` constructor parameter `$flag_enforce_closed_rings` is now [$closed_rings](/labs/php-shapefile/#polygon__construct) and accepts `Shapefile::ACTION_IGNORE`, `Shapefile::ACTION_CHECK` and `Shapefile::ACTION_FORCE` values.
- New `Shapefile\Geometry\Polygon` and `Shapefile\Geometry\MultiPolygon`  optional constructor parameter [$force_orientation](/labs/php-shapefile/#polygon__construct).
- New `Shapefile\ShapefileReader` [constructor options](/labs/php-shapefile/#shapefilereader__construct):
    - `Shapefile::OPTION_POLYGON_CLOSED_RINGS_ACTION`
    - `Shapefile::OPTION_POLYGON_ORIENTATION_READING_AUTOSENSE`
    - `Shapefile::OPTION_POLYGON_OUTPUT_ORIENTATION`
- New action constants:
    - `Shapefile::ACTION_IGNORE`
    - `Shapefile::ACTION_CHECK`
    - `Shapefile::ACTION_FORCE`
 - New Polygon and MultiPolygon orientation constants:
    - `Shapefile::ORIENTATION_CLOCKWISE`
    - `Shapefile::ORIENTATION_COUNTERCLOCKWISE`
    - `Shapefile::ORIENTATION_UNCHANGED`
- New error types [constants](/labs/php-shapefile/#shapefileexceptiongeterrortype):
    - `Shapefile::ERR_GEOM_RING_AREA_TOO_SMALL`
    - `Shapefile::ERR_GEOM_RING_NOT_ENOUGH_VERTICES`
- Other constants:
    - `Shapefile::UNDEFINED`
- Library implements a *fluent interface* that allows method chaining.
- Code is now PSR-12 compliant
- Deprecated `Shapefile\ShapefileReader` [constructor options](/labs/php-shapefile/#shapefilereader__construct) that will disappear in the next releases:
    - `Shapefile::OPTION_ENFORCE_POLYGON_CLOSED_RINGS`. Use `Shapefile::OPTION_POLYGON_CLOSED_RINGS_ACTION` instead.
    - `Shapefile::OPTION_INVERT_POLYGONS_ORIENTATION`. Use `Shapefile::OPTION_POLYGON_OUTPUT_ORIENTATION` instead.
- Deprecated [error constants](/labs/php-shapefile/#shapefileexceptiongeterrortype) that will disappear in the next releases:
    - `Shapefile::ERR_GEOM_POLYGON_AREA_TOO_SMALL`. Use `Shapefile::ERR_GEOM_RING_AREA_TOO_SMALL` instead.
    - `Shapefile::ERR_GEOM_POLYGON_NOT_VALID`. Use `Shapefile::ERR_GEOM_POLYGON_WRONG_ORIENTATION` instead.


  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
