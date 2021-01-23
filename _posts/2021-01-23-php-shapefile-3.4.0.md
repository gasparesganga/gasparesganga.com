---
layout      : post
title       : PHP Shapefile 3.4.0
description : Invalid/corrupted Shapefile recovering, GeoJSON Feature properties support and more
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


### What's new in Version 3.4.0
- Capability to ignore *DBF* and *SHX* files to recover corrupted Shapefiles
- Improved handling of *Logical* fields in *DBF* files
- Full GeoJSON *Feature* support with properties data
- Handling of unspecified bounding box in *SHP* and *SHX* file headers for empty Shapefiles
- Correct behaviour with *DBF* files for empty Shapefiles
- Increased tolerance coefficient to deal with extremely small areas when determining ring orientation


#### Capability to ignore *DBF* and *SHX* files to recover corrupted Shapefiles
While on one hand all three *SHP*, *SHX* and *DBF* files are deemed mandatory, on the other hand there are certain cases where one would like to ignore specifically *SHX* and/or *DBF* files, especially when dealing with incomplete or corrupted Shapefiles. New [ShapefileReader](/labs/php-shapefile/#class-shapefileshapefilereader) boolean constructor options `Shapefile::OPTION_IGNORE_FILE_DBF` and `Shapefile::OPTION_IGNORE_FILE_SHX` allow exactly that. It is worth noting that:
- When setting `Shapefile::OPTION_IGNORE_FILE_DBF` to `true`, data and fields definition will not be available.
- When setting `Shapefile::OPTION_IGNORE_FILE_SHX` to `true`, the library relies on record headers content lengths values and assumes there are no unused bytes between records in *SHP* file. Random access to specific records will not be possible, [`ShapefileReader::getTotRecords()`](/labs/php-shapefile/#shapefilegettotrecords) method will output special value `Shapefile::UNKNOWN` and calling [`ShapefileReader::setCurrentRecord`](/labs/php-shapefile/#shapefilereadersetcurrentrecord) method will raise a `Shapefile::ERR_INPUT_RANDOM_ACCESS_UNAVAILABLE` ShapefileException.


#### Improved handling of *Logical* fields in *DBF* files
When **reading** Shapefiles values `"1"` and `"0"` are now considered truthy and falsy respectively. These are not in the standard but it seems some wild software out there is using them.
When **writing** Shapefiles the encoding and handling of different values and data types passed as input to Geometries has been improved. Numbers are loosely casted to bool before conversion, truthy and falsy string values are stricly checked against allowed ones (the first non-trimmable char is being used, as before) and anything else is considered as `null` or *not initialized*.


#### Full GeoJSON *Feature* support with properties data
[`Geometry::initFromGeoJSON()`](/labs/php-shapefile/#geometryinitfromgeojson) method will now correctly load GeoJSON *Feature* properties into Geometries. Also, parsing is more robust and `Shapefile::ERR_INPUT_GEOJSON_NOT_VALID` ShapefileException offers some details in case of malformed GeoJSON.


#### Handling of unspecified bounding box in *SHP* and *SHX* file headers for empty Shapefiles
For broader compatibility with external software and file sources, `ShapefileWriter` class uses negative `Shapefile::SHP_NO_DATA_VALUE` (which becomes positive!) for unspecified bounding box *min* coordinates values and regular `Shapefile::SHP_NO_DATA_VALUE` for *max* ones, while `ShapefileReader` class ignores altogether the bounding box for empty Shapefiles.


#### Correct behaviour with *DBF* files for empty Shapefiles
Actually quite a corner case, but the library now allows to change the data structure (*i.e.: adding fields*) of an empty Shapefile with no records open in `Shapefile::MODE_APPEND` mode.


#### Increased tolerance coefficient to deal with extremely small areas when determining ring orientation
I had thought about changing current algorithm in favour of the method described in this [Wikipedia article](https://en.wikipedia.org/wiki/Curve_orientation) that I believe it was used by JTS `algorithm::Orientation::isCCW()` and its GEOS port `algorithm::Orientation::isCCW()` before they switched to a more complex one.
The algorithm they use right now looks more refined and is said to be more *robust*, nonetheless I decided not to do a *dumb copy/paste porting* without deeply understanding what is actually happening there and **why**, especially because it appears that JTS falls back to polygon area computation anyways for complex cases, which supposedly gives more accurate results with a broader range of invalid polygons.
My mathematical knowledge and available time to study the subject is very limited, so I decided to simply increase the tolerance coefficient in order to improve the support for extra small areas and not to throw too much time into a pure *performance update* that doesn't make much sense right now.



## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
