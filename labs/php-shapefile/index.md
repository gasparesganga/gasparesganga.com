---
layout      : lab
title       : PHP Shapefile
description : PHP library to read and write ESRI Shapefiles, compatible with WKT and GeoJSON
updated     : 2019-09-23
getit       :
  github        : gasparesganga/php-shapefile
  download      : true
  composer      : gasparesganga/php-shapefile
---

{% capture current_date %}{{'now' | date: '%s'}}{% endcapture %}
{% capture expire_date %}{{'2019-10-31' | date: '%s'}}{% endcapture %}
{% if current_date < expire_date %}
<div class="alert">
    <b>30 August 2019 :</b> Version 3.0.0 released! See the <a href="/posts/php-shapefile-3.0.0/">release notes</a>.
</div>
{% endif %}


## Contents
- [Get it](#get-it)
- [Features](#features)
- [Basic Usage](#basic-usage)
- [Namespaces and Classes](#namespaces-and-classes)
- [Files and filenames](#files-and-filenames)
- [A note about Polygons orientation](#a-note-about-polygons-orientation)
- [Geometry input/output formats](#geometry-inputoutput-formats)
- [DBF data input/output](#dbf-data-inputoutput)
- [Examples](#examples)
- [History](#history)
- [Comments and Ideas](#comments-and-ideas)


## Get it
{% include getit.html %}


## Features
- Reads and writes all kinds of Shapefiles, including Z and M ones
- Supports WKT/EWKT and GeoJSON input and output
- Completely standalone library
- Very fast and lightweight on memory
- Sequential read or random access to specific records
- Implements the [Iterator](https://php.net/manual/en/class.iterator.php) interface
- PHP 5.4+ compatible
- [PHP FIG](https://www.php-fig.org) [PSR-1](https://www.php-fig.org/psr/psr-1/), [PSR-2](https://www.php-fig.org/psr/psr-2/) and [PSR-4](https://www.php-fig.org/psr/psr-4/) compliant



## Basic Usage

### Reading Shapefiles
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

### Writing Shapefiles
```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/Shapefile/ShapefileAutoloader.php');
Shapefile\ShapefileAutoloader::register();

// Import classes
use Shapefile\Shapefile;
use Shapefile\ShapefileException;
use Shapefile\ShapefileWriter;
use Shapefile\Geometry\Point;

try {
    // Open Shapefile
    $Shapefile = new ShapefileWriter('/path/to/file.shp');
    
    // Set shape type
    $Shapefile->setShapeType(Shapefile::SHAPE_TYPE_POINT);
    
    // Create field structure
    $Shapefile->addNumericField('ID', 10);
    $Shapefile->addCharField('DESC', 25);
    
    // Write some records (let's pretend we have an array of coordinates)
    foreach ($coords_array as $i => $coords) {
        // Create a Point Geometry
        $Point = new Point($coords['x'], $coords['y']);
        // Set its data
        $Point->setData('ID', $i);
        $Point->setData('DESC', "Point number $i");
        // Write the record to the Shapefile
        $Shapefile->writeRecord($Point);
    }
    
    // Finalize and close files to use them
    $Shapefile = null;

} catch (ShapefileException $e) {
    // Print detailed error information
    exit(
        "Error Type: "  . $e->getErrorType()
        . "\nMessage: " . $e->getMessage()
        . "\nDetails: " . $e->getDetails()
    );
}
```

Check the [Examples](#examples) section for more usage hints.




## Namespaces and Classes
There are 2 Namespaces, `Shapefile` and `Shapefile\Geometry`, containing the following Classes:

- [Shapefile\ShapefileAutoloader](#class-shapefileshapefileautoloader)
- [Shapefile\ShapefileException](#class-shapefileshapefileexception)
- [Shapefile\ShapefileReader](#class-shapefileshapefilereader)
- [Shapefile\ShapefileWriter](#class-shapefileshapefilewriter)
- [Shapefile\Geometry\Point](#class-shapefilegeometrypoint)
- [Shapefile\Geometry\MultiPoint](#class-shapefilegeometrymultipoint)
- [Shapefile\Geometry\Linestring](#class-shapefilegeometrylinestring)
- [Shapefile\Geometry\MultiLinestring](#class-shapefilegeometrymultilinestring)
- [Shapefile\Geometry\Polygon](#class-shapefilegeometrypolygon)
- [Shapefile\Geometry\MultiPolygon](#class-shapefilegeometrymultipolygon)

To keep things easy and tidy, all package-wide constants are exposed by `Shapefile\Shapefile` Abstract Class, e.g.: `Shapefile::OPTION_SUPPRESS_Z`.
In addition, under the `Shapefile\Geometry` Namespace there is the Abstract Class [Geometry](#class-shapefilegeometrygeometry) that provides some common functionalities to all other Geometries.



## Class Shapefile\ShapefileAutoloader
This is a simple static class which provides autoloading capabilities for the library. Use the static method **`Shapefile\ShapefileAutoloader::register()`** as shown in the [example](#basic-usage) to register the PHP Shapefile autoloader.




## Class Shapefile\ShapefileException
A custom exception which extends PHP native [Exception](https://php.net/manual/en/language.exceptions.php) class. It can be used to isolate PHP Shapefile related exceptions. It adds 2 custom methods `getErrorType()` and `getDetails()`. See it in action in the [example above](#basic-usage).

- [getErrorType](#shapefileexceptiongeterrortype)
- [getDetails](#shapefileexceptiongetdetails)


### ShapefileException::getErrorType
```php?start_inline=1
public ShapefileException::getErrorType( void ) : string
```

Gets internal error type as a string. Useful to react to specific errors.
Here are all possible error types:
 `Shapefile::ERR_UNDEFINED` : Undefined error.
 `Shapefile::ERR_FILE_MISSING` : A required file is missing.
 `Shapefile::ERR_FILE_EXISTS` : Check if the file exists and is readable and/or writable.
 `Shapefile::ERR_FILE_INVALID_RESOURCE` : File pointer resource not valid.
 `Shapefile::ERR_FILE_OPEN` : Unable to open file.
 `Shapefile::ERR_FILE_READING` : Error during binary file reading.
 `Shapefile::ERR_FILE_WRITING` : Error during binary file writing.
 `Shapefile::ERR_SHP_TYPE_NOT_SUPPORTED` : Shape type not supported.
 `Shapefile::ERR_SHP_TYPE_NOT_SET` : Shape type not set.
 `Shapefile::ERR_SHP_TYPE_ALREADY_SET` : Shape type has already been set.
 `Shapefile::ERR_SHP_GEOMETRY_TYPE_NOT_COMPATIBLE` : Geometry type must be compatible with Shapefile shape type.
 `Shapefile::ERR_SHP_MISMATCHED_BBOX` : Bounding box must have the same dimensions as the Shapefile (2D, 3D or 4D).
 `Shapefile::ERR_SHP_FILE_ALREADY_INITIALIZED` : Cannot change Shapefile definition after it has been initialized with data.
 `Shapefile::ERR_SHP_WRONG_RECORD_TYPE` : Wrong record shape type.
 `Shapefile::ERR_DBF_FILE_NOT_VALID` : DBF file doesn't seem to be a valid dBase III or dBase IV format.
 `Shapefile::ERR_DBF_MISMATCHED_FILE` : Mismatched DBF file. Number of records not corresponding to the SHP file.
 `Shapefile::ERR_DBF_EOF_REACHED` : End of DBF file reached. Number of records not corresponding to the SHP file.
 `Shapefile::ERR_DBF_MAX_FIELD_COUNT_REACHED` : Cannot add other fields, maximum number of fields in a DBF file reached.
 `Shapefile::ERR_DBF_FIELD_NAME_NOT_UNIQUE` : Field name must be unique in DBF file.
 `Shapefile::ERR_DBF_FIELD_NAME_NOT_VALID` : Field name can be maximum 10 characters and contain only numbers, digits and underscores.
 `Shapefile::ERR_DBF_FIELD_TYPE_NOT_VALID` : Field type must be CHAR, DATE, LOGICAL, MEMO or NUMERIC.
 `Shapefile::ERR_DBF_FIELD_SIZE_NOT_VALID` : Field size incorrect according to its type.
 `Shapefile::ERR_DBF_FIELD_DECIMALS_NOT_VALID` : Field decimals incorrect according to its type.
 `Shapefile::ERR_DBF_CHARSET_CONVERSION` : Error during conversion from provided DBF input charset to *UTF-8*.
 `Shapefile::ERR_DBT_EOF_REACHED` : End of DBT file reached. File might be corrupted.
 `Shapefile::ERR_GEOM_NOT_EMPTY` : Cannot reinitialize non-empty Geometry.
 `Shapefile::ERR_GEOM_COORD_VALUE_NOT_VALID` : Invalid coordinate value.
 `Shapefile::ERR_GEOM_MISMATCHED_DIMENSIONS` : All geometries in a collection must have the same dimensions (2D, 3D or 4D).
 `Shapefile::ERR_GEOM_MISMATCHED_BBOX` : Bounding box must have the same dimensions as the Geometry (2D, 3D or 4D).
 `Shapefile::ERR_GEOM_MISSING_FIELD` : Geometry is missing a field defined in the Shapefile.
 `Shapefile::ERR_GEOM_POINT_NOT_VALID` : A Point can be either EMPTY or al least 2D.
 `Shapefile::ERR_GEOM_POLYGON_OPEN_RING` : Polygons cannot contain open rings.
 `Shapefile::ERR_GEOM_POLYGON_AREA_TOO_SMALL` : Polygon Area too small, cannot determine vertices orientation.
 `Shapefile::ERR_GEOM_POLYGON_NOT_VALID` : Polygon not valid or Polygon Area too small. Please check the geometries before reading the Shapefile.
 `Shapefile::ERR_INPUT_RECORD_NOT_FOUND` : Record index not found (check the total number of records in the SHP file).
 `Shapefile::ERR_INPUT_FIELD_NOT_FOUND` : Field not found.
 `Shapefile::ERR_INPUT_GEOMETRY_TYPE_NOT_VALID` : Geometry type not valid. Must be of specified type.
 `Shapefile::ERR_INPUT_GEOMETRY_INDEX_NOT_VALID` : Geometry index not valid (check the total number of geometries in the collection).
 `Shapefile::ERR_INPUT_ARRAY_NOT_VALID` : Array not valid.
 `Shapefile::ERR_INPUT_WKT_NOT_VALID` : WKT not valid.
 `Shapefile::ERR_INPUT_GEOJSON_NOT_VALID` : GeoJSON not valid.
 `Shapefile::ERR_INPUT_NUMERIC_VALUE_OVERFLOW` : Integer value overflows field size definition.



### ShapefileException::getDetails
```php?start_inline=1
public ShapefileException::getDetails( void ) : string
```

Gets additional details about the error. It might return an empty string if no details are available.




## Class Shapefile\ShapefileReader
The Shapefile reading Class that exposes the following public methods:

- [__construct](#shapefilereader__construct)
- [getShapeType](#shapefilereadergetshapetype)
- [getBoundingBox](#shapefilereadergetboundingbox)
- [getPRJ](#shapefilereadergetprj)
- [getCharset](#shapefilereadergetcharset)
- [setCharset](#shapefilereadersetcharset)
- [getField](#shapefilereadergetfield)
- [getFieldType](#shapefilereadergetfieldtype)
- [getFieldSize](#shapefilereadergetfieldsize)
- [getFieldDecimals](#shapefilereadergetfielddecimals)
- [getFields](#shapefilereadergetfields)
- [getTotRecords](#shapefilereadergettotrecords)
- [getCurrentRecord](#shapefilereadergetcurrentrecord)
- [setCurrentRecord](#shapefilereadersetcurrentrecord)
- [fetchRecord](#shapefilereaderfetchrecord)



### ShapefileReader::__construct
```php?start_inline=1
public ShapefileReader::__construct( mixed $files [, array $options = array() ] )
```

#### `$files`
*String* or *Array*, see [Files and filenames](#files-and-filenames) for details.


#### `$options`
Use the `$options` array parameter to pass some options and change the behaviour of the Class.
```php?start_inline=1
$Shapefile = new ShapefileReader('myshape.shp', [
    Shapefile::OPTION_SUPPRESS_M            => true,
    Shapefile::OPTION_DBF_NULL_PADDING_CHAR => '*',
    Shapefile::OPTION_DBF_IGNORED_FIELDS    => ['FIELD_1', 'FIELD_2'],
]);
```

Here are the supported options and their default values:
 `Shapefile::OPTION_DBF_CONVERT_TO_UTF8` : Default = `true`. Converts from input charset to *UTF-8* all strings read from the *.dbf* file.
 `Shapefile::OPTION_DBF_FORCE_ALL_CAPS` : Default = `false`. Forces all column names in upper case in the *.dbf* file.
 `Shapefile::OPTION_DBF_IGNORED_FIELDS` : Default = `[]`. Array containing the names of the fields to ignore from the *.dbf* file.
 `Shapefile::OPTION_DBF_NULL_PADDING_CHAR` : Default = `null`. Defines a null padding character to represent `null` values in the *.dbf* file.
 `Shapefile::OPTION_DBF_NULLIFY_INVALID_DATES` : Default = `true`. Returns a `null` value for invalid dates when reading *.dbf* files.
 `Shapefile::OPTION_DBF_RETURN_DATES_AS_OBJECTS` : Default = `false`. Returns dates as `DateTime` objects instead of ISO strings (`YYYY-MM-DD`).
 `Shapefile::OPTION_ENFORCE_POLYGON_CLOSED_RINGS` : Default = `true`. Enforces all Polygons rings to be closed.
 `Shapefile::OPTION_FORCE_MULTIPART_GEOMETRIES` : Default = `false`. Reads all Geometries as Multi (ESRI specs do not distinguish between LineString/MultiLinestring and Polygon/MultiPolygon).
 `Shapefile::OPTION_IGNORE_GEOMETRIES_BBOXES` : Default = `false`. Ignores geometries bounding boxes read from shapefile and computes some real ones instead.
 `Shapefile::OPTION_IGNORE_SHAPEFILE_BBOX` : Default = `false`. Ignores bounding box read from shapefile and computes a real one instead.
 `Shapefile::OPTION_INVERT_POLYGONS_ORIENTATION` : Default = `true`. Reverses polygons orientation (see [this note about Polygons orientation](#a-note-about-polygons-orientation)).
 `Shapefile::OPTION_SUPPRESS_M` : Default = `false`. Ignores *M dimension* from Shapefile.
 `Shapefile::OPTION_SUPPRESS_Z` : Default = `false`. Ignores *Z dimension* from Shapefile.



### ShapefileReader::getShapeType
```php?start_inline=1
public ShapefileReader::getShapeType( [ int $format ] ) : mixed
```

Gets the Shapefile type as either text or number. Possible output values are:
 `Shapefile::SHAPE_TYPE_NULL` : 0 - Null Shape.
 `Shapefile::SHAPE_TYPE_POINT` : 1 - Point.
 `Shapefile::SHAPE_TYPE_POLYLINE` : 3 - PolyLine.
 `Shapefile::SHAPE_TYPE_POLYGON` : 5 - Polygon.
 `Shapefile::SHAPE_TYPE_MULTIPOINT` : 8 - MultiPoint.
 `Shapefile::SHAPE_TYPE_POINTZ` : 11 - PointZ.
 `Shapefile::SHAPE_TYPE_POLYLINEZ` : 13 - PolyLineZ.
 `Shapefile::SHAPE_TYPE_POLYGONZ` : 15 - PolygonZ.
 `Shapefile::SHAPE_TYPE_MULTIPOINTZ` : 18 - MultiPointZ.
 `Shapefile::SHAPE_TYPE_POINTM` : 21 - PointM.
 `Shapefile::SHAPE_TYPE_POLYLINEM` : 23 - PolyLineM.
 `Shapefile::SHAPE_TYPE_POLYGONM` : 25 - PolygonM.
 `Shapefile::SHAPE_TYPE_MULTIPOINTM` : 28 - MultiPointM.
    

#### `$format`
It specifies the return format and can be one of:
 `Shapefile::FORMAT_INT` : Integer (*Default*)
 `Shapefile::FORMAT_STR` : String



### getBoundingBox
```php?start_inline=1
public ShapefileReader::getBoundingBox( void ) : array
```

Returns the whole Shapefile bounding box as an *Array*:

```php?start_inline=1
[
    [xmin] => float
    [xmax] => float
    [ymin] => float
    [ymax] => float
    [zmin] => float        // Present only in Z Shapefiles
    [zmax] => float        // Present only in Z Shapefiles
    [mmin] => float/false  // Present only in M and Z Shapefiles
    [mmax] => float/false  // Present only in M and Z Shapefiles
]
```
*"No data"* values set for *M coordinates* in the shapefiles are returned as *Boolean* `false`.
Eventual `Shapefile::OPTION_SUPPRESS_Z` and `Shapefile::OPTION_SUPPRESS_M` options set with the [__constructor](#shapefilereader__construct) will effectively condition the output.



### ShapefileReader::getPRJ
```php?start_inline=1
public ShapefileReader::getPRJ( void ) : string
```

Returns the raw WKT string from the *.prj* file. If there's no *.prj* file then `null` is returned.



### ShapefileReader::getCharset
```php?start_inline=1
public ShapefileReader::getCharset( void ) : string
```

Returns the value read from the *.cpg* file, set with [setCharset](#shapefilereadersetcharset) method, or the default one: `'ISO-8859-1'`.
Note that the library will use this information to convert data read from the files to *UTF-8* when option `Shapefile::OPTION_DBF_CONVERT_TO_UTF8` is enabled. See [Strings charset conversion](#strings-charset-conversion) for details.


### ShapefileReader::setCharset
```php?start_inline=1
public ShapefileReader::setCharset( mixed $charset ) : void
```

Sets the charset used to convert strings to *UTF-8* when option `Shapefile::OPTION_DBF_CONVERT_TO_UTF8` is enabled. It will overwrite the one read from the *.cpg* file.

#### `$charset`
A string containing the charset name or a falsy value (e.g.: `false` or empty string `""`) to reset it to default `'ISO-8859-1'`.



### ShapefileReader::getField
```php?start_inline=1
public ShapefileReader::getField( string $name ) : array
```

Returns an *Array* representing the specified field definition:

```php?start_inline=1
[
    [type]      => string
    [size]      => int
    [decimals]  => int
]
```

#### `$name`
The name of the field to return.



### ShapefileReader::getFieldType
```php?start_inline=1
public ShapefileReader::getFieldType( string $name ) : string
```

Returns a *String* representing the specified field type. It can be one of:
 `Shapefile::DBF_TYPE_CHAR` : String.
 `Shapefile::DBF_TYPE_DATE` : Date.
 `Shapefile::DBF_TYPE_LOGICAL` : Logical/Boolean.
 `Shapefile::DBF_TYPE_MEMO` : Memo (requires a *.dbt* file).
 `Shapefile::DBF_TYPE_NUMERIC` : Numeric.
 `Shapefile::DBF_TYPE_FLOAT` : Floating point numbers. *This is actually **not** part of dBaseIII PLUS specifications, but since there are many Shapefiles out there using it, it has been included in this library*.

#### `$name`
The name of the field to return.



### ShapefileReader::getFieldSize
```php?start_inline=1
public ShapefileReader::getFieldSize( string $name ) : int
```

Returns the lenght of the specified field. Note that all data is stored as a *String* into *.dbf* files.

#### `$name`
The name of the field to return.



### ShapefileReader::getFieldDecimals
```php?start_inline=1
public ShapefileReader::getFieldDecimals( string $name ) : int
```

Returns the lenght of the decimal part of the specified field. This makes sense only for fields of type `Shapefile::DBF_TYPE_NUMERIC`.

#### `$name`
The name of the field to return.



### ShapefileReader::getFields
```php?start_inline=1
public ShapefileReader::getFields( void ) : array
```

Returns and *Array* representing the fields definition in the *.dbf* file:

```php?start_inline=1
[
    [fieldname] => [
        [type]      => string
        [size]      => int
        [decimals]  => int
    ]
]
```



### ShapefileReader::getTotRecords
```php?start_inline=1
public ShapefileReader::getTotRecords( void ) : integer
```

Returns the number of records present in the Shapefile.



### ShapefileReader::getCurrentRecord
```php?start_inline=1
public ShapefileReader::getCurrentRecord( void ) : integer
```

Returns the index of the current record. Note that record count starts from `1` in Shapefiles. When the last record is reached, the special value `Shapefile::EOF` will be returned.



### ShapefileReader::setCurrentRecord
```php?start_inline=1
public ShapefileReader::setCurrentRecord( int $index ) : void
```

Sets the index of the current record. If an invalid index is provided, this method will throw a `ShapefileException`.

#### `$index`
The index of the record. Note that record count starts from `1` in Shapefiles.



### ShapefileReader::fetchRecord
```php?start_inline=1
public Shapefile::fetchRecord( void ) : Geometry
```

Reads the current record returning a `Geometry` object and moves the cursor forward to the next one.
When the last record is reached, the cursor will be set to the special value `Shapefile::EOF` and this method will return *Boolean* value **`false`**.




## Class Shapefile\ShapefileWriter
The Shapefile writing Class that exposes the following public methods:

- [__construct](#shapefilewriter__construct)
- [setShapeType](#shapefilewritersetshapetype)
- [setCustomBoundingBox](#shapefilewritersetcustomboundingbox)
- [resetCustomBoundingBox](#shapefilewriterresetcustomboundingbox)
- [setPRJ](#shapefilewritersetprj)
- [setCharset](#shapefilewritersetcharset)
- [addCharField](#shapefilewriteraddcharfield)
- [addDateField](#shapefilewriteradddatefield)
- [addLogicalField](#shapefilewriteraddlogicalfield)
- [addMemoField](#shapefilewriteraddmemofield)
- [addNumericField](#shapefilewriteraddnumericfield)
- [addFloatField](#shapefilewriteraddfloatfield)
- [addField](#shapefilewriteraddfield)
- [writeRecord](#shapefilewriterwriterecord)


### ShapefileWriter::__construct
```php?start_inline=1
public ShapefileWriter::__construct( mixed $files [, array $options = array() ] )
```

#### `$files`
*String* or *Array*, see [Files and filenames](#files-and-filenames) for details.


#### `$options`
Use the `$options` array parameter to pass some options and change the behaviour of the Class.
```php?start_inline=1
$Shapefile = new ShapefileWriter('myshape.shp', [
    Shapefile::OPTION_DBF_FORCE_ALL_CAPS        => true,
    Shapefile::OPTION_DBF_NULL_PADDING_CHAR     => '*',
    Shapefile::OPTION_OVERWRITE_EXISTING_FILES  => true,
]);
```

Here are the supported options and their default values:
 `Shapefile::OPTION_CPG_ENABLE_FOR_DEFAULT_CHARSET` : Default = `false`. Writes a *.cpg* file (if there is one open) also when DBF data charset is the default one.
 `Shapefile::OPTION_DBF_FORCE_ALL_CAPS` : Default = `false`. Forces all column names in upper case in the *.dbf* file.
 `Shapefile::OPTION_DBF_NULL_PADDING_CHAR` : Default = `null`. Defines a null padding character to represent `null` values in the *.dbf* file.
 `Shapefile::OPTION_DBF_NULLIFY_INVALID_DATES` : Default = `true`. Nullify invalid dates when writing *.dbf* files.
 `Shapefile::OPTION_DELETE_EMPTY_FILES` : Default = `true`. Deletes empty files after closing them (only if they weren't passed as resource handles).
 `Shapefile::OPTION_ENFORCE_GEOMETRY_DATA_STRUCTURE` : Default = `true`. Enforces Geometries to have all data fields defined in Shapefile (otherwise `null` will be assumed).
 `Shapefile::OPTION_OVERWRITE_EXISTING_FILES` : Default = `false`. Overwrites existing files with the same name, otherwise a ShapeFileException with `Shapefile::ERR_FILE_EXISTS` error will be thrown.
 `Shapefile::OPTION_SUPPRESS_M` : Default = `false`. Ignores *M dimension* in Geometries.
 `Shapefile::OPTION_SUPPRESS_Z` : Default = `false`. Ignores *Z dimension* in Geometries.



### ShapefileWriter::setShapeType
```php?start_inline=1
public ShapefileWriter::setShapeType( [ int $type ] ) : void
```

Sets the Shapefile type.

#### `$type`
Shape type. It can be on of the following:
 `Shapefile::SHAPE_TYPE_NULL` : 0 - Null Shape.
 `Shapefile::SHAPE_TYPE_POINT` : 1 - Point.
 `Shapefile::SHAPE_TYPE_POLYLINE` : 3 - PolyLine.
 `Shapefile::SHAPE_TYPE_POLYGON` : 5 - Polygon.
 `Shapefile::SHAPE_TYPE_MULTIPOINT` : 8 - MultiPoint.
 `Shapefile::SHAPE_TYPE_POINTZ` : 11 - PointZ.
 `Shapefile::SHAPE_TYPE_POLYLINEZ` : 13 - PolyLineZ.
 `Shapefile::SHAPE_TYPE_POLYGONZ` : 15 - PolygonZ.
 `Shapefile::SHAPE_TYPE_MULTIPOINTZ` : 18 - MultiPointZ.
 `Shapefile::SHAPE_TYPE_POINTM` : 21 - PointM.
 `Shapefile::SHAPE_TYPE_POLYLINEM` : 23 - PolyLineM.
 `Shapefile::SHAPE_TYPE_POLYGONM` : 25 - PolygonM.
 `Shapefile::SHAPE_TYPE_MULTIPOINTM` : 28 - MultiPointM.



### ShapefileWriter::setCustomBoundingBox
```php?start_inline=1
public ShapefileWriter::setCustomBoundingBox( array $bounding_box ) : void
```

Sets a custom bounding box for the Shapefile, ignoring the one that is computed out of all the Geometries contained into it.

#### `$bounding_box`
Associative array with the `xmin`, `xmax`, `ymin`, `ymax` and optional `zmin`, `zmax`, `mmin`, `mmax` values.



### ShapefileWriter::resetCustomBoundingBox
```php?start_inline=1
public ShapefileWriter::resetCustomBoundingBox( void ) : void
```

Resets the custom bounding box for the Shapefile, meaning the normally computed one will be written into the file.



### ShapefileWriter::setPRJ
```php?start_inline=1
public ShapefileWriter::setPRJ( string $prj ) : void
```

Sets PRJ well-known-text that will be written into the *.prj* file.

#### `$prj`
PRJ well-known-text. Pass a falsy value (e.g.: `false` or empty string `""`) to delete it.



### ShapefileWriter::setCharset
```php?start_inline=1
public ShapefileWriter::setCharset( mixed $charset ) : void
```

Sets the charset that will be written into the *.cpg* file. Note that **no conversion is carried out by the library when writing Shapefiles**, see [Strings charset conversion](#strings-charset-conversion) for details.

#### `$charset`
A string containing the charset name or a falsy value (e.g.: `false` or empty string `""`) to reset it to default `'ISO-8859-1'`.



### ShapefileWriter::addCharField
```php?start_inline=1
public ShapefileWriter::addCharField( string $name [, int $size = 254 [, bool $flag_sanitize_name = true ]] ) : string
```

Adds a char field (type `Shapefile::DBF_TYPE_CHAR`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. If `$flag_sanitize_name` is set to `true`, the library will normalize the name to comply with those requirements

#### `$size`
Lenght of the field, between 1 and 254 characters. Defaults to 254.

#### `$flag_sanitize_name`
Leaving this flag to `true`, the library will replace not allowed characters with underscores and truncate large names to 10 characters.


### ShapefileWriter::addDateField
```php?start_inline=1
public ShapefileWriter::addDateField( string $name [, bool $flag_sanitize_name = true ] ) : string
```

Adds a date field (type `Shapefile::DBF_TYPE_DATE`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. If `$flag_sanitize_name` is set to `true`, the library will normalize the name to comply with those requirements

#### `$flag_sanitize_name`
Leaving this flag to `true`, the library will replace not allowed characters with underscores and truncate large names to 10 characters.



### ShapefileWriter::addLogicalField
```php?start_inline=1
public ShapefileWriter::addLogicalField( string $name [, bool $flag_sanitize_name = true ] ) : string
```

Adds a logical field (type `Shapefile::DBF_TYPE_LOGICAL`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. If `$flag_sanitize_name` is set to `true`, the library will normalize the name to comply with those requirements

#### `$flag_sanitize_name`
Leaving this flag to `true`, the library will replace not allowed characters with underscores and truncate large names to 10 characters.



### ShapefileWriter::addMemoField
```php?start_inline=1
public ShapefileWriter::addMemoField( string $name [, bool $flag_sanitize_name = true ] ) : string
```

Adds a memo field (type `Shapefile::DBF_TYPE_MEMO`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. If `$flag_sanitize_name` is set to `true`, the library will normalize the name to comply with those requirements

#### `$flag_sanitize_name`
Leaving this flag to `true`, the library will replace not allowed characters with underscores and truncate large names to 10 characters.



### ShapefileWriter::addNumericField
```php?start_inline=1
public ShapefileWriter::addNumericField( string $name [, int $size = 10 [, int $decimals = 0 [, bool $flag_sanitize_name = true ]]] ) : string
```

Adds a numeric field (type `Shapefile::DBF_TYPE_NUMERIC`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. If `$flag_sanitize_name` is set to `true`, the library will normalize the name to comply with those requirements

#### `$size`
Lenght of the field, between 1 and 254 characters. Defaults to 10.

#### `$decimals`
Number of decimal digits. Defaults to 0, meaning an *integer* number. See [DBF data input/output](#dbf-data-inputoutput) section for details.

#### `$flag_sanitize_name`
Leaving this flag to `true`, the library will replace not allowed characters with underscores and truncate large names to 10 characters.



### ShapefileWriter::addFloatField
```php?start_inline=1
public ShapefileWriter::addFloatField( string $name [, int $size = 20 [, int $decimals = 10 [, bool $flag_sanitize_name = true ]]] ) : string
```

Adds a float field (type `Shapefile::DBF_TYPE_FLOAT`) to the Shapefile definition. It returns the effective field name after eventual sanitization.
Note that this field type is actually **not** part of dBaseIII PLUS original specifications.


#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. If `$flag_sanitize_name` is set to `true`, the library will normalize the name to comply with those requirements

#### `$size`
Lenght of the field, between 1 and 254 characters. Defaults to 20.

#### `$decimals`
Number of decimal digits. Defaults to 10. Number of decimal digits cannot be 0 for this field type. See [DBF data input/output](#dbf-data-inputoutput) section for details.

#### `$flag_sanitize_name`
Leaving this flag to `true`, the library will replace not allowed characters with underscores and truncate large names to 10 characters.



### ShapefileWriter::addField
```php?start_inline=1
public ShapefileWriter::addField( string $name, string $type, int $size, int $decimals [, bool $flag_sanitize_name = true ] ) : string
```

Adds a field to the Shapefile definition. This is a kind of *low level* method that allows to add a field of any type. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. If `$flag_sanitize_name` is set to `true`, the library will normalize the name to comply with those requirements

#### `$type`
Type of the field. It can be one of:
 `Shapefile::DBF_TYPE_CHAR` : String.
 `Shapefile::DBF_TYPE_DATE` : Date.
 `Shapefile::DBF_TYPE_LOGICAL` : Logical/Boolean.
 `Shapefile::DBF_TYPE_MEMO` : Memo (requires a *.dbt* file).
 `Shapefile::DBF_TYPE_NUMERIC` : Numeric.
 `Shapefile::DBF_TYPE_FLOAT` : Floating point numbers. *This is actually **not** part of dBaseIII PLUS specifications, but since there are many Shapefiles out there using it, it has been included in this library*.


#### `$size`
Lenght of the field, between 1 and 254 characters.

#### `$decimals`
Number of decimal digits for numeric types.

#### `$flag_sanitize_name`
Leaving this flag to `true`, the library will replace not allowed characters with underscores and truncate large names to 10 characters.



### ShapefileWriter::writeRecord
```php?start_inline=1
public ShapefileWriter::writeRecord( Geometry $Geometry ) : void
```

Writes a record to the Shapefile (actually, to all open files: *SHP*, *SHX*, *DBF* and optional *DBT*).

#### `$Geometry`
A `Geometry` object to be written into the Shapefile. It has to be compatible with the Shapefile shape type. If no shape type has been set, a ShapefileException with `Shapefile::ERR_SHP_TYPE_NOT_SET` error will be thrown.
Depending on the state of `Shapefile::OPTION_ENFORCE_GEOMETRY_DATA_STRUCTURE` option, either `null` values will be used for missing data fields or a ShapefileException with `Shapefile::ERR_GEOM_MISSING_FIELD` error will be thrown.




## Class Shapefile\Geometry\Geometry
This is the base Class for all the other Geometries. All of them expose the following public methods:

- [initFromArray](#geometryinitfromarray)
- [initFromWKT](#geometryinitfromwkt)
- [initFromGeoJSON](#geometryinitfromgeojson)
- [getArray](#geometrygetarray)
- [getWKT](#geometrygetwkt)
- [getGeoJSON](#geometrygetgeojson)
- [getBoundingBox](#geometrygetboundingbox)
- [setCustomBoundingBox](#geometrysetcustomboundingbox)
- [resetCustomBoundingBox](#geometryresetcustomboundingbox)
- [isEmpty](#geometryisempty)
- [isZ](#geometryisz)
- [isM](#geometryism)
- [isDeleted](#geometryisdeleted)
- [setFlagDeleted](#geometrysetflagdeleted)
- [getData](#geometrygetdata)
- [setData](#geometrysetdata)
- [getDataArray](#geometrygetdataarray)
- [setDataArray](#geometrysetdataarray)


### Geometry::initFromArray
```php?start_inline=1
public Geometry::initFromArray( array $array ) : void
```

Initializes the Geometry using a structured *Array*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.

#### `$array`
The structured *Array* to initialize the Geometry with.



### Geometry::initFromWKT
```php?start_inline=1
public Geometry::initFromWKT( string $wkt ) : void
```

Initializes the Geometry using a WKT *String*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.

#### `$wkt`
The WKT *String* to initialize the Geometry with.



### Geometry::initFromGeoJSON
```php?start_inline=1
public Geometry::initFromGeoJSON( string $geojson ) : void
```

Initializes the Geometry using a GeoJSON *String*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.

#### `$geojson`
The GeoJSON *String* to initialize the Geometry with.



### Geometry::getArray
```php?start_inline=1
public Geometry::getArray( void ) : array
```

Converts the Geometry into a structured *Array*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.



### Geometry::getWKT
```php?start_inline=1
public Geometry::getWKT( void ) : string
```

Converts the Geometry into a WKT *String*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.



### Geometry::getGeoJSON
```php?start_inline=1
public Geometry::getGeoJSON( [, bool $flag_bbox = true  [, bool $flag_feature = false ]] ) : string
```

Converts the Geometry into a GeoJSON *String*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.

#### `$flag_bbox`
Boolean flag to include a `"bbox"` member into the GeoJSON output. It defaults to `true` for all the Geometries but Points, where it defaults to `false`.

#### `$flag_feature`
Boolean flag to output a complete `"Feature"` object with all the data instead of a simple "`Geometry"` one.



### Geometry::getBoundingBox
```php?start_inline=1
public Geometry::getBoundingBox( void ) : array
```

Returns the Geometry bounding box as an *Array*:

```php?start_inline=1
[
    [xmin] => float
    [xmax] => float
    [ymin] => float
    [ymax] => float
    [zmin] => float        // Present only in Z Geometries
    [zmax] => float        // Present only in Z Geometries
    [mmin] => float/false  // Present only in M and Z Geometries
    [mmax] => float/false  // Present only in M and Z Geometries
]
```
*"No data"* values set for *M coordinates* are returned as *Boolean* `false`.



### Geometry::setCustomBoundingBox
```php?start_inline=1
public Geometry::setCustomBoundingBox( array $bounding_box ) : void
```

Sets a custom bounding box for the Geometry, overriding the computed one. No formal check is carried out except the compliance of dimensions.

#### `$bounding_box`
The bounding box array with `"xmin"`, `"xmax"`, `"ymin"`, `"ymax"`, and optional `"zmin"`, `"zmax"`, `"mmin"` and `"mmax"` members.



### Geometry::resetCustomBoundingBox
```php?start_inline=1
public Geometry::resetCustomBoundingBox( void ) : void
```

Resets a previously set custom bounding box for the Geometry, causing [getBoundingBox](#geometrygetboundingbox) method to return a normally computed one.



### Geometry::isEmpty
```php?start_inline=1
public Geometry::isEmpty( void ) : bool
```

Returns `true` if the Geometry is *empty* or `false` if it isn't.



### Geometry::isZ
```php?start_inline=1
public Geometry::isZ( void ) : bool
```

Returns `true` if the Geometry has the *Z dimension* or `false` if it doesn't.



### Geometry::isM
```php?start_inline=1
public Geometry::isM( void ) : bool
```

Returns `true` if the Geometry has the *M dimension* or `false` if it doesn't.



### Geometry::isDeleted
```php?start_inline=1
public Geometry::isDeleted( void ) : bool
```

Returns `true` if the record is marked as *deleted* in the *.dbf* file `false` if it isn't.



### Geometry::setFlagDeleted
```php?start_inline=1
public Geometry::isDeleted( bool $value ) : void
```

Marks or unmarks the Geometry as *deleted* in the *.dbf* file. This makes sense only when writing Shapefiles.

#### `$value`
*Boolean* value of the *deleted* flag.



### Geometry::getData
```php?start_inline=1
public Geometry::getData( string $fieldname ) : mixed
```

Gets data value for the speficied field. Refer to the [DBF data input/output](#dbf-data-inputoutput) section for details.

#### `$fieldname`
The field name to get the data for.



### Geometry::setData
```php?start_inline=1
public Geometry::setData( string $fieldname, mixed $value) : void
```

Sets data value for the speficied field name. Refer to the [DBF data input/output](#dbf-data-inputoutput) section for details.

#### `$fieldname`
The field name to set the data for.

#### `$value`
The value to assign to the specified field in the Geometry.



### Geometry::getDataArray
```php?start_inline=1
public Geometry::getDataArray( void ) : array
```

Gets all the data of the Geometry as an associative *Array*. Refer to the [DBF data input/output](#dbf-data-inputoutput) section for details.


### Geometry::setDataArray
```php?start_inline=1
public Geometry::setDataArray( array $data ) : void
```

Sets all the data of the Geometry using an associative *Array*. Refer to the [DBF data input/output](#dbf-data-inputoutput) section for details.

#### `$data`
Associative *Array* containing the data to assign to the different fields in the Geometry.




## Class Shapefile\Geometry\Point
Point Geometry Class. It exposes all the public methods of the [Geometry](#class-shapefilegeometrygeometry) base Class, plus the following ones:

- [__construct](#point__construct)
- [getX](#pointgetx)
- [getY](#pointgety)
- [getZ](#pointgetz)
- [getM](#pointgetm)


### Point::__construct
```php?start_inline=1
public Point::__construct( [float $x = null, float $y = null [, float $z = null [, float $m = null ]]] )
```

You can create an *empty* Point without specifying any coordinate and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it passing its coordinates to the constructor.
If you choose for the latter, you will have to pass both X and Y coordinates, while both Z and M ones are optional.

#### `$x`
Value for X coordinate.

#### `$y`
Value for Y coordinate.

#### `$z`
Value for Z coordinate.

#### `$m`
Value for M coordinate.



### Point::getX
```php?start_inline=1
public Point::getX( void ) : float
```

Returns the value of the X coordinate.



### Point::getY
```php?start_inline=1
public Point::getY( void ) : float
```

Returns the value of the Y coordinate.



### Point::getZ
```php?start_inline=1
public Point::getZ( void ) : float
```

Returns the value of the Z coordinate.



### Point::getM
```php?start_inline=1
public Point::getM( void ) : float
```

Returns the value of the M coordinate.




## Class Shapefile\Geometry\MultiPoint
MultiPoint Geometry Class. It exposes all the public methods of the [Geometry](#class-shapefilegeometrygeometry) base Class, plus the following ones:

- [__construct](#multipoint__construct)
- [addPoint](#multipointaddpoint)
- [getPoint](#multipointgetpoint)
- [getPoints](#multipointgetpoints)
- [getNumPoints](#multipointgetnumpoints)


### MultiPoint::__construct
```php?start_inline=1
public MultiPoint::__construct( [ Points[] $points ] )
```

You can create an *empty* MultiPoint without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Point](#class-shapefilegeometrypoint) Geometries.

#### `$points`
Array of [Point](#class-shapefilegeometrypoint) Geometries.



### MultiPoint::addPoint
```php?start_inline=1
public MultiPoint::addPoint( Point $Point ) : void
```

Adds a Point to the Collection.

#### `$Point`
[Point](#class-shapefilegeometrypoint) Geometry to add.



### MultiPoint::getPoint
```php?start_inline=1
public MultiPoint::getPoint( int $index ) : Point
```

Gets a Point from the Collection at the specified index.

#### `$index`
Index of the [Point](#class-shapefilegeometrypoint) Geometry to retrieve.



### MultiPoint::getPoints
```php?start_inline=1
public MultiPoint::getPoints( void ) : Point[]
```

Gets all the Points from the Collection as an array of [Point](#class-shapefilegeometrypoint) Geometries.



### MultiPoint::getNumPoints
```php?start_inline=1
public MultiPoint::getNumPoints( void ) : int
```

Gets the number of Points in the Collection.




## Class Shapefile\Geometry\Linestring
Linestring Geometry Class. It exposes all the public methods of the [Geometry](#class-shapefilegeometrygeometry) base Class, plus the following ones:

- [__construct](#linestring__construct)
- [addPoint](#linestringaddpoint)
- [getPoint](#linestringgetpoint)
- [getPoints](#linestringgetpoints)
- [getNumPoints](#linestringgetnumpoints)
- [isClosedRing](#linestringisclosedring)


### Linestring::__construct
```php?start_inline=1
public Linestring::__construct( [ Points[] $points ] )
```

You can create an *empty* Linestring without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Point](#class-shapefilegeometrypoint) Geometries.

#### `$points`
Array of [Point](#class-shapefilegeometrypoint) Geometries.



### Linestring::addPoint
```php?start_inline=1
public Linestring::addPoint( Point $Point ) : void
```

Adds a Point to the Collection.

#### `$Point`
[Point](#class-shapefilegeometrypoint) Geometry to add.



### Linestring::getPoint
```php?start_inline=1
public Linestring::getPoint( int $index ) : Point
```

Gets a Point from the Collection at the specified index.

#### `$index`
Index of the [Point](#class-shapefilegeometrypoint) Geometry to retrieve.



### Linestring::getPoints
```php?start_inline=1
public Linestring::getPoints( void ) : Point[]
```

Gets all the Points from the Collection as an array of [Point](#class-shapefilegeometrypoint) Geometries.



### Linestring::getNumPoints
```php?start_inline=1
public Linestring::getNumPoints( void ) : int
```

Gets the number of Points in the Collection.



### Linestring::isClosedRing
```php?start_inline=1
public Linestring::isClosedRing( void ) : bool
```

Checks whether the Linestring is a *closed ring* or not. A closed ring has at least 4 vertices and the first and last ones must be the same.




## Class Shapefile\Geometry\MultiLinestring
MultiLinestring Geometry Class. It exposes all the public methods of the [Geometry](#class-shapefilegeometrygeometry) base Class, plus the following ones:

- [__construct](#multilinestring__construct)
- [addLinestring](#multilinestringaddlinestring)
- [getLinestring](#multilinestringgetlinestring)
- [getLinestrings](#multilinestringgetlinestrings)
- [getNumLinestrings](#multilinestringgetnumlinestrings)


### MultiLinestring::__construct
```php?start_inline=1
public MultiLinestring::__construct( [ Linestring[] $linestrings ] )
```

You can create an *empty* MultiLinestring without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.

#### `$linestrings`
Array of [Linestring](#class-shapefilegeometrylinestring) Geometries.



### MultiLinestring::addLinestring
```php?start_inline=1
public MultiLinestring::addLinestring( Linestring $Linestring ) : void
```

Adds a Linestring to the Collection.

#### `$Linestring`
[Linestring](#class-shapefilegeometrylinestring) Geometry to add.



### MultiLinestring::getLinestring
```php?start_inline=1
public MultiLinestring::getLinestring( int $index ) : Linestring
```

Gets a Linestring from the Collection at the specified index.

#### `$index`
Index of the [Linestring](#class-shapefilegeometrylinestring) Geometry to retrieve.



### MultiLinestring::getLinestrings
```php?start_inline=1
public MultiLinestring::getLinestrings( void ) : Linestring[]
```

Gets all the Linestrings from the Collection as an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.



### MultiLinestring::getNumLinestrings
```php?start_inline=1
public MultiLinestring::getNumLinestrings( void ) : int
```

Gets the number of Linestrings in the Collection.




## Class Shapefile\Geometry\Polygon
Polygon Geometry Class. Throughout this Class the term *Ring* is used to refer to a *closed Linestring*, that is a Linestring with at least 4 vertices whose first and last ones must be the same. All Linestrings forming part of a Polygon are enforced to be closed rings.
It exposes all the public methods of the [Geometry](#class-shapefilegeometrygeometry) base Class, plus the following ones:

- [__construct](#polygon__construct)
- [addRing](#polygonaddring)
- [getRing](#polygongetring)
- [getRings](#polygongetrings)
- [getNumRings](#polygongetnumrings)
- [getOuterRing](#polygongetouterring)
- [getInnerRings](#polygongetinnerrings)


### Polygon::__construct
```php?start_inline=1
public Polygon::__construct( [ Linestring[] $linestrings [, bool $flag_enforce_closed_rings = true ]] )
```

You can create an *empty* Polygon without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.

#### `$linestrings`
Array of [Linestring](#class-shapefilegeometrylinestring) Geometries.

#### `$flag_enforce_closed_rings`
Set this flag to `false` to prevent the Class from enforcing all its parts to be closed rings.



### Polygon::addRing
```php?start_inline=1
public Polygon::addRing( Linestring $Linestring ) : void
```

Adds a Linestring to the Collection. Keep in mind that the **first one** will be recognized as the Polygon **outer ring** and no formal checks will be made.

#### `$Linestring`
[Linestring](#class-shapefilegeometrylinestring) Geometry to add.



### Polygon::getRing
```php?start_inline=1
public Polygon::getRing( int $index ) : Linestring
```

Gets a Linestring from the Collection at the specified index.

#### `$index`
Index of the [Linestring](#class-shapefilegeometrylinestring) Geometry to retrieve.



### Polygon::getRings
```php?start_inline=1
public Polygon::getRings( void ) : Linestring[]
```

Gets all the Linestrings from the Collection as an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.



### Polygon::getNumRings
```php?start_inline=1
public Polygon::getNumRings( void ) : int
```

Gets the number of Linestrings in the Collection.



### Polygon::getOuterRing
```php?start_inline=1
public Polygon::getOuterRing( void ) : Linestring
```

Gets the Polygon outer ring (that is, the ring at index `0`);



### Polygon::getInnerRings
```php?start_inline=1
public Polygon::getInnerRings( void ) : Linestring[]
```

Gets polygon inners rings as an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.




## Class Shapefile\Geometry\MultiPolygon
MultiPolygon Geometry Class. It exposes all the public methods of the [Geometry](#class-shapefilegeometrygeometry) base Class, plus the following ones:

- [__construct](#multipolygon__construct)
- [addPolygon](#multipolygonaddpolygon)
- [getPolygon](#multipolygongetpolygon)
- [getPolygons](#multipolygongetpolygons)
- [getNumPolygons](#multipolygongetnumpolygons)


### MultiPolygon::__construct
```php?start_inline=1
public MultiPolygon::__construct( [ Polygon[] $polygons [, bool $flag_enforce_closed_rings = true ]] )
```

You can create an *empty* MultiPolygon without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Polygon](#class-shapefilegeometrypolygon) Geometries.

#### `$polygons`
Array of [Polygon](#class-shapefilegeometrypolygon) Geometries.

#### `$flag_enforce_closed_rings`
Set this flag to `false` to prevent the Class from enforcing all its polygons parts to be closed rings.



### MultiPolygon::addPolygon
```php?start_inline=1
public MultiPolygon::addPolygon( Polygon $Polygon ) : void
```

Adds a Polygon to the Collection.

#### `$Polygon`
[Polygon](#class-shapefilegeometrypolygon) Geometry to add.



### MultiPolygon::getPolygon
```php?start_inline=1
public MultiPolygon::getPolygon( int $index ) : Polygon
```

Gets a Polygon from the Collection at the specified index.

#### `$index`
Index of the [Polygon](#class-shapefilegeometrypolygon) Geometry to retrieve.



### MultiPolygon::getPolygons
```php?start_inline=1
public MultiPolygon::getPolygons( void ) : Polygon[]
```

Gets all the Polygons from the Collection as an array of [Polygon](#class-shapefilegeometrypolygon) Geometries.



### MultiPolygon::getNumPolygons
```php?start_inline=1
public MultiPolygon::getNumPolygons( void ) : int
```

Gets the number of Polygons in the Collection.





## Files and filenames
Filenames can be passed either as a *String* with the path to the `.shp` file (with or without the extension), as an *Array* containing individual paths to single files or as an *Array* of resource handles.

For example, the three following variants are equivalent:

```php?start_inline=1
// This is will look for "myshape.shp", "myshape.shx" and "myshape.dbf" files
$Shapefile = new ShapefileReader('myshape');

// This as well
$Shapefile = new ShapefileReader('myshape.shp');

// And this too
$Shapefile = new ShapefileReader([
    Shapefile::FILE_SHP => 'myshape.shp',
    Shapefile::FILE_SHX => 'myshape.shx',
    Shapefile::FILE_DBF => 'myshape.dbf',
]);
```

In order to provide greater flexibility, it also accepts resource handles:

```php?start_inline=1
// Reading files
$Shapefile = new ShapefileReader([
    Shapefile::FILE_SHP => fopen('/path/to/file.shp', 'rb'),
    Shapefile::FILE_SHX => fopen('/path/to/file.shx', 'rb'),
    Shapefile::FILE_DBF => fopen('/path/to/file.dbf', 'rb'),
]);

// Writing files
$Shapefile = new ShapefileWriter([
    Shapefile::FILE_SHP => fopen('/path/to/file.shp', 'wb'),
    Shapefile::FILE_SHX => fopen('/path/to/file.shx', 'wb'),
    Shapefile::FILE_DBF => fopen('/path/to/file.dbf', 'wb'),
]);
```

Supported file types are: 
 `Shapefile::FILE_SHP` : Required. Geometries file.
 `Shapefile::FILE_SHX` : Required. Index file.
 `Shapefile::FILE_DBF` : Required. Attributes file.
 `Shapefile::FILE_DBT` : Optional. Extended *Memo* attributes file.
 `Shapefile::FILE_PRJ` : Optional. WKT projection file.
 `Shapefile::FILE_CPG` : Optional. *DBF* charset file. 


### Closing files / Releasing the handles
This library adopts a *PDO-like* behaviour when it comes to closing open files and releasing their handles: they are closed upon object destruction. This means that if you want to close open files, simply set the ShapefileReader or ShapefileWriter instance to `null`:
```php?start_inline=1
$Shapefile = null;
```

It is extremely important to keep this in mind when writing Shapefiles: **files will be finalized just before closing them**! This means that if you want to do something with those newly created Shapefiles, you will have to close them destroying the ShapefileWriter instance before.
To answer the question "why not a *close()* method?" For the same reason as there is none in PDO: a ShapefileReader or ShapefileWriter instance with closed files would make no sense at all.




## A note about Polygons orientation
ESRI Shapefile specifications establish clockwise orientation for Polygons external rings and counterclockwise orientation for internal ones.
Simple Features and GeoJSON, on the other hand, dictate the opposite. There is a lot of confusion about this subject and the expression *right-hand rule* is used for both scenarios.
It is worth noting that many Simple Features implementations (such as PostGIS) will not reject Polygons not complying to the specification, nor should proper GeoJSON parsers (see the note in [section 3.1.6](https://tools.ietf.org/html/rfc7946#section-3.1.6)).

This library gives the greatest flexibility to the programmer when **reading** Shapefiles through the [ShapefileReader](#shapefilereader__construct) `Shapefile::OPTION_INVERT_POLYGONS_ORIENTATION` constructor option. By default it is set to `true`, meaning it assumes the Shapefile is compliant to the specs and polygons external rings are stored with clockwise orientation: leaving this option enabled it will cause the output to be Simple Features compliant, thus polygons external rings will be converted to counterclockwise orientation (inner rings are reversed too and they will be in clockwise orientation in the output).

When **writing** a Shapefile things are easier, since the library will take care of everything and produce a file compliant to ESRI specifications (it analyzes and eventually corrects polygons outer and inner rings orientation).





## Geometry input/output formats
Starting from v3 of this library, geometries are represented by specific [classes](#namespaces-and-classes) that extend a [Geometry](#class-shapefilegeometrygeometry) abstract base class.
When reading from Shapefiles, multi `MULTI*`, 3dz `* Z`, 3dm `* M` and  4d `* ZM` geometries are recognized as such, unless some specific options like `Shapefile::OPTION_SUPPRESS_Z` and `Shapefile::OPTION_SUPPRESS_M` are being used.
ESRI Shapefile specifications allow a special *"no data"* value for *M coordinates*, which is represented by *Boolean* `false` value in this library.

The structure of [getArray](#geometrygetarray), [getWKT](#geometrygetwkt) and [getGeoJSON](#geometrygetgeojson) methods output is given below.


### Point geometries
```php?start_inline=1
- Array:
    [
        [x] => float
        [y] => float
        [z] => float        // Present only for 3dz and 4d types
        [m] => float/bool   // Present only for 3dm and 4d types
    ]

- WKT:
    POINT [Z][M] (x y z m)
    
- GeoJSON Geometry:
    {
        "type": "Point" / "PointM"
        "coordinates": [x, y, z, m]
    }
    
- GeoJSON Feature:
    {
        "type": "Feature",
        "geometry": {
            "type": "Point" / "PointM",
            "coordinates": [x, y, z, m]
        },
        "properties":{
            "FIELD_1": "data1",
            "FIELD_n": "datan"
        }
    }
```


### MultiPoint geometries
```php?start_inline=1
- Array: [
    [numpoints] => int
    [points]    => [
        [
            [x] => float
            [y] => float
            [z] => float        // Present only for 3dz and 4d types
            [m] => float/bool   // Present only for 3dm and 4d types
        ]
    ]
]

- WKT:
    MULTIPOINT [Z][M] (x y z m, x y z m)
    N.B.: Points coordinates may be enclosed in additional brackets: MULTIPOINT ((x y z m), (x y z m))

- GeoJSON Geometry:
    {
        "type": "MultiPoint" / "MultiPointM",
        "bbox": [xmin, ymin, zmin, mmin, xmax, ymax, zmax, mmax],
        "coordinates": [
            [x, y, z, m]
        ]
    }
    
- GeoJSON Feature:
    {
        "type": "Feature",
        "geometry": {
            "type": "MultiPoint" / "MultiPointM",
            "bbox": [xmin, ymin, zmin, mmin, xmax, ymax, zmax, mmax],
            "coordinates": [
                [x, y, z, m]
            ]
        },
        "properties":{
            "FIELD_1": "data1",
            "FIELD_n": "datan"
        }
    }
```


### Linestring geometries
```php?start_inline=1
- Array: [
    [numpoints] => int
    [points]    => [
        [
            [x] => float
            [y] => float
            [z] => float        // Present only for 3dz and 4d types
            [m] => float/bool   // Present only for 3dm and 4d types
        ]
    ]
]

- WKT:
    LINESTRING [Z][M] (x y z m, x y z m)

- GeoJSON Geometry:
    {
        "type": "Linestring" / "LinestringM",
        "bbox": [xmin, ymin, zmin, mmin, xmax, ymax, zmax, mmax],
        "coordinates": [
            [x, y, z, m]
        ]
    }
    
- GeoJSON Feature:
    {
        "type": "Feature",
        "geometry": {
            "type": "Linestring" / "LinestringM",
            "bbox": [xmin, ymin, zmin, mmin, xmax, ymax, zmax, mmax],
            "coordinates": [
                [x, y, z, m]
            ]
        },
        "properties":{
            "FIELD_1": "data1",
            "FIELD_n": "datan"
        }
    }
```


### MultiLinestring geometries
```php?start_inline=1  
- Array: [
    [numparts]  => int
    [parts]     => [
        [
            [numpoints] => int
            [points]    => [
                [
                    [x] => float
                    [y] => float
                    [z] => float
                    [m] => float/bool
                ]
            ]
        ]
    ]
]

- WKT:
    MULTILINESTRING [Z][M] ((x y z m, x y z m, x y z m), (x y z m, x y z m))

- GeoJSON Geometry:
    {
        "type": "MultiLinestring" / "MultiLinestringM"
        "coordinates": [
            [
                [x, y, z, m]
            ]
        ]
    }

- GeoJSON Feature:
    {
        "type": "Feature",
        "geometry": {
            "type": "MultiLinestring" / "MultiLinestringM",
            "bbox": [xmin, ymin, zmin, mmin, xmax, ymax, zmax, mmax],
            "coordinates": [
                [
                    [x, y, z, m]
                ]
            ]
        },
        "properties":{
            "FIELD_1": "data1",
            "FIELD_n": "datan"
        }
    }
```


### Polygon geometries
```php?start_inline=1  
- Array: [
    [numrings]  => int
    [rings]     => [
        [
            [numpoints] => int
            [points]    => [
                [
                    [x] => float
                    [y] => float
                    [z] => float
                    [m] => float/bool
                ]
            ]
        ]
    ]
]

- WKT:
    POLYGON [Z][M] ((x y z m, x y z m, x y z m, x y z m), (x y z m, x y z m, x y z m))

- GeoJSON Geometry:
    {
        "type": "Polygon" / "PolygonM"
        "coordinates": [
            [
                [x, y, z, m]
            ]
        ]
    }

- GeoJSON Feature:
    {
        "type": "Feature",
        "geometry": {
            "type": "Polygon" / "PolygonM",
            "bbox": [xmin, ymin, zmin, mmin, xmax, ymax, zmax, mmax],
            "coordinates": [
                [
                    [x, y, z, m]
                ]
            ]
        },
        "properties":{
            "FIELD_1": "data1",
            "FIELD_n": "datan"
        }
    }
```


### MultiPolygon geometries
```php?start_inline=1  
- Array: [
    [numparts]  => int
    [parts]     => [
        [
            [numrings]  => int
            [rings]     => [
                [
                    [numpoints] => int
                    [points]    => [
                        [
                            [x] => float
                            [y] => float
                            [z] => float
                            [m] => float/bool
                        ]
                    ]
                ]
            ]
        ]
    ]
]

- WKT:
    MULTIPOLYGON [Z][M] (((x y z m, x y z m, x y z m, x y z m), (x y z m, x y z m, x y z m)), ((x y z m, x y z m, x y z m, x y z m), (x y z m, x y z m, x y z m)))

- GeoJSON Geometry:
    {
        "type": "MultiPolygon" / "MultiPolygonM"
        "coordinates": [
            [
                [
                    [x, y, z, m]
                ]
            ]
        ]
    }

- GeoJSON Feature:
    {
        "type": "Feature",
        "geometry": {
            "type": "MultiPolygon" / "MultiPolygonM",
            "bbox": [xmin, ymin, zmin, mmin, xmax, ymax, zmax, mmax],
            "coordinates": [
                [
                    [
                        [x, y, z, m]
                    ]
                ]
            ]
        },
        "properties":{
            "FIELD_1": "data1",
            "FIELD_n": "datan"
        }
    }
```





## DBF data input/output
Despite some misleading information that can be found on the internet, *DBF* files that come with ESRI Shapefiles must follow dBase III PLUS specifications and not dBase IV ones.
It is true dBase III PLUS and dBase IV are quite similar, but the differences between them are enough to prevent a perfectly compliant ESRI Shapefile parser from opening/reading a file using the wrong version specs.
More specifically, the full original version required by ESRI Shapefile standard is ***dBase III PLUS without memo files***, which stores all the data as `ISO-8859-1`-encoded text.
However, I took some *licences* and included custom charsets (*CPG* files) and memo fields (*DBT* files) support in this library, because a lot of modern software is using those features and they have become a *de facto* standard for Shapefiles.

Having clarified that, there are a couple of implications and things to keep in mind when using the library:

### Numbers are stored as text in *DBF* files
When **reading** a Shapefile, this library ***will not*** try to convert integer and floating point numbers to such. Instead, they will be returned as text, leaving complete freedom about data conversion and/or interpretation to the programmer. ShapefileReader [getFieldDecimals](#shapefilereadergetfielddecimals) method comes in handy for accurate conversion, but keep in mind that there is a lot of software out there creating *not really compliant or accurate* Shapefiles and the value returned by this method is often just *descriptive* or even plainly wrong in relation to the actual data stored in the *DBF* file (that's the reason why this library does not attempt an automatic conversion in the first place).
When **writing** a Shapefile, the library will take care of formal compliance to field *size* and *decimals* values, truncating eventual exceeding decimal parts, e.g.: the value `123.123456` in a field of *size* 10 with 5 *decimals* will be formatted as `123.1234`. If the lenght of the formatted value exceeds field *size*, a ShapeFileException with error `Shapefile::ERR_INPUT_NUMERIC_VALUE_OVERFLOW` will be thrown (e.g.: trying to store the value `123456.99` in a field of of *size* 10 with 5 *decimals* would produce `123456.9900` and raise the exception).

### Dates are returned as text in ISO format or as `DateTime` objects
Depending on the state of `Shapefile::OPTION_DBF_NULLIFY_INVALID_DATES` and `Shapefile::OPTION_DBF_RETURN_DATES_AS_OBJECTS` options, ShapefileReader Class will try to validate dates and return them as text in ISO ***YYYY-MM-DD*** format, as a [DateTime](#https://www.php.net/manual/en/class.datetime.php) object or as `null` in case of an invalid date when `Shapefile::OPTION_DBF_NULLIFY_INVALID_DATES` is enabled.

### Logical values are converted to the right type
Logical values are parsed, converted and returned as `boolean`. Beware that `null` values are allowed for `Shapefile::DBF_TYPE_LOGICAL` fields (internally stored as `"?"`), thus possible return values are `true`, `false` and `null`.

### Strings charset conversion
When **reading** a Shapefile, if `Shapefile::OPTION_DBF_CONVERT_TO_UTF8` is enabled, all strings will be converted to **UTF-8** from the charset specified in the *CPG* file or with [setCharset](#shapefilereadersetcharset) method. It is important to perform the conversion directly into the library because strings are whitespace-padded into *DBF* files and *trimming* them to remove useless padding before converting to *UTF-8* might mess up the actual encoding (*DBF* specs assume strings are stored as `ISO-8859-1`, where each character is always a single byte).
When **writing** a Shapefile, it is up to you to provide input strings encoded in the same charset specified with [setCharset](#shapefilewritersetcharset) method. Keep in mind that dBase specifications only allow `ISO-8859-1` encoding where each character occupy one single byte. Using a different charset encoding will likely reduce the effective maximun size of 254 characters allowed for a field (e.g.: for `UTF-8` strings, more than one byte per character might be used). Longer strings will be truncated according to the specified field size, of course.

### Memo fields
Memo fields do not have a size limitation by design (even though original specs did not allow *DBT* files larger than 2GB). They store text in 512bytes consecutive blocks of *plain text* and their content is treated the same way as character fields (see above for charset conversion implications).






## Examples

### Example 1 - Get Shapefile info
```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/Shapefile/ShapefileAutoloader.php');
Shapefile\ShapefileAutoloader::register();

// Import classes
use Shapefile\Shapefile;
use Shapefile\ShapefileException;
use Shapefile\ShapefileReader;

echo "<pre>";
try {
    // Open Shapefile
    $Shapefile = new ShapefileReader('example.shp');
    
    // Get Shape Type
    echo "Shape Type : ";
    echo $Shapefile->getShapeType() . " - " . $Shapefile->getShapeType(Shapefile::FORMAT_STR);
    echo "\n\n";
    
    // Get number of Records
    echo "Records : ";
    print_r($Shapefile->getTotRecords());
    echo "\n\n";
    
    // Get Bounding Box
    echo "Bounding Box : ";
    print_r($Shapefile->getBoundingBox());
    echo "\n\n";
    
    // Get PRJ
    echo "PRJ : ";
    print_r($Shapefile->getPRJ());
    echo "\n\n";
    
    // Get Charset
    echo "Charset : ";
    print_r($Shapefile->getCharset());
    echo "\n\n";
    
    // Get DBF Fields
    echo "DBF Fields : ";
    print_r($Shapefile->getFields());
    echo "\n\n";
    
} catch (ShapefileException $e) {
    // Print detailed error information
    exit(
        "Error Type: "  . $e->getErrorType()
        . "\nMessage: " . $e->getMessage()
        . "\nDetails: " . $e->getDetails()
    );
}
echo "</pre>";
```


### Example 2 - Read a Shapefile using a foreach iterator
```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/Shapefile/ShapefileAutoloader.php');
Shapefile\ShapefileAutoloader::register();

// Import classes
use Shapefile\Shapefile;
use Shapefile\ShapefileException;
use Shapefile\ShapefileReader;

try {
    $Shapefile = new ShapefileReader('example.shp');
    foreach ($Shapefile as $i => $Geometry) {
        /*
            Do something with $Geometry here....
            $i contains the record number.
        */
    }
} catch (ShapefileException $e) {
    // Handle the exception here...
}
```


### Example 3 - Build a complex Geometry out of simple ones
```php?start_inline=1
// Import classes
use Shapefile\Geometry\Point;
use Shapefile\Geometry\Linestring;
use Shapefile\Geometry\Polygon;

// Build a Linestring passing an array of Points to its constructor
$Linestring1 = new Linestring([
    new Point(0, 0),
    new Point(2, 4),
    new Point(4, 0),
    new Point(0, 0),
]);

// Create en empty Linestring and initialize it with some WKT
$Linestring2 = new Linestring();
$Linestring2->initFromWKT('LINESTRING (1 1, 2 2, 3 1, 1 1)');

// Create an empty Polygon and adds an outer and an inner ring with previously created Linestrings
$Polygon = new Polygon();
$Polygon->addRing($Linestring1);
$Polygon->addRing($Linestring2);
```




## Wait, what about *MultiPatch* shape types?
Well, after more than 15 years working with GIS related technologies, I have yet to see a *MultiPatch* Shapefile. Supporting them is not currently in the todo list.


## History
*23 September 2019* - [Version 3.0.2](/posts/php-shapefile-3.0.2/)
*31 August 2019* - [Version 3.0.1](/posts/php-shapefile-3.0.1/)
*30 August 2019* - [Version 3.0.0](/posts/php-shapefile-3.0.0/)
*7 April 2018* - [Version 2.4.3](/posts/php-shapefile-2.4.3/)
*6 December 2017* - [Version 2.4.2](/posts/php-shapefile-2.4.2/)
*30 November 2017* - [Version 2.4.1](/posts/php-shapefile-2.4.1/)
*20 November 2017* - [Version 2.4.0](/posts/php-shapefile-2.4.0/)
*14 September 2017* - [Version 2.3.0](/posts/php-shapefile-2.3.0/)
*23 November 2016* - [Version 2.2.0](/posts/php-shapefile-2.2.0/)
*17 November 2016* - [Version 2.1.0](/posts/php-shapefile-2.1.0/)
*10 November 2016* - [Version 2.0.1](/posts/php-shapefile-2.0.1/)
*1 November 2016* - [Version 2.0.0](/posts/php-shapefile-2.0.0/)
*31 March 2016* - [Version 1.1](/posts/php-shapefile-version-1.1/)
*13 November 2014* - [Version 1.0](/posts/php-shapefile-release/)
