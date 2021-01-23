---
layout      : lab
title       : PHP Shapefile
description : PHP library to read and write ESRI Shapefiles, compatible with WKT and GeoJSON
updated     : 2021-01-23
getit       :
  github        : gasparesganga/php-shapefile
  download      : true
  composer      : gasparesganga/php-shapefile
---

{% capture current_date %}{{'now' | date: '%s'}}{% endcapture %}
{% capture expire_date %}{{'2021-02-28' | date: '%s'}}{% endcapture %}
{% if current_date < expire_date %}
<div class="alert">
    <b>23 January 2021 :</b> Version 3.4.0 released: see the <a href="/posts/php-shapefile-3.4.0/">release notes</a>.
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
- Implements the [Iterator](https://php.net/manual/en/class.iterator.php) and [Fluent](https://en.wikipedia.org/wiki/Fluent_interface#PHP) interfaces
- PHP 5.4+ compatible
- [PHP FIG](https://www.php-fig.org) [PSR-1](https://www.php-fig.org/psr/psr-1/), [PSR-4](https://www.php-fig.org/psr/psr-4/) and [PSR-12](https://www.php-fig.org/psr/psr-12/) compliant



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
    echo "Error Type: " . $e->getErrorType()
        . "\nMessage: " . $e->getMessage()
        . "\nDetails: " . $e->getDetails();
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
    echo "Error Type: " . $e->getErrorType()
        . "\nMessage: " . $e->getMessage()
        . "\nDetails: " . $e->getDetails();
}
```

Check the [Examples](#examples) section for more usage hints.




## Namespaces and Classes
There are 2 Namespaces, `Shapefile` and `Shapefile\Geometry`, containing the following Classes:

- Shapefile\\**[ShapefileAutoloader](#class-shapefileshapefileautoloader)**
- Shapefile\\**[ShapefileException](#class-shapefileshapefileexception)**
- *Abstract* Shapefile\\**[Shapefile](#class-shapefileshapefile)**
- Shapefile\\**[ShapefileReader](#class-shapefileshapefilereader)**
- Shapefile\\**[ShapefileWriter](#class-shapefileshapefilewriter)**
- *Abstract* Shapefile\Geometry\\**[Geometry](#class-shapefilegeometrygeometry)**
- Shapefile\Geometry\\**[Point](#class-shapefilegeometrypoint)**
- Shapefile\Geometry\\**[MultiPoint](#class-shapefilegeometrymultipoint)**
- Shapefile\Geometry\\**[Linestring](#class-shapefilegeometrylinestring)**
- Shapefile\Geometry\\**[MultiLinestring](#class-shapefilegeometrymultilinestring)**
- Shapefile\Geometry\\**[Polygon](#class-shapefilegeometrypolygon)**
- Shapefile\Geometry\\**[MultiPolygon](#class-shapefilegeometrymultipolygon)**

To keep things easy and tidy, all package-wide constants are exposed by <code>Shapefile\<b>Shapefile</b></code> Abstract Class, e.g.: `Shapefile::OPTION_SUPPRESS_Z`.




## Class Shapefile\ShapefileAutoloader
This is a simple static class which provides autoloading capabilities for the library. Use the static method **`Shapefile\ShapefileAutoloader::register()`** as shown in the [example](#basic-usage) to register the PHP Shapefile autoloader.

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)




## Class Shapefile\ShapefileException
A custom exception which extends PHP native [Exception](https://php.net/manual/en/language.exceptions.php) class. It can be used to isolate PHP Shapefile related exceptions. It adds 2 custom methods `getErrorType()` and `getDetails()`. See it in action in the [example above](#basic-usage).

- [getErrorType](#shapefileexceptiongeterrortype)
- [getDetails](#shapefileexceptiongetdetails)

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [ShapefileException](#class-shapefileshapefileexception)::getErrorType
```php?start_inline=1
public ShapefileException::getErrorType( void ) : string
```

Gets internal error type as a string. Useful to react to specific errors.
Here are all possible error types:

| Error                                             | Description |
| ------------------------------------------------- | ----------- |
| `Shapefile::ERR_UNDEFINED`                        | Undefined error |
| `Shapefile::ERR_FILE_MISSING`                     | A required file is missing |
| `Shapefile::ERR_FILE_EXISTS`                      | Check if the file exists and is readable and/or writable |
| `Shapefile::ERR_FILE_INVALID_RESOURCE`            | File pointer resource not valid |
| `Shapefile::ERR_FILE_OPEN`                        | Unable to open file |
| `Shapefile::ERR_FILE_READING`                     | Error during binary file reading |
| `Shapefile::ERR_FILE_WRITING`                     | Error during binary file writing |
| `Shapefile::ERR_SHP_TYPE_NOT_SUPPORTED`           | Shape type not supported |
| `Shapefile::ERR_SHP_TYPE_NOT_SET`                 | Shape type not set |
| `Shapefile::ERR_SHP_TYPE_ALREADY_SET`             | Shape type has already been set |
| `Shapefile::ERR_SHP_GEOMETRY_TYPE_NOT_COMPATIBLE` | Geometry type must be compatible with Shapefile shape type |
| `Shapefile::ERR_SHP_MISMATCHED_BBOX`              | Bounding box must have the same dimensions as the Shapefile (2D, 3D or 4D) |
| `Shapefile::ERR_SHP_FILE_ALREADY_INITIALIZED`     | Cannot change Shapefile definition after it has been initialized with data |
| `Shapefile::ERR_SHP_WRONG_RECORD_TYPE`            | Wrong record shape type |
| `Shapefile::ERR_DBF_FILE_NOT_VALID`               | DBF file doesn't seem to be a valid dBase III or dBase IV format |
| `Shapefile::ERR_DBF_MISMATCHED_FILE`              | Mismatched DBF file. Number of records not corresponding to the SHP file |
| `Shapefile::ERR_DBF_EOF_REACHED`                  | End of DBF file reached. Number of records not corresponding to the SHP file |
| `Shapefile::ERR_DBF_MAX_FIELD_COUNT_REACHED`      | Cannot add other fields, maximum number of fields in a DBF file reached |
| `Shapefile::ERR_DBF_FIELD_NAME_NOT_VALID`         | Too many field names conflicting |
| `Shapefile::ERR_DBF_FIELD_TYPE_NOT_VALID`         | Field type must be CHAR, DATE, LOGICAL, MEMO or NUMERIC |
| `Shapefile::ERR_DBF_FIELD_SIZE_NOT_VALID`         | Field size incorrect according to its type |
| `Shapefile::ERR_DBF_FIELD_DECIMALS_NOT_VALID`     | Field decimals incorrect according to its type |
| `Shapefile::ERR_DBF_CHARSET_CONVERSION`           | Error during conversion from provided DBF input charset to *UTF-8* |
| `Shapefile::ERR_DBT_EOF_REACHED`                  | End of DBT file reached. File might be corrupted |
| `Shapefile::ERR_GEOM_NOT_EMPTY`                   | Cannot reinitialize non-empty Geometry |
| `Shapefile::ERR_GEOM_COORD_VALUE_NOT_VALID`       | Invalid coordinate value |
| `Shapefile::ERR_GEOM_MISMATCHED_DIMENSIONS`       | All geometries in a collection must have the same dimensions (2D, 3D or 4D) |
| `Shapefile::ERR_GEOM_MISMATCHED_BBOX`             | Bounding box must have the same dimensions as the Geometry (2D, 3D or 4D) |
| `Shapefile::ERR_GEOM_MISSING_FIELD`               | Geometry is missing a field defined in the Shapefile |
| `Shapefile::ERR_GEOM_POINT_NOT_VALID`             | A Point can be either EMPTY or al least 2D |
| `Shapefile::ERR_GEOM_POLYGON_OPEN_RING`           | Polygons cannot contain open rings |
| `Shapefile::ERR_GEOM_POLYGON_WRONG_ORIENTATION`   | Polygon orientation not compliant with Shapefile specifications |
| `Shapefile::ERR_GEOM_RING_AREA_TOO_SMALL`         | Ring area too small. Cannot determine ring orientation |
| `Shapefile::ERR_INPUT_RANDOM_ACCESS_UNAVAILABLE`  | Shapefile has been loaded ignoring SHX file, only sequential read is possible |
| `Shapefile::ERR_INPUT_RECORD_NOT_FOUND`           | Record index not found (check the total number of records in the SHP file) |
| `Shapefile::ERR_INPUT_FIELD_NOT_FOUND`            | Field not found |
| `Shapefile::ERR_INPUT_GEOMETRY_TYPE_NOT_VALID`    | Geometry type not valid. Must be of specified type |
| `Shapefile::ERR_INPUT_GEOMETRY_INDEX_NOT_VALID`   | Geometry index not valid (check the total number of geometries in the collection) |
| `Shapefile::ERR_INPUT_ARRAY_NOT_VALID`            | Array not valid |
| `Shapefile::ERR_INPUT_WKT_NOT_VALID`              | WKT not valid |
| `Shapefile::ERR_INPUT_GEOJSON_NOT_VALID`          | GeoJSON not valid |
| `Shapefile::ERR_INPUT_NUMERIC_VALUE_OVERFLOW`     | Integer value overflows field size definition |

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [ShapefileException](#class-shapefileshapefileexception)::getDetails
```php?start_inline=1
public ShapefileException::getDetails( void ) : string
```

Gets additional details about the error. It might return an empty string if no details are available.




## Class Shapefile\Shapefile
This is the base Abstract Class for both `ShapefileReader` and `ShapefileWriter`. It cannot be directly instantiated, but exposes the following public methods for Classes than extend it:

- [isZ](#shapefileisz)
- [isM](#shapefileism)
- [getShapeType](#shapefilegetshapetype)
- [getBoundingBox](#shapefilegetboundingbox)
- [getPRJ](#shapefilegetprj)
- [getCharset](#shapefilegetcharset)
- [setCharset](#shapefilesetcharset)
- [getFieldsNames](#shapefilegetfieldsnames)
- [getField](#shapefilegetfield)
- [getFieldType](#shapefilegetfieldtype)
- [getFieldSize](#shapefilegetfieldsize)
- [getFieldDecimals](#shapefilegetfielddecimals)
- [getFields](#shapefilegetfields)
- [getTotRecords](#shapefilegettotrecords)

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [Shapefile](#class-shapefileshapefile)::isZ
```php?start_inline=1
public Shapefile::isZ( void ) : bool
```

Returns `true` if the Shapefile is of type *Z* or `false` if it isn't.



### [Shapefile](#class-shapefileshapefile)::isM
```php?start_inline=1
public Shapefile::isM( void ) : bool
```

Returns `true` if the Shapefile is of type *M* or `false` if it isn't. Please note that *Z* Shapefiles include *M* dimension too.



### [Shapefile](#class-shapefileshapefile)::getShapeType
```php?start_inline=1
public Shapefile::getShapeType( [ int $format ] ) : mixed
```

Gets the Shapefile type as either text or number. Possible output values are:

| Shape type                            | Value     | Description  |
| ------------------------------------- | --------- | ------------ |
| `Shapefile::SHAPE_TYPE_NULL`          |  0        | Null Shape   |
| `Shapefile::SHAPE_TYPE_POINT`         |  1        | Point        |
| `Shapefile::SHAPE_TYPE_POLYLINE`      |  3        | PolyLine     |
| `Shapefile::SHAPE_TYPE_POLYGON`       |  5        | Polygon      |
| `Shapefile::SHAPE_TYPE_MULTIPOINT`    |  8        | MultiPoint   |
| `Shapefile::SHAPE_TYPE_POINTZ`        | 11        | PointZ       |
| `Shapefile::SHAPE_TYPE_POLYLINEZ`     | 13        | PolyLineZ    |
| `Shapefile::SHAPE_TYPE_POLYGONZ`      | 15        | PolygonZ     |
| `Shapefile::SHAPE_TYPE_MULTIPOINTZ`   | 18        | MultiPointZ  |
| `Shapefile::SHAPE_TYPE_POINTM`        | 21        | PointM       |
| `Shapefile::SHAPE_TYPE_POLYLINEM`     | 23        | PolyLineM    |
| `Shapefile::SHAPE_TYPE_POLYGONM`      | 25        | PolygonM     |
| `Shapefile::SHAPE_TYPE_MULTIPOINTM`   | 28        | MultiPointM  |
    

#### `$format`
It specifies the return format and can be one of:
 `Shapefile::FORMAT_INT` : Integer (*Default*)
 `Shapefile::FORMAT_STR` : String



### [Shapefile](#class-shapefileshapefile)::getBoundingBox
```php?start_inline=1
public Shapefile::getBoundingBox( void ) : array
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
Eventual `Shapefile::OPTION_SUPPRESS_Z` and `Shapefile::OPTION_SUPPRESS_M` options set with [ShapefileReader constructor](#shapefilereader__construct) or [ShapefileWriter constructor](#shapefilewriter__construct) will effectively condition the output.



### [Shapefile](#class-shapefileshapefile)::getPRJ
```php?start_inline=1
public Shapefile::getPRJ( void ) : string
```

Returns the raw WKT string from the *.prj* file. If there's no *.prj* file then `null` is returned.



### [Shapefile](#class-shapefileshapefile)::getCharset
```php?start_inline=1
public Shapefile::getCharset( void ) : string
```

Returns the value read from the *.cpg* file, set with [setCharset](#shapefilereadersetcharset) method, or the default one: `'ISO-8859-1'`.
Note that `ShapefileReader` Class will use this information to convert data read from the files to *UTF-8* when option `Shapefile::OPTION_DBF_CONVERT_TO_UTF8` is enabled. See [Strings charset conversion](#strings-charset-conversion) for details.



### [Shapefile](#class-shapefileshapefile)::setCharset
```php?start_inline=1
public Shapefile::setCharset( mixed $charset ) : self
```

When called from a `ShapefileReader` instance it sets the charset used to convert strings to *UTF-8* when option `Shapefile::OPTION_DBF_CONVERT_TO_UTF8` is enabled. It will overwrite the one read from the *.cpg* file.
When called from a `ShapefileWriter` instance it sets the charset that will be written into the *.cpg* file. Note that **no conversion is carried out by the library when writing Shapefiles**, see [Strings charset conversion](#strings-charset-conversion) for details.
Returns self instance to provide a *fluent interface*.

#### `$charset`
A string containing the charset name or a falsy value (e.g.: `false` or empty string `""`) to reset it to default `'ISO-8859-1'`.



### [Shapefile](#class-shapefileshapefile)::getFieldsNames
```php?start_inline=1
public Shapefile::getFieldsNames( void ) : array
```

Returns an *Array* of all fields names found in the Shapefile.




### [Shapefile](#class-shapefileshapefile)::getField
```php?start_inline=1
public Shapefile::getField( string $name ) : array
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
The name of the field to return. If it does not exist, a `Shapefile::ERR_INPUT_FIELD_NOT_FOUND` ShapefileException will be thrown.



### [Shapefile](#class-shapefileshapefile)::getFieldType
```php?start_inline=1
public Shapefile::getFieldType( string $name ) : string
```

Returns a *String* representing the specified field type. It can be one of:
- `Shapefile::DBF_TYPE_CHAR` : String.
- `Shapefile::DBF_TYPE_DATE` : Date.
- `Shapefile::DBF_TYPE_LOGICAL` : Logical/Boolean.
- `Shapefile::DBF_TYPE_MEMO` : Memo (requires a *.dbt* file).
- `Shapefile::DBF_TYPE_NUMERIC` : Numeric.
- `Shapefile::DBF_TYPE_FLOAT` : Floating point numbers. *This is actually **not** part of dBaseIII PLUS specifications, but since there are many Shapefiles out there using it, it has been included in this library*.

#### `$name`
The name of the field to return. If it does not exist, a `Shapefile::ERR_INPUT_FIELD_NOT_FOUND` ShapefileException will be thrown.



### [Shapefile](#class-shapefileshapefile)::getFieldSize
```php?start_inline=1
public Shapefile::getFieldSize( string $name ) : int
```

Returns the lenght of the specified field. Note that all data is stored as a *String* into *.dbf* files.

#### `$name`
The name of the field to return. If it does not exist, a `Shapefile::ERR_INPUT_FIELD_NOT_FOUND` ShapefileException will be thrown.



### [Shapefile](#class-shapefileshapefile)::getFieldDecimals
```php?start_inline=1
public Shapefile::getFieldDecimals( string $name ) : int
```

Returns the lenght of the decimal part of the specified field. This makes sense only for fields of type `Shapefile::DBF_TYPE_NUMERIC`.

#### `$name`
The name of the field to return. If it does not exist, a `Shapefile::ERR_INPUT_FIELD_NOT_FOUND` ShapefileException will be thrown.



### [Shapefile](#class-shapefileshapefile)::getFields
```php?start_inline=1
public Shapefile::getFields( void ) : array
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



### [Shapefile](#class-shapefileshapefile)::getTotRecords
```php?start_inline=1
public Shapefile::getTotRecords( void ) : int
```

Returns the number of records present in the Shapefile.
Special value `Shapefile::UNKNOWN` will be returned when `Shapefile::OPTION_IGNORE_FILE_SHX` constructor option is to `true`.




## Class Shapefile\ShapefileReader
The Shapefile reading Class that exposes all the public methods of the [Shapefile](#class-shapefileshapefile) base Class, plus the following ones:

- [__construct](#shapefilereader__construct)
- [getCurrentRecord](#shapefilereadergetcurrentrecord)
- [setCurrentRecord](#shapefilereadersetcurrentrecord)
- [fetchRecord](#shapefilereaderfetchrecord)

This class also implements the [Iterator](https://php.net/manual/en/class.iterator.php) interface. See [Example 2](#example-2---read-a-shapefile-using-a-foreach-iterator) for details.

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [ShapefileReader](#class-shapefileshapefilereader)::__construct
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

| Option                                                    | Default value                             | Description |
| --------------------------------------------------------- | ----------------------------------------- | ----------- |
| `Shapefile::OPTION_DBF_ALLOW_FIELD_SIZE_255`              | `false`                                   | Allows a maximum field size of 255 bytes instead of 254 bytes in the *.dbf* file |
| `Shapefile::OPTION_DBF_CONVERT_TO_UTF8`                   | `true`                                    | Converts from input charset to *UTF-8* all strings read from the *.dbf* file |
| `Shapefile::OPTION_DBF_FORCE_ALL_CAPS`                    | `false`                                   | Forces all column names in upper case in the *.dbf* file |
| `Shapefile::OPTION_DBF_IGNORED_FIELDS`                    | `[]`                                      | Array containing the names of the fields to ignore from the *.dbf* file |
| `Shapefile::OPTION_DBF_NULL_PADDING_CHAR`                 | `null`                                    | Defines a null padding character used in the *.dbf* file to represent `null` values |
| `Shapefile::OPTION_DBF_NULLIFY_INVALID_DATES`             | `true`                                    | Returns a `null` value for invalid dates when reading *.dbf* files |
| `Shapefile::OPTION_DBF_RETURN_DATES_AS_OBJECTS`           | `false`                                   | Returns dates as `DateTime` objects instead of ISO strings (`YYYY-MM-DD`) |
| `Shapefile::OPTION_FORCE_MULTIPART_GEOMETRIES`            | `false`                                   | Reads Polyline and Polygon Geometries as Multi (ESRI specs do not distinguish between Linestring/MultiLinestring and Polygon/MultiPolygon) |
| `Shapefile::OPTION_IGNORE_FILE_DBF`                       | `false`                                   | Ignores *DBF* file (useful to recover corrupted Shapefiles). Data will not be available for geometries |
| `Shapefile::OPTION_IGNORE_FILE_SHX`                       | `false`                                   | Ignores *SHX* file (useful to recover corrupted Shapefiles). This might not always work and random access to specific records will not be possible |
| `Shapefile::OPTION_IGNORE_GEOMETRIES_BBOXES`              | `false`                                   | Ignores geometries bounding boxes read from shapefile and computes some real ones instead |
| `Shapefile::OPTION_IGNORE_SHAPEFILE_BBOX`                 | `false`                                   | Ignores bounding box read from shapefile and computes a real one instead |
| `Shapefile::OPTION_POLYGON_CLOSED_RINGS_ACTION`           | `Shapefile::ACTION_CHECK`                 | Defines action to perform on Polygons rings. They should be closed but some software don't enforce that, creating uncompliant Shapefiles. Possible values are `Shapefile::ACTION_IGNORE`, `Shapefile::ACTION_CHECK` and `Shapefile::ACTION_FORCE`. See Polygon [__construct](#polygon__construct) option `$closed_rings` for details |
| `Shapefile::OPTION_POLYGON_ORIENTATION_READING_AUTOSENSE` | `true`                                    | Allows Polygons orientation to be either clockwise or counterclockwise when reading Shapefiles (see [this note about Polygons orientation](#a-note-about-polygons-orientation)). Set it to `false` to raise a `Shapefile::ERR_GEOM_POLYGON_WRONG_ORIENTATION` ShapefileException in case of Shapefiles uncompliant with ESRI specs |
| `Shapefile::OPTION_POLYGON_OUTPUT_ORIENTATION`            | `Shapefile::ORIENTATION_COUNTERCLOCKWISE` | Forces a specific orientation for Polygons after reading them (see [this note about Polygons orientation](#a-note-about-polygons-orientation)). Possible values are `Shapefile::ORIENTATION_CLOCKWISE`, `Shapefile::ORIENTATION_COUNTERCLOCKWISE` and `Shapefile::ORIENTATION_UNCHANGED` |
| `Shapefile::OPTION_SUPPRESS_M`                            | `false`                                   | Ignores *M dimension* from Shapefile |
| `Shapefile::OPTION_SUPPRESS_Z`                            | `false`                                   | Ignores *Z dimension* from Shapefile |



### [ShapefileReader](#class-shapefileshapefilereader)::getCurrentRecord
```php?start_inline=1
public ShapefileReader::getCurrentRecord( void ) : int
```

Returns the index of the current record. Note that record count starts from `1` in Shapefiles. When the last record is reached, the special value `Shapefile::EOF` will be returned.



### [ShapefileReader](#class-shapefileshapefilereader)::setCurrentRecord
```php?start_inline=1
public ShapefileReader::setCurrentRecord( int $index ) : self
```

Sets the index of the current record. If an invalid index is provided, this method will throw a `ShapefileException`.
Calling this method will raise a `Shapefile::ERR_INPUT_RANDOM_ACCESS_UNAVAILABLE` ShapefileException when `Shapefile::OPTION_IGNORE_FILE_SHX` constructor option is set to `true`.
Returns self instance to provide a *fluent interface*.

#### `$index`
The index of the record. Note that record count starts from `1` in Shapefiles.



### [ShapefileReader](#class-shapefileshapefilereader)::fetchRecord
```php?start_inline=1
public Shapefile::fetchRecord( void ) : Geometry
```

Reads the current record returning a `Geometry` object and moves the cursor forward to the next one.
When the last record is reached, the cursor will be set to the special value `Shapefile::EOF` and this method will return *Boolean* value **`false`**.
If you prefer using the [Iterator](https://php.net/manual/en/class.iterator.php) interface, see [Example 2](#example-2---read-a-shapefile-using-a-foreach-iterator) for details.




## Class Shapefile\ShapefileWriter
The Shapefile writing Class that exposes all the public methods of the [Shapefile](#class-shapefileshapefile) base Class, plus the following ones:

- [__construct](#shapefilewriter__construct)
- [setShapeType](#shapefilewritersetshapetype)
- [setCustomBoundingBox](#shapefilewritersetcustomboundingbox)
- [resetCustomBoundingBox](#shapefilewriterresetcustomboundingbox)
- [setPRJ](#shapefilewritersetprj)
- [addCharField](#shapefilewriteraddcharfield)
- [addDateField](#shapefilewriteradddatefield)
- [addLogicalField](#shapefilewriteraddlogicalfield)
- [addMemoField](#shapefilewriteraddmemofield)
- [addNumericField](#shapefilewriteraddnumericfield)
- [addFloatField](#shapefilewriteraddfloatfield)
- [addField](#shapefilewriteraddfield)
- [writeRecord](#shapefilewriterwriterecord)
- [flushBuffer](#shapefilewriterflushbuffer)

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [ShapefileWriter](#class-shapefileshapefilewriter)::__construct
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
    Shapefile::OPTION_EXISTING_FILES_MODE       => Shapefile::MODE_OVERWRITE,
]);
```

Here are the supported options and their default values:

| Option                                                | Default value                 | Description |
| ----------------------------------------------------- | ----------------------------- | ----------- |
| `Shapefile::OPTION_BUFFERED_RECORDS`                  | `10`                          | Number of records to keep into memory buffer before writing them. Use a value equal or less than `0` to keep all records into a buffer and write them at once |
| `Shapefile::OPTION_CPG_ENABLE_FOR_DEFAULT_CHARSET`    | `false`                       | Writes a *.cpg* file (if there is one open) also when DBF data charset is the default one |
| `Shapefile::OPTION_DBF_ALLOW_FIELD_SIZE_255`          | `false`                       | Allows a maximum field size of 255 bytes instead of 254 bytes in the *.dbf* file |
| `Shapefile::OPTION_DBF_FORCE_ALL_CAPS`                | `false`                       | Forces all column names in upper case in the *.dbf* file |
| `Shapefile::OPTION_DBF_NULL_PADDING_CHAR`             | `null`                        | Defines a null padding character to use in the *.dbf* file to represent `null` values |
| `Shapefile::OPTION_DBF_NULLIFY_INVALID_DATES`         | `true`                        | Nullify invalid dates when writing *.dbf* files |
| `Shapefile::OPTION_DELETE_EMPTY_FILES`                | `true`                        | Deletes empty files after closing them (only if they weren't passed as resource handles) |
| `Shapefile::OPTION_ENFORCE_GEOMETRY_DATA_STRUCTURE`   | `true`                        | Enforces Geometries to have all data fields defined in Shapefile (otherwise `null` will be assumed) |
| `Shapefile::OPTION_EXISTING_FILES_MODE`               | `Shapefile::MODE_PRESERVE`    | Defines behaviour with existing files with the same name. Possible values are `Shapefile::MODE_PRESERVE` (a `Shapefile::ERR_FILE_EXISTS` ShapefileException will be thrown), `Shapefile::MODE_APPEND` (new records will be appended to existing files), `Shapefile::MODE_OVERWRITE` (existing files will be completely overwritten) |
| `Shapefile::OPTION_SUPPRESS_M`                        | `false`                       | Ignores *M dimension* in Geometries |
| `Shapefile::OPTION_SUPPRESS_Z`                        | `false`                       | Ignores *Z dimension* in Geometries |



### [ShapefileWriter](#class-shapefileshapefilewriter)::setShapeType
```php?start_inline=1
public ShapefileWriter::setShapeType( [ int $type ] ) : self
```

Sets the Shapefile type.
Returns self instance to provide a *fluent interface*.

#### `$type`
Shape type. It can be on of the following:

| Shape type                            | Value     | Description  |
| ------------------------------------- | --------- | ------------ |
| `Shapefile::SHAPE_TYPE_NULL`          |  0        | Null Shape   |
| `Shapefile::SHAPE_TYPE_POINT`         |  1        | Point        |
| `Shapefile::SHAPE_TYPE_POLYLINE`      |  3        | PolyLine     |
| `Shapefile::SHAPE_TYPE_POLYGON`       |  5        | Polygon      |
| `Shapefile::SHAPE_TYPE_MULTIPOINT`    |  8        | MultiPoint   |
| `Shapefile::SHAPE_TYPE_POINTZ`        | 11        | PointZ       |
| `Shapefile::SHAPE_TYPE_POLYLINEZ`     | 13        | PolyLineZ    |
| `Shapefile::SHAPE_TYPE_POLYGONZ`      | 15        | PolygonZ     |
| `Shapefile::SHAPE_TYPE_MULTIPOINTZ`   | 18        | MultiPointZ  |
| `Shapefile::SHAPE_TYPE_POINTM`        | 21        | PointM       |
| `Shapefile::SHAPE_TYPE_POLYLINEM`     | 23        | PolyLineM    |
| `Shapefile::SHAPE_TYPE_POLYGONM`      | 25        | PolygonM     |
| `Shapefile::SHAPE_TYPE_MULTIPOINTM`   | 28        | MultiPointM  |



### [ShapefileWriter](#class-shapefileshapefilewriter)::setCustomBoundingBox
```php?start_inline=1
public ShapefileWriter::setCustomBoundingBox( array $bounding_box ) : self
```

Sets a custom bounding box for the Shapefile, ignoring the one that is computed out of all the Geometries contained into it.
Returns self instance to provide a *fluent interface*.

#### `$bounding_box`
Associative array with the `xmin`, `xmax`, `ymin`, `ymax` and optional `zmin`, `zmax`, `mmin`, `mmax` values.



### [ShapefileWriter](#class-shapefileshapefilewriter)::resetCustomBoundingBox
```php?start_inline=1
public ShapefileWriter::resetCustomBoundingBox( void ) : self
```

Resets the custom bounding box for the Shapefile, meaning the normally computed one will be written into the file.
Returns self instance to provide a *fluent interface*.



### [ShapefileWriter](#class-shapefileshapefilewriter)::setPRJ
```php?start_inline=1
public ShapefileWriter::setPRJ( string $prj ) : self
```

Sets PRJ well-known-text that will be written into the *.prj* file.
Returns self instance to provide a *fluent interface*.

#### `$prj`
PRJ well-known-text. Pass a falsy value (e.g.: `false` or empty string `""`) to delete it.



### [ShapefileWriter](#class-shapefileshapefilewriter)::addCharField
```php?start_inline=1
public ShapefileWriter::addCharField( string $name [, int $size = 254 ] ) : string
```

Adds a char field (type `Shapefile::DBF_TYPE_CHAR`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. Invalid or duplicated names will be silently *sanitized*, meaning that they will be truncated at 10 characters, not allowed characters replaced with underscores and in case of resulting duplicated names or conflicts, a serial number from `_1` to `99` will be added.

#### `$size`
Lenght of the field, between 1 and 254 characters. Defaults to 254.



### [ShapefileWriter](#class-shapefileshapefilewriter)::addDateField
```php?start_inline=1
public ShapefileWriter::addDateField( string $name ) : string
```

Adds a date field (type `Shapefile::DBF_TYPE_DATE`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. Invalid or duplicated names will be silently *sanitized*, meaning that they will be truncated at 10 characters, not allowed characters replaced with underscores and in case of resulting duplicated names or conflicts, a serial number from `_1` to `99` will be added.



### [ShapefileWriter](#class-shapefileshapefilewriter)::addLogicalField
```php?start_inline=1
public ShapefileWriter::addLogicalField( string $name ) : string
```

Adds a logical field (type `Shapefile::DBF_TYPE_LOGICAL`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. Invalid or duplicated names will be silently *sanitized*, meaning that they will be truncated at 10 characters, not allowed characters replaced with underscores and in case of resulting duplicated names or conflicts, a serial number from `_1` to `99` will be added.



### [ShapefileWriter](#class-shapefileshapefilewriter)::addMemoField
```php?start_inline=1
public ShapefileWriter::addMemoField( string $name ) : string
```

Adds a memo field (type `Shapefile::DBF_TYPE_MEMO`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. Invalid or duplicated names will be silently *sanitized*, meaning that they will be truncated at 10 characters, not allowed characters replaced with underscores and in case of resulting duplicated names or conflicts, a serial number from `_1` to `99` will be added.



### [ShapefileWriter](#class-shapefileshapefilewriter)::addNumericField
```php?start_inline=1
public ShapefileWriter::addNumericField( string $name [, int $size = 10 [, int $decimals = 0 ]] ) : string
```

Adds a numeric field (type `Shapefile::DBF_TYPE_NUMERIC`) to the Shapefile definition. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. Invalid or duplicated names will be silently *sanitized*, meaning that they will be truncated at 10 characters, not allowed characters replaced with underscores and in case of resulting duplicated names or conflicts, a serial number from `_1` to `99` will be added.

#### `$size`
Lenght of the field, between 1 and 254 characters. Defaults to 10.

#### `$decimals`
Number of decimal digits. Defaults to 0, meaning an *integer* number. See [DBF data input/output](#dbf-data-inputoutput) section for details.



### [ShapefileWriter](#class-shapefileshapefilewriter)::addFloatField
```php?start_inline=1
public ShapefileWriter::addFloatField( string $name [, int $size = 20 [, int $decimals = 10 ]] ) : string
```

Adds a float field (type `Shapefile::DBF_TYPE_FLOAT`) to the Shapefile definition. It returns the effective field name after eventual sanitization.
Note that this field type is actually **not** part of dBaseIII PLUS original specifications.


#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. Invalid or duplicated names will be silently *sanitized*, meaning that they will be truncated at 10 characters, not allowed characters replaced with underscores and in case of resulting duplicated names or conflicts, a serial number from `_1` to `99` will be added.

#### `$size`
Lenght of the field, between 1 and 254 characters. Defaults to 20.

#### `$decimals`
Number of decimal digits. Defaults to 10. Number of decimal digits cannot be 0 for this field type. See [DBF data input/output](#dbf-data-inputoutput) section for details.



### [ShapefileWriter](#class-shapefileshapefilewriter)::addField
```php?start_inline=1
public ShapefileWriter::addField( string $name, string $type, int $size, int $decimals ) : string
```

Adds a field to the Shapefile definition. This is a kind of *low level* method that allows to add a field of any type. It returns the effective field name after eventual sanitization.

#### `$name`
Name of the field. Maximum 10 characters. Only letters, numbers and underscores are allowed. Invalid or duplicated names will be silently *sanitized*, meaning that they will be truncated at 10 characters, not allowed characters replaced with underscores and in case of resulting duplicated names or conflicts, a serial number from `_1` to `99` will be added.

#### `$type`
Type of the field. It can be one of:
- `Shapefile::DBF_TYPE_CHAR` : String.
- `Shapefile::DBF_TYPE_DATE` : Date.
- `Shapefile::DBF_TYPE_LOGICAL` : Logical/Boolean.
- `Shapefile::DBF_TYPE_MEMO` : Memo (requires a *.dbt* file).
- `Shapefile::DBF_TYPE_NUMERIC` : Numeric.
- `Shapefile::DBF_TYPE_FLOAT` : Floating point numbers. *This is actually **not** part of dBaseIII PLUS specifications, but since there are many Shapefiles out there using it, it has been included in this library*.


#### `$size`
Lenght of the field, between 1 and 254 characters.

#### `$decimals`
Number of decimal digits for numeric types.



### [ShapefileWriter](#class-shapefileshapefilewriter)::writeRecord
```php?start_inline=1
public ShapefileWriter::writeRecord( Geometry $Geometry ) : self
```

Writes a record to the Shapefile (actually, to all open files: *SHP*, *SHX*, *DBF* and optional *DBT*).
Returns self instance to provide a *fluent interface*.

#### `$Geometry`
A `Geometry` object to be written into the Shapefile. It has to be compatible with the Shapefile shape type. If no shape type has been set, a `Shapefile::ERR_SHP_TYPE_NOT_SET` ShapefileException will be thrown.
Depending on the state of `Shapefile::OPTION_ENFORCE_GEOMETRY_DATA_STRUCTURE` option, either `null` values will be used for missing data fields or a `Shapefile::ERR_GEOM_MISSING_FIELD` ShapefileException will be thrown.



### [ShapefileWriter](#class-shapefileshapefilewriter)::flushBuffer
```php?start_inline=1
public ShapefileWriter::flushBuffer( void ) : self
```

Writes memory buffers to files. This will effectively reset the record counter that causes automatic buffer flushing according to the value specified with `Shapefile::OPTION_BUFFERED_RECORDS` constructor option.
Returns self instance to provide a *fluent interface*.






## Class Shapefile\Geometry\Geometry
This is the base Abstract Class for all the other Geometries. It cannot be directly instantiated, but exposes the following public methods for Classes than extend it:

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

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [Geometry](#class-shapefilegeometrygeometry)::initFromArray
```php?start_inline=1
public Geometry::initFromArray( array $array ) : self
```

Initializes the Geometry using a structured *Array*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.
Returns self instance to provide a *fluent interface*.

#### `$array`
The structured *Array* to initialize the Geometry with.



### [Geometry](#class-shapefilegeometrygeometry)::initFromWKT
```php?start_inline=1
public Geometry::initFromWKT( string $wkt ) : self
```

Initializes the Geometry using a WKT *String*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.
Returns self instance to provide a *fluent interface*.

#### `$wkt`
The WKT *String* to initialize the Geometry with.



### [Geometry](#class-shapefilegeometrygeometry)::initFromGeoJSON
```php?start_inline=1
public Geometry::initFromGeoJSON( string $geojson ) : self
```

Initializes the Geometry using a GeoJSON *String*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.
Returns self instance to provide a *fluent interface*.

#### `$geojson`
The GeoJSON *String* to initialize the Geometry with.



### [Geometry](#class-shapefilegeometrygeometry)::getArray
```php?start_inline=1
public Geometry::getArray( void ) : array
```

Converts the Geometry into a structured *Array*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.



### [Geometry](#class-shapefilegeometrygeometry)::getWKT
```php?start_inline=1
public Geometry::getWKT( void ) : string
```

Converts the Geometry into a WKT *String*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.



### [Geometry](#class-shapefilegeometrygeometry)::getGeoJSON
```php?start_inline=1
public Geometry::getGeoJSON( [, bool $flag_bbox = true  [, bool $flag_feature = false ]] ) : string
```

Converts the Geometry into a GeoJSON *String*. See [Geometry input/output formats](#geometry-inputoutput-formats) for details.

#### `$flag_bbox`
Boolean flag to include a `"bbox"` member into the GeoJSON output. It defaults to `true` for all the Geometries but Points, where it defaults to `false`.

#### `$flag_feature`
Boolean flag to output a complete `"Feature"` object with all the data instead of a simple "`Geometry"` one.



### [Geometry](#class-shapefilegeometrygeometry)::getBoundingBox
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



### [Geometry](#class-shapefilegeometrygeometry)::setCustomBoundingBox
```php?start_inline=1
public Geometry::setCustomBoundingBox( array $bounding_box ) : self
```

Sets a custom bounding box for the Geometry, overriding the computed one. No formal check is carried out except the compliance of dimensions.
Returns self instance to provide a *fluent interface*.

#### `$bounding_box`
The bounding box array with `"xmin"`, `"xmax"`, `"ymin"`, `"ymax"`, and optional `"zmin"`, `"zmax"`, `"mmin"` and `"mmax"` members.



### [Geometry](#class-shapefilegeometrygeometry)::resetCustomBoundingBox
```php?start_inline=1
public Geometry::resetCustomBoundingBox( void ) : self
```

Resets a previously set custom bounding box for the Geometry, causing [getBoundingBox](#geometrygetboundingbox) method to return a normally computed one.
Returns self instance to provide a *fluent interface*.



### [Geometry](#class-shapefilegeometrygeometry)::isEmpty
```php?start_inline=1
public Geometry::isEmpty( void ) : bool
```

Returns `true` if the Geometry is *empty* or `false` if it isn't.



### [Geometry](#class-shapefilegeometrygeometry)::isZ
```php?start_inline=1
public Geometry::isZ( void ) : bool
```

Returns `true` if the Geometry has the *Z dimension* or `false` if it doesn't.



### [Geometry](#class-shapefilegeometrygeometry)::isM
```php?start_inline=1
public Geometry::isM( void ) : bool
```

Returns `true` if the Geometry has the *M dimension* or `false` if it doesn't.



### [Geometry](#class-shapefilegeometrygeometry)::isDeleted
```php?start_inline=1
public Geometry::isDeleted( void ) : bool
```

Returns `true` if the record is marked as *deleted* in the *.dbf* file `false` if it isn't.



### [Geometry](#class-shapefilegeometrygeometry)::setFlagDeleted
```php?start_inline=1
public Geometry::isDeleted( bool $value ) : self
```

Marks or unmarks the Geometry as *deleted* in the *.dbf* file. This makes sense only when writing Shapefiles.
Returns self instance to provide a *fluent interface*.

#### `$value`
*Boolean* value of the *deleted* flag.



### [Geometry](#class-shapefilegeometrygeometry)::getData
```php?start_inline=1
public Geometry::getData( string $fieldname ) : mixed
```

Gets data value for the speficied field. Refer to the [DBF data input/output](#dbf-data-inputoutput) section for details.

#### `$fieldname`
The field name to get the data for.



### [Geometry](#class-shapefilegeometrygeometry)::setData
```php?start_inline=1
public Geometry::setData( string $fieldname, mixed $value) : self
```

Sets data value for the speficied field name. Refer to the [DBF data input/output](#dbf-data-inputoutput) section for details.
Returns self instance to provide a *fluent interface*.

#### `$fieldname`
The field name to set the data for.

#### `$value`
The value to assign to the specified field in the Geometry.



### [Geometry](#class-shapefilegeometrygeometry)::getDataArray
```php?start_inline=1
public Geometry::getDataArray( void ) : array
```

Gets all the data of the Geometry as an associative *Array*. Refer to the [DBF data input/output](#dbf-data-inputoutput) section for details.


### [Geometry](#class-shapefilegeometrygeometry)::setDataArray
```php?start_inline=1
public Geometry::setDataArray( array $data ) : self
```

Sets all the data of the Geometry using an associative *Array*. Refer to the [DBF data input/output](#dbf-data-inputoutput) section for details.
Returns self instance to provide a *fluent interface*.

#### `$data`
Associative *Array* containing the data to assign to the different fields in the Geometry.




## Class Shapefile\Geometry\Point
Point Geometry Class. It exposes all the public methods of the [Geometry](#class-shapefilegeometrygeometry) base Class, plus the following ones:

- [__construct](#point__construct)
- [getX](#pointgetx)
- [getY](#pointgety)
- [getZ](#pointgetz)
- [getM](#pointgetm)

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [Point](#class-shapefilegeometrypoint)::__construct
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



### [Point](#class-shapefilegeometrypoint)::getX
```php?start_inline=1
public Point::getX( void ) : float
```

Returns the value of the X coordinate.



### [Point](#class-shapefilegeometrypoint)::getY
```php?start_inline=1
public Point::getY( void ) : float
```

Returns the value of the Y coordinate.



### [Point](#class-shapefilegeometrypoint)::getZ
```php?start_inline=1
public Point::getZ( void ) : float
```

Returns the value of the Z coordinate.



### [Point](#class-shapefilegeometrypoint)::getM
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

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [MultiPoint](#class-shapefilegeometrymultipoint)::__construct
```php?start_inline=1
public MultiPoint::__construct( [ Points[] $points ] )
```

You can create an *empty* MultiPoint without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Point](#class-shapefilegeometrypoint) Geometries.

#### `$points`
Array of [Point](#class-shapefilegeometrypoint) Geometries.



### [MultiPoint](#class-shapefilegeometrymultipoint)::addPoint
```php?start_inline=1
public MultiPoint::addPoint( Point $Point ) : self
```

Adds a Point to the Collection.
Returns self instance to provide a *fluent interface*.

#### `$Point`
[Point](#class-shapefilegeometrypoint) Geometry to add.



### [MultiPoint](#class-shapefilegeometrymultipoint)::getPoint
```php?start_inline=1
public MultiPoint::getPoint( int $index ) : Point
```

Gets a Point from the Collection at the specified index.

#### `$index`
Index of the [Point](#class-shapefilegeometrypoint) Geometry to retrieve.



### [MultiPoint](#class-shapefilegeometrymultipoint)::getPoints
```php?start_inline=1
public MultiPoint::getPoints( void ) : Point[]
```

Gets all the Points from the Collection as an array of [Point](#class-shapefilegeometrypoint) Geometries.



### [MultiPoint](#class-shapefilegeometrymultipoint)::getNumPoints
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
- [isClockwise](#linestringisclockwise)
- [isClosedRing](#linestringisclosedring)
- [forceClockwise](#linestringforceclockwise)
- [forceCounterClockwise](#linestringforcecounterclockwise)
- [forceClosedRing](#linestringforceclosedring)

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [Linestring](#class-shapefilegeometrylinestring)::__construct
```php?start_inline=1
public Linestring::__construct( [ Points[] $points ] )
```

You can create an *empty* Linestring without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Point](#class-shapefilegeometrypoint) Geometries.

#### `$points`
Array of [Point](#class-shapefilegeometrypoint) Geometries.



### [Linestring](#class-shapefilegeometrylinestring)::addPoint
```php?start_inline=1
public Linestring::addPoint( Point $Point ) : self
```

Adds a Point to the Collection.
Returns self instance to provide a *fluent interface*.

#### `$Point`
[Point](#class-shapefilegeometrypoint) Geometry to add.



### [Linestring](#class-shapefilegeometrylinestring)::getPoint
```php?start_inline=1
public Linestring::getPoint( int $index ) : Point
```

Gets a Point from the Collection at the specified index.

#### `$index`
Index of the [Point](#class-shapefilegeometrypoint) Geometry to retrieve.



### [Linestring](#class-shapefilegeometrylinestring)::getPoints
```php?start_inline=1
public Linestring::getPoints( void ) : Point[]
```

Gets all the Points from the Collection as an array of [Point](#class-shapefilegeometrypoint) Geometries.



### [Linestring](#class-shapefilegeometrylinestring)::getNumPoints
```php?start_inline=1
public Linestring::getNumPoints( void ) : int
```

Gets the number of Points in the Collection.



### [Linestring](#class-shapefilegeometrylinestring)::isClockwise
```php?start_inline=1
public Linestring::isClockwise( [$flag_throw_exception = false ] ) : bool|Shapefile::UNDEFINED
```

Checks whether a ring is clockwise or not (it works with open rings too).
Returns boolean `true` or `false` or special value `Shapefile::UNDEFINED` in case Geometry is empty, so be sure to use the identity operator `===` to check return value.

#### `$flag_throw_exception`
Boolean flag to throw a `Shapefile::ERR_GEOM_RING_NOT_ENOUGH_VERTICES` ShapefileException if there are not enough points to determine ring direction. This method returns `Shapefile::UNDEFINED` in case this flag is set to `false` and there are not enough vertices in the Linestring.



### [Linestring](#class-shapefilegeometrylinestring)::isClosedRing
```php?start_inline=1
public Linestring::isClosedRing( void ) : bool
```

Checks whether the Linestring is a *closed ring* or not. A closed ring has at least 4 vertices and the first and last ones must be the same.



### [Linestring](#class-shapefilegeometrylinestring)::forceClockwise
```php?start_inline=1
public Linestring::forceClockwise( void ) : self
```

Forces the Linestring (or ring) to be in clockwise direction (it works with open rings too).
It throws a `Shapefile::ERR_GEOM_RING_NOT_ENOUGH_VERTICES` ShapefileException if there are not enough points to determine current direction.
Returns self instance to provide a *fluent interface*.



### [Linestring](#class-shapefilegeometrylinestring)::forceCounterClockwise
```php?start_inline=1
public Linestring::forceCounterClockwise( void ) : self
```

Forces the Linestring (or ring) to be in counterclockwise direction (it works with open rings too).
It throws a `Shapefile::ERR_GEOM_RING_NOT_ENOUGH_VERTICES` ShapefileException if there are not enough points to determine current direction.
Returns self instance to provide a *fluent interface*.



### [Linestring](#class-shapefilegeometrylinestring)::forceClosedRing
```php?start_inline=1
public Linestring::forceClosedRing( void ) : self
```

Forces Linestring to be a closed ring, adding a point identical to the first one in case it is missing.
Returns self instance to provide a *fluent interface*.




## Class Shapefile\Geometry\MultiLinestring
MultiLinestring Geometry Class. It exposes all the public methods of the [Geometry](#class-shapefilegeometrygeometry) base Class, plus the following ones:

- [__construct](#multilinestring__construct)
- [addLinestring](#multilinestringaddlinestring)
- [getLinestring](#multilinestringgetlinestring)
- [getLinestrings](#multilinestringgetlinestrings)
- [getNumLinestrings](#multilinestringgetnumlinestrings)

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [MultiLinestring](#class-shapefilegeometrymultilinestring)::__construct
```php?start_inline=1
public MultiLinestring::__construct( [ Linestring[] $linestrings ] )
```

You can create an *empty* MultiLinestring without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.

#### `$linestrings`
Array of [Linestring](#class-shapefilegeometrylinestring) Geometries.



### [MultiLinestring](#class-shapefilegeometrymultilinestring)::addLinestring
```php?start_inline=1
public MultiLinestring::addLinestring( Linestring $Linestring ) : self
```

Adds a Linestring to the Collection.
Returns self instance to provide a *fluent interface*.

#### `$Linestring`
[Linestring](#class-shapefilegeometrylinestring) Geometry to add.



### [MultiLinestring](#class-shapefilegeometrymultilinestring)::getLinestring
```php?start_inline=1
public MultiLinestring::getLinestring( int $index ) : Linestring
```

Gets a Linestring from the Collection at the specified index.

#### `$index`
Index of the [Linestring](#class-shapefilegeometrylinestring) Geometry to retrieve.



### [MultiLinestring](#class-shapefilegeometrymultilinestring)::getLinestrings
```php?start_inline=1
public MultiLinestring::getLinestrings( void ) : Linestring[]
```

Gets all the Linestrings from the Collection as an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.



### [MultiLinestring](#class-shapefilegeometrymultilinestring)::getNumLinestrings
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
- [isClockwise](#polygonisclockwise)
- [isCounterClockwise](#polygoniscounterclockwise)
- [forceClockwise](#polygonforceclockwise)
- [forceCounterClockwise](#polygonforcecounterclockwise)
- [forceClosedRings](#polygonforceclosedrings)

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [Polygon](#class-shapefilegeometrypolygon)::__construct
```php?start_inline=1
public Polygon::__construct( [ Linestring[] $linestrings [, int $closed_rings = Shapefile::ACTION_CHECK [, int $force_orientation = Shapefile::ORIENTATION_COUNTERCLOCKWISE]]] )
```

You can create an *empty* Polygon without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.

#### `$linestrings`
Array of [Linestring](#class-shapefilegeometrylinestring) Geometries.

#### `$closed_rings`
Optional action to perform on polygon rings. Possible values:
- `Shapefile::ACTION_IGNORE` : No action taken.
- `Shapefile::ACTION_CHECK` : Checks for open rings and eventually throws a `Shapefile::ERR_GEOM_POLYGON_OPEN_RING` ShapefileException.
- `Shapefile::ACTION_FORCE` : Forces all rings to be closed.

#### `$force_orientation`
Optional orientation to force for polygon rings. Possible values:
- `Shapefile::ORIENTATION_CLOCKWISE` : Forces clockwise outer ring and counterclockwise inner rings.
- `Shapefile::ORIENTATION_COUNTERCLOCKWISE` : Forces counterclockwise outer ring and clockwise inner rings.
- `Shapefile::ORIENTATION_UNCHANGED` : Preserves original orientation.



### [Polygon](#class-shapefilegeometrypolygon)::addRing
```php?start_inline=1
public Polygon::addRing( Linestring $Linestring ) : self
```

Adds a Linestring to the Collection. Keep in mind that the **first one** will be recognized as the Polygon **outer ring** and no formal checks will be made.
Returns self instance to provide a *fluent interface*.

#### `$Linestring`
[Linestring](#class-shapefilegeometrylinestring) Geometry to add.



### [Polygon](#class-shapefilegeometrypolygon)::getRing
```php?start_inline=1
public Polygon::getRing( int $index ) : Linestring
```

Gets a Linestring from the Collection at the specified index.

#### `$index`
Index of the [Linestring](#class-shapefilegeometrylinestring) Geometry to retrieve.



### [Polygon](#class-shapefilegeometrypolygon)::getRings
```php?start_inline=1
public Polygon::getRings( void ) : Linestring[]
```

Gets all the Linestrings from the Collection as an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.



### [Polygon](#class-shapefilegeometrypolygon)::getNumRings
```php?start_inline=1
public Polygon::getNumRings( void ) : int
```

Gets the number of Linestrings in the Collection.



### [Polygon](#class-shapefilegeometrypolygon)::getOuterRing
```php?start_inline=1
public Polygon::getOuterRing( void ) : Linestring
```

Gets the Polygon outer ring (that is, the ring at index `0`);



### [Polygon](#class-shapefilegeometrypolygon)::getInnerRings
```php?start_inline=1
public Polygon::getInnerRings( void ) : Linestring[]
```

Gets Polygon inners rings as an array of [Linestring](#class-shapefilegeometrylinestring) Geometries.



### [Polygon](#class-shapefilegeometrypolygon)::isClockwise
```php?start_inline=1
public Polygon::isClockwise( void ) : bool|Shapefile::UNDEFINED
```

Checks whether Polygon outer ring has a clockwise orientation and all its inner rings have a counterclockwise one.
Note that a `false` return value does not guarantee Polygon is strictly counterclockwise. Use [Polygon::forceCounterClockwise](#polygonforcecounterclockwise) to enforce that!
Returns boolean `true` or `false` or special value `Shapefile::UNDEFINED` in case Geometry is empty, so be sure to use the identity operator `===` to check return value.



### [Polygon](#class-shapefilegeometrypolygon)::isCounterClockwise
```php?start_inline=1
public Polygon::isCounterClockwise( void ) : bool|Shapefile::UNDEFINED
```

Checks whether Polygon outer ring has a counterclockwise orientation and all its inner rings have a clockwise one.
Note that a `false` return value does not guarantee Polygon is strictly clockwise. Use [Polygon::forceClockwise](#polygonforceclockwise) to enforce that!
Returns boolean `true` or `false` or special value `Shapefile::UNDEFINED` in case Geometry is empty, so be sure to use the identity operator `===` to check return value.



### [Polygon](#class-shapefilegeometrypolygon)::forceClockwise
```php?start_inline=1
public Polygon::forceClockwise( void ) : self
```

Forces Polygon outer ring to have a clockwise orientation and all its inner rings to have a counterclockwise one.
It throws a `Shapefile::ERR_GEOM_RING_NOT_ENOUGH_VERTICES` ShapefileException if there are not enough points in a ring to determine its direction.
Returns self instance to provide a *fluent interface*.



### [Polygon](#class-shapefilegeometrypolygon)::forceCounterClockwise
```php?start_inline=1
public Polygon::forceCounterClockwise( void ) : self
```

Forces Polygon outer ring to have a counterclockwise orientation and all its inner rings to have a clockwise one.
It throws a `Shapefile::ERR_GEOM_RING_NOT_ENOUGH_VERTICES` ShapefileException if there are not enough points in a ring to determine its direction.
Returns self instance to provide a *fluent interface*.



### [Polygon](#class-shapefilegeometrypolygon)::forceClosedRings
```php?start_inline=1
public Polygon::forceClosedRings( void ) : self
```

Forces all Polygon rings to be closed.
Returns self instance to provide a *fluent interface*.




## Class Shapefile\Geometry\MultiPolygon
MultiPolygon Geometry Class. It exposes all the public methods of the [Geometry](#class-shapefilegeometrygeometry) base Class, plus the following ones:

- [__construct](#multipolygon__construct)
- [addPolygon](#multipolygonaddpolygon)
- [getPolygon](#multipolygongetpolygon)
- [getPolygons](#multipolygongetpolygons)
- [getNumPolygons](#multipolygongetnumpolygons)
- [isClockwise](#multipolygonisclockwise)
- [isCounterClockwise](#multipolygoniscounterclockwise)
- [forceClockwise](#multipolygonforceclockwise)
- [forceCounterClockwise](#multipolygonforcecounterclockwise)
- [forceClosedRings](#multipolygonforceclosedrings)

#### [▲ Back to Namespaces and Classes](#namespaces-and-classes)


### [MultiPolygon](#class-shapefilegeometrymultipolygon)::__construct
```php?start_inline=1
public MultiPolygon::__construct( [ Polygon[] $polygons [, int $closed_rings = Shapefile::ACTION_CHECK [, int $force_orientation = Shapefile::ORIENTATION_COUNTERCLOCKWISE]]] )
```

You can create an *empty* MultiPolygon without passing any argument to its constructor and using one of [initFromArray](#geometryinitfromarray), [initFromWKT](#geometryinitfromwkt) and [initFromGeoJSON](#geometryinitfromgeojson) methods later on, or directly defining it providing an array of [Polygon](#class-shapefilegeometrypolygon) Geometries.

#### `$polygons`
Array of [Polygon](#class-shapefilegeometrypolygon) Geometries.

#### `$closed_rings`
Optional action to perform on polygons rings. Possible values:
- `Shapefile::ACTION_IGNORE` : No action taken.
- `Shapefile::ACTION_CHECK` : Checks for open rings and eventually throws a `Shapefile::ERR_GEOM_POLYGON_OPEN_RING` ShapefileException.
- `Shapefile::ACTION_FORCE` : Forces all rings to be closed.

#### `$force_orientation`
Optional orientation to force for polygons rings. Possible values:
- `Shapefile::ORIENTATION_CLOCKWISE` : Forces clockwise outer rings and counterclockwise inner rings.
- `Shapefile::ORIENTATION_COUNTERCLOCKWISE` : Forces counterclockwise outer rings and clockwise inner rings.
- `Shapefile::ORIENTATION_UNCHANGED` : Preserves original orientation.



### [MultiPolygon](#class-shapefilegeometrymultipolygon)::addPolygon
```php?start_inline=1
public MultiPolygon::addPolygon( Polygon $Polygon ) : self
```

Adds a Polygon to the Collection.
Returns self instance to provide a *fluent interface*..

#### `$Polygon`
[Polygon](#class-shapefilegeometrypolygon) Geometry to add.



### [MultiPolygon](#class-shapefilegeometrymultipolygon)::getPolygon
```php?start_inline=1
public MultiPolygon::getPolygon( int $index ) : Polygon
```

Gets a Polygon from the Collection at the specified index.

#### `$index`
Index of the [Polygon](#class-shapefilegeometrypolygon) Geometry to retrieve.



### [MultiPolygon](#class-shapefilegeometrymultipolygon)::getPolygons
```php?start_inline=1
public MultiPolygon::getPolygons( void ) : Polygon[]
```

Gets all the Polygons from the Collection as an array of [Polygon](#class-shapefilegeometrypolygon) Geometries.



### [MultiPolygon](#class-shapefilegeometrymultipolygon)::getNumPolygons
```php?start_inline=1
public MultiPolygon::getNumPolygons( void ) : int
```

Gets the number of Polygons in the Collection.



### [MultiPolygon](#class-shapefilegeometrymultipolygon)::isClockwise
```php?start_inline=1
public Polygon::isClockwise( void ) : bool|Shapefile::UNDEFINED
```

Checks whether all MultiPolygon outer rings have a clockwise orientation and all its inner rings have a counterclockwise one.
Note that a `false` return value does not guarantee MultiPolygon is strictly counterclockwise. Use [MultiPolygon::forceCounterClockwise](#multipolygonforcecounterclockwise) to enforce that!
Returns boolean `true` or `false` or special value `Shapefile::UNDEFINED` in case Geometry is empty, so be sure to use the identity operator `===` to check return value.



### [MultiPolygon](#class-shapefilegeometrymultipolygon)::isCounterClockwise
```php?start_inline=1
public Polygon::isCounterClockwise( void ) : bool|Shapefile::UNDEFINED
```

Checks whether all MultiPolygon outer rings have a counterclockwise orientation and all its inner rings have a clockwise one.
Note that a `false` return value does not guarantee MultiPolygon is strictly clockwise. Use [MultiPolygon::forceClockwise](#multipolygonforceclockwise) to enforce that!
Returns boolean `true` or `false` or special value `Shapefile::UNDEFINED` in case Geometry is empty, so be sure to use the identity operator `===` to check return value.



### [MultiPolygon](#class-shapefilegeometrymultipolygon)::forceClockwise
```php?start_inline=1
public MultiPolygon::forceClockwise( void ) : self
```

Forces all MultiPolygon outer rings to have a clockwise orientation and all its inner rings to have a counterclockwise one.
It throws a `Shapefile::ERR_GEOM_RING_NOT_ENOUGH_VERTICES` ShapefileException if there are not enough points in a ring to determine its direction.
Returns self instance to provide a *fluent interface*.



### [MultiPolygon](#class-shapefilegeometrymultipolygon)::forceCounterClockwise
```php?start_inline=1
public MultiPolygon::forceCounterClockwise( void ) : self
```

Forces all MultiPolygon outer rings to have a counterclockwise orientation and all its inner rings to have a clockwise one.
It throws a `Shapefile::ERR_GEOM_RING_NOT_ENOUGH_VERTICES` ShapefileException if there are not enough points in a ring to determine its direction.
Returns self instance to provide a *fluent interface*.



### [MultiPolygon](#class-shapefilegeometrymultipolygon)::forceClosedRings
```php?start_inline=1
public MultiPolygon::forceClosedRings( void ) : self
```

Forces all MultiPolygon rings to be closed.
Returns self instance to provide a *fluent interface*.





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
    Shapefile::FILE_SHP => fopen('/path/to/file.shp', 'c+b'),
    Shapefile::FILE_SHX => fopen('/path/to/file.shx', 'c+b'),
    Shapefile::FILE_DBF => fopen('/path/to/file.dbf', 'c+b'),
]);
```
Keep in mind that in order for `Shapefile::MODE_APPEND` to work as expected when passing resource handles to `ShapefileWriter` constructor, resource handles access mode must be for **binary reading and writing**. The library internally uses `c+b`, but as any of `r+b`, `wb`, `w+b`, `xb`, `x+b`, `cb` and `c+b` will work just fine.

Supported file types are: 
- `Shapefile::FILE_SHP` : Required. Geometries file.
- `Shapefile::FILE_SHX` : Required. Index file.
- `Shapefile::FILE_DBF` : Required. Attributes file.
- `Shapefile::FILE_DBT` : Optional. Extended *Memo* attributes file.
- `Shapefile::FILE_PRJ` : Optional. WKT projection file.
- `Shapefile::FILE_CPG` : Optional. *DBF* charset file. 


### Closing files / Releasing the handles
This library adopts a *PDO-like* behaviour when it comes to closing open files and releasing their handles: they are closed upon object destruction. This means that if you want to close open files, simply set the ShapefileReader or ShapefileWriter instance to `null`:
```php?start_inline=1
$Shapefile = null;
```

It is extremely important to keep this in mind when writing Shapefiles: **files will be finalized just before closing them**! This means that if you want to do something with those newly created Shapefiles, you will have to close them destroying the ShapefileWriter instance before.
To answer the question "why not a *close()* method?" For the same reason as there is none in PDO: a ShapefileReader or ShapefileWriter instance with closed files would make no sense at all.





## A note about Polygons orientation
ESRI Shapefile specifications establish clockwise orientation for Polygons outer rings and counterclockwise orientation for inner ones.
GeoJSON on the other hand dictates the opposite, as well as Simple Features used to do (this has been dropped eventually, allowing either orientation for Polygons). There is a lot of confusion about this subject and to make things worse the expression *right-hand rule* is used for both scenarios.
It is worth noting that many Simple Features implementations (such as PostGIS) will not reject Polygons not complying with the specification, nor should proper GeoJSON parsers (see the note in [section 3.1.6](https://tools.ietf.org/html/rfc7946#section-3.1.6)).

This library gives the greatest flexibility to the programmer when **reading** Shapefiles through [ShapefileReader](#shapefilereader__construct) `Shapefile::OPTION_POLYGON_ORIENTATION_READING_AUTOSENSE` and `Shapefile::OPTION_POLYGON_OUTPUT_ORIENTATION` constructor options. By default they are set respectively to `true` and `Shapefile::ORIENTATION_COUNTERCLOCKWISE`, meaning the library will be able to read a Shapefile even when it is not compliant with ESRI specs and output Polygons/MultiPolygons will be forced to have a counterclockwise orientation (that is, opposite of ESRI specs). This should ensure the widest interoperability *out-of-the-box*, but changing the value of those options will allow for every desired behaviour.

When **writing** a Shapefile things are easier, since the library will take care of everything and **always** produce a file compliant with ESRI specifications: it analyzes and eventually corrects Polygons/MultiPolygons, forcing closed rings, clockwise-oriented outer rings and counterclockwise inner rings.





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
        "type": "LineString" / "LineStringM",
        "bbox": [xmin, ymin, zmin, mmin, xmax, ymax, zmax, mmax],
        "coordinates": [
            [x, y, z, m]
        ]
    }
    
- GeoJSON Feature:
    {
        "type": "Feature",
        "geometry": {
            "type": "LineString" / "LineStringM",
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
        "type": "MultiLineString" / "MultiLineStringM"
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
            "type": "MultiLineString" / "MultiLineStringM",
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
When **writing** a Shapefile, the library will take care of formal compliance to field *size* and *decimals* values, truncating eventual exceeding decimal parts, e.g.: the value `123.123456` in a field of *size* 10 with 5 *decimals* will be formatted as `123.1234`. If the lenght of the formatted value exceeds field *size*, a `Shapefile::ERR_INPUT_NUMERIC_VALUE_OVERFLOW` ShapefileException will be thrown (e.g.: trying to store the value `123456.99` in a field of of *size* 10 with 5 *decimals* would produce `123456.9900` and raise the exception).

### Dates are returned as text in ISO format or as `DateTime` objects
Depending on the state of `Shapefile::OPTION_DBF_NULLIFY_INVALID_DATES` and `Shapefile::OPTION_DBF_RETURN_DATES_AS_OBJECTS` options, ShapefileReader Class will try to validate dates and return them as text in ISO ***YYYY-MM-DD*** format, as a [DateTime](#https://www.php.net/manual/en/class.datetime.php) object or as `null` in case of an invalid date when `Shapefile::OPTION_DBF_NULLIFY_INVALID_DATES` is enabled.

### Logical values are converted to the right type
Logical values are parsed, converted and returned as `boolean`. Beware that `null` values are allowed for `Shapefile::DBF_TYPE_LOGICAL` fields (internally stored as `"?"`), thus possible return values are `true`, `false` and `null`.
When **reading** a Shapefile, characters `"T"`, `"t"`, `"Y"`, `"y"` and `"1"` are recognized as `true`, while `"F"`, `"f"`, `"N"`, `"n"` and `"0"` are recognized as `false`. Anything else will be considered as `null`.
When **writing** a Shapefile, the above values are accepted as well as `true`, `false`, `null` and other data types: numbers are loosely casted to *bool* before conversion, truthy and falsy string values are stricly checked against allowed ones using the first non-trimmable char *(e.g.: string `"No way"` becomes `"N"` hence `false`)* and anything else is considered as `null` (or, in *DBF* terms, *not initialized*).

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
    echo "Error Type: " . $e->getErrorType()
        . "\nMessage: " . $e->getMessage()
        . "\nDetails: " . $e->getDetails();
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
            Do something with $Geometry here...
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


### Example 4 - Deal with record-level errors individually
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
    $Shapefile = new ShapefileReader('example.shp');
    // Read all records
    $tot = $Shapefile->getTotRecords();
    for ($i = 1; $i <= $tot; ++$i) {
        try {
            // Manually set current record. Don't forget this!
            $Shapefile->setCurrentRecord($i);
            // Fetch a Geometry
            $Geometry = $Shapefile->fetchRecord();
            // Skip deleted records
            if ($Geometry->isDeleted()) {
                continue;
            }
            /*
                Do something with $Geometry here...
            */
        } catch (ShapefileException $e) {
            // Handle some specific errors types or fallback to default
            switch ($e->getErrorType()) {
                // We're crazy and we don't care about those invalid geometries... Let's skip them!
                case Shapefile::ERR_GEOM_RING_AREA_TOO_SMALL:
                case Shapefile::ERR_GEOM_RING_NOT_ENOUGH_VERTICES:
                    // The following "continue" statement is just syntactic sugar in this case
                    continue;
                    break;
                    
                // Let's handle this case differently... :)
                case Shapefile::ERR_GEOM_POLYGON_WRONG_ORIENTATION:
                    exit("Do you want the Earth to change its rotation direction?!?");
                    break;
                    
                // A fallback is always a nice idea
                default:
                    exit(
                        "Error Type: "  . $e->getErrorType()
                        . "\nMessage: " . $e->getMessage()
                        . "\nDetails: " . $e->getDetails()
                    );
                    break;
            }
        }
    }
} catch (ShapefileException $e) {
    /*
        Something went wrong during Shapefile opening!
    */
}
```




## Wait, what about *MultiPatch* shape types?
Well, after more than 15 years working with GIS related technologies, I have yet to see a *MultiPatch* Shapefile. Supporting them is not currently in the todo list.


## History
*23 January 2021* - [Version 3.4.0](/posts/php-shapefile-3.4.0/)
*17 September 2020* - [Version 3.3.3](/posts/php-shapefile-3.3.3/)
*17 August 2020* - [Version 3.3.2](/posts/php-shapefile-3.3.2/)
*13 August 2020* - [Version 3.3.1](/posts/php-shapefile-3.3.1/)
*23 May 2020* - [Version 3.3.0](/posts/php-shapefile-3.3.0/)
*9 April 2020* - [Version 3.2.0](/posts/php-shapefile-3.2.0/)
*2 February 2020* - [Version 3.1.3](/posts/php-shapefile-3.1.3/)
*15 January 2020* - [Version 3.1.2](/posts/php-shapefile-3.1.2/)
*10 November 2019* - [Version 3.1.1](/posts/php-shapefile-3.1.1/)
*30 October 2019* - [Version 3.1.0](/posts/php-shapefile-3.1.0/)
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
