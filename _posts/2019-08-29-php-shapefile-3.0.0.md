---
layout      : post
title       : PHP Shapefile 3.0.0
description : Finally v3 is here!
tags        : [Releases, PHP, ESRI, ShapeFile, GIS]
---


After a *loooong* time thinking about, drafting, starting developing, freezing the process, adding improvements and repeating all of this again and again, PHP Shapefile 3.0.0 is finally out.
And it comes with the most wanted and anticipated feature I have been getting so many emails and requests about: yes, **it can write Shapefiles too**!
It took more time than expected for many reasons, including my very full working and personal schedule, the entry of a sponsor and its unexpected withdrawal, a complete rewrite of the library almost from scratch.

The new library is based on a totally different approach than previous versions. It was born as a low level utility that I used in my company to read ESRI Shapefiles and I just needed the best performances possible and no nonsense or fancy features. It then evolved in a public open source project, to which I kept adding features and it became pretty popular, especially after the introduction of PHP 7 support and the removal of outdated [dBase](https://www.php.net/manual/en/book.dbase.php) and/or third part dependencies to read *DBF* files. Version 3 trades off some performance (not much, don't worry! After all, memory and CPU usage is not the *bottleneck* when reading or writing files on disk) in favour of a real and clean OOP approach from the beginning, getting rid of those *structured arrays* and exposing some nice *Geometry Objects*. It goes without saying that this allows an easy and logical way to build and write your Shapefiles now, passing some WKT, some GeoJSON or directly creating your Geometry Objects. Hurray!


### What's new in Version 3.0.0
There are a lot of differences from v2 and it's almost silly to list *breaking changes* since the library has been basically rewritten.
The following list is not exaustive and it just represents the features and changes I could manage to keep track of. For sure there are many other that I forgot and did not make it into the list.

- Complete OOP style refactoring
- Folder structure now reflects namespaces hierarchy
- Namespace and class names case normalized (i.e.: `Shapefile` instead of `ShapeFile`)
- Shapefile writing capabilities
- New `Shapefile\Geometry` namespace with `Point`, `MultiPoint`, `Linestring`, `MultiLinestring`, `Polygon` and `MultiPolygon` Classes
- New `ShapefileReader` and `ShapefileWriter` Classes
- New `Shapefile`, `Geometry` and `GeometryCollection` abstract Classes
- New `ShapefileException::getDetails()` method
- Custom *DBF* charset support
- Support for emulated `null` values in *DBF* files
- Reading and writing optional *DBT* files (support for `MEMO` fields)
- Reading and writing optional *CPG* files
- PHPDoc style comments
- Default output polygons orientation is now opposite to ESRI Shapefile specs and compliant to OGC Simple Features
- Use of `iconv()` instead of `utf8_encode()` for charset conversion
- `ShapefileException::getErrorType()` method now returns one of `Shapefile::ERR_*` constant values
- `ShapefileReader::fetchRecord()` method replaces `ShapeFile::getRecord()` and returns a `Geometry` object
- Different order of elements in bounding boxes associative arrays
- Improved invalid date format detection
- Fixed *logical* (`bool`) not initialized values (`null`) detection in *DBF* files
- Bitwise constructor flags are replaced by associative array
- New constructor options constants:
    - `Shapefile::OPTION_CPG_ENABLE_FOR_DEFAULT_CHARSET`
    - `Shapefile::OPTION_DBF_CONVERT_TO_UTF8`
    - `Shapefile::OPTION_DBF_FORCE_ALL_CAPS`
    - `Shapefile::OPTION_DBF_IGNORED_FIELDS`
    - `Shapefile::OPTION_DBF_NULL_PADDING_CHAR`
    - `Shapefile::OPTION_DBF_NULLIFY_INVALID_DATES`
    - `Shapefile::OPTION_DBF_RETURN_DATES_AS_OBJECTS`
    - `Shapefile::OPTION_DELETE_EMPTY_FILES`
    - `Shapefile::OPTION_ENFORCE_GEOMETRY_DATA_STRUCTURE`
    - `Shapefile::OPTION_ENFORCE_POLYGON_CLOSED_RINGS`
    - `Shapefile::OPTION_FORCE_MULTIPART_GEOMETRIES`
    - `Shapefile::OPTION_IGNORE_GEOMETRIES_BBOXES`
    - `Shapefile::OPTION_IGNORE_SHAPEFILE_BBOX`
    - `Shapefile::OPTION_INVERT_POLYGONS_ORIENTATION`
    - `Shapefile::OPTION_OVERWRITE_EXISTING_FILES`
    - `Shapefile::OPTION_SUPPRESS_M`
    - `Shapefile::OPTION_SUPPRESS_Z`
- New file types constants:
    - `Shapefile::FILE_SHP`
    - `Shapefile::FILE_SHX`
    - `Shapefile::FILE_DBF`
    - `Shapefile::FILE_DBT`
    - `Shapefile::FILE_PRJ`
    - `Shapefile::FILE_CPG`
- New shape types constants:
    - `Shapefile::SHAPE_TYPE_NULL`
    - `Shapefile::SHAPE_TYPE_POINT`
    - `Shapefile::SHAPE_TYPE_POLYLINE`
    - `Shapefile::SHAPE_TYPE_POLYGON`
    - `Shapefile::SHAPE_TYPE_MULTIPOINT`
    - `Shapefile::SHAPE_TYPE_POINTZ`
    - `Shapefile::SHAPE_TYPE_POLYLINEZ`
    - `Shapefile::SHAPE_TYPE_POLYGONZ`
    - `Shapefile::SHAPE_TYPE_MULTIPOINTZ`
    - `Shapefile::SHAPE_TYPE_POINTM`
    - `Shapefile::SHAPE_TYPE_POLYLINEM`
    - `Shapefile::SHAPE_TYPE_POLYGONM`
    - `Shapefile::SHAPE_TYPE_MULTIPOINTM`
- New *DBF* fields types constants:
    - `Shapefile::DBF_TYPE_CHAR`
    - `Shapefile::DBF_TYPE_DATE`
    - `Shapefile::DBF_TYPE_LOGICAL`
    - `Shapefile::DBF_TYPE_MEMO`
    - `Shapefile::DBF_TYPE_NUMERIC`
    - `Shapefile::DBF_TYPE_FLOAT`
- New error types constants:
    - `Shapefile::ERR_UNDEFINED`
    - `Shapefile::ERR_FILE_MISSING`
    - `Shapefile::ERR_FILE_EXISTS`
    - `Shapefile::ERR_FILE_INVALID_RESOURCE`
    - `Shapefile::ERR_FILE_OPEN`
    - `Shapefile::ERR_FILE_READING`
    - `Shapefile::ERR_FILE_WRITING`
    - `Shapefile::ERR_SHP_TYPE_NOT_SUPPORTED`
    - `Shapefile::ERR_SHP_TYPE_NOT_SET`
    - `Shapefile::ERR_SHP_TYPE_ALREADY_SET`
    - `Shapefile::ERR_SHP_GEOMETRY_TYPE_NOT_COMPATIBLE`
    - `Shapefile::ERR_SHP_MISMATCHED_BBOX`
    - `Shapefile::ERR_SHP_FILE_ALREADY_INITIALIZED`
    - `Shapefile::ERR_SHP_WRONG_RECORD_TYPE`
    - `Shapefile::ERR_DBF_FILE_NOT_VALID`
    - `Shapefile::ERR_DBF_MISMATCHED_FILE`
    - `Shapefile::ERR_DBF_EOF_REACHED`
    - `Shapefile::ERR_DBF_MAX_FIELD_COUNT_REACHED`
    - `Shapefile::ERR_DBF_FIELD_NAME_NOT_UNIQUE`
    - `Shapefile::ERR_DBF_FIELD_NAME_NOT_VALID`
    - `Shapefile::ERR_DBF_FIELD_TYPE_NOT_VALID`
    - `Shapefile::ERR_DBF_FIELD_SIZE_NOT_VALID`
    - `Shapefile::ERR_DBF_FIELD_DECIMALS_NOT_VALID`
    - `Shapefile::ERR_DBF_CHARSET_CONVERSION`
    - `Shapefile::ERR_DBT_EOF_REACHED`
    - `Shapefile::ERR_GEOM_NOT_EMPTY`
    - `Shapefile::ERR_GEOM_COORD_VALUE_NOT_VALID`
    - `Shapefile::ERR_GEOM_MISMATCHED_DIMENSIONS`
    - `Shapefile::ERR_GEOM_MISMATCHED_BBOX`
    - `Shapefile::ERR_GEOM_MISSING_FIELD`
    - `Shapefile::ERR_GEOM_POINT_NOT_VALID`
    - `Shapefile::ERR_GEOM_POLYGON_OPEN_RING`
    - `Shapefile::ERR_GEOM_POLYGON_AREA_TOO_SMALL`
    - `Shapefile::ERR_GEOM_POLYGON_NOT_VALID`
    - `Shapefile::ERR_INPUT_RECORD_NOT_FOUND`
    - `Shapefile::ERR_INPUT_FIELD_NOT_FOUND`
    - `Shapefile::ERR_INPUT_GEOMETRY_TYPE_NOT_VALID`
    - `Shapefile::ERR_INPUT_GEOMETRY_INDEX_NOT_VALID`
    - `Shapefile::ERR_INPUT_ARRAY_NOT_VALID`
    - `Shapefile::ERR_INPUT_WKT_NOT_VALID`
    - `Shapefile::ERR_INPUT_GEOJSON_NOT_VALID`
    - `Shapefile::ERR_INPUT_NUMERIC_VALUE_OVERFLOW`
- Removed `init()`, `setDefaultGeometryFormat()`, `getDBFFields()`, `getRecord()`, `readRecord()` in `ShapefileReader` Class (former `ShapeFile`)
- Removed constructor flags constants:
    - `Shapefile::FLAG_SUPPRESS_M`
    - `Shapefile::FLAG_SUPPRESS_Z`
    - `Shapefile::GEOMETRY_ARRAY`
    - `Shapefile::GEOMETRY_BOTH`
    - `Shapefile::GEOMETRY_GEOJSON_GEOMETRY`
    - `Shapefile::GEOMETRY_GEOJSON_FEATURE`
    - `Shapefile::GEOMETRY_WKT`
- Removed numeric error codes


### Migrating from v2 to v3
There are some good news:
    - The library is still compatible with PHP 5.4+ (as odd as it might seem, in 2019 there are many production systems that still rely on a fully security-patched version of PHP 5.4 and it did not feel right to drop the support ofr them).
    - It now exposes some nice and convenient *Geometry Objects* that behave in a predictable way and are a huge step forward compared to those clumsy *structured arrays* we had before. 
    
The bad one is that since the whole approach has changed, and you will need to update the code that relies to this library. Not big deal actually, here is an example of *basic usage* in v2 and in v3 to better show the differences. Please refer to the official [documentation](/labs/php-shapefile/) for a complete explaination of the library.

#### Reading Shapefiles - Version 2
```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/ShapeFileAutoloader.php');
ShapeFile\ShapeFileAutoloader::register();

// Import classes
use ShapeFile\ShapeFile;
use ShapeFile\ShapeFileException;

try {
    // Open shapefile
    $ShapeFile = new ShapeFile('data.shp');
    
    // Read all the records
    while ($record = $ShapeFile->getRecord(ShapeFile::GEOMETRY_WKT)) {
        // Skip the record if marked as "deleted"
        if ($record['dbf']['_deleted']) {
            continue;
        }
        
        // Print Geometry as WKT
        print_r($record['shp']);
        
        // Print DBF data
        print_r($record['dbf']);
    }
} catch (ShapeFileException $e) {
    // Print detailed error information
    exit(
          "Error code"      . $e->getCode()
        . "\nError Type: "  . $e->getErrorType()
        . "\nMessage: "     . $e->getMessage()
    );
}
```

#### Reading Shapefiles - Version 3
```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/Shapefile/ShapefileAutoloader.php');
Shapefile\ShapefileAutoloader::register();

// Import classes
use Shapefile\Shapefile;
use Shapefile\ShapefileException;
use Shapefile\ShapefileReader;

try {
    // Open Shapefile
    $Shapefile = new ShapefileReader('/path/to/file.shp');
    
    // Read all the records
    while ($Geometry = $Shapefile->fetchRecord()) {
        // Skip the record if marked as "deleted"
        if ($Geometry->isDeleted()) {
            continue;
        }
        
        // Print Geometry as an Array
        print_r($Geometry->getArray());
        
        // Print Geometry as WKT
        print_r($Geometry->getWKT());
        
        // Print Geometry as GeoJSON
        print_r($Geometry->getGeoJSON());
        
        // Print DBF data
        print_r($Geometry->getDataArray());
    }
} catch (ShapefileException $e) {
    // Print detailed error information
    exit(
        "Error Type: "  . $e->getErrorType()
        . "\nMessage: " . $e->getMessage()
        . "\nDetails: " . $e->getDetails()
    );
}
```

  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
