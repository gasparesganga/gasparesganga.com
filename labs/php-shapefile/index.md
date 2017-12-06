---
layout      : lab
title       : PHP ShapeFile
description : PHP library to read any ESRI Shapefile and its associated DBF into a PHP Array, WKT or GeoJSON
updated     : 2017-12-06
getit       :
  github        : gasparesganga/php-shapefile
  download      : true
  composer      : gasparesganga/php-shapefile
---

{% capture current_date %}{{'now' | date: '%s'}}{% endcapture %}
{% capture expire_date %}{{'2018-01-15' | date: '%s'}}{% endcapture %}
{% if current_date < expire_date %}
<div class="alert">
    <b>6 December 2017 :</b> Version 2.4.2 released. See the <a href="/posts/php-shapefile-2.4.2/">release notes</a>.
</div>
{% endif %}


## Contents
- [Get it](#get-it)
- [Features](#features)
- [Basic Usage](#basic-usage)
- [Classes](#classes)
- [Geometry Output](#geometry-output)
- [Error Codes](#error-codes)
- [Extending the Library](#extending-the-library)
- [Examples](#examples)
- [History](#history)
- [Comments and Ideas](#comments-and-ideas)


## Get it
{% include getit.html %}


## Features
- Supports all kinds of shapefiles, including Z and M ones
- Provides WKT/EWKT and GeoJSON output
- Implements the [Iterator](http://php.net/manual/en/class.iterator.php) interface
- [PHP FIG](http://www.php-fig.org/) [PSR-1](http://www.php-fig.org/psr/psr-1/), [PSR-2](http://www.php-fig.org/psr/psr-2/) and [PSR-4](http://www.php-fig.org/psr/psr-4/) compliant
- Sequential read or random access the specific shapefile records
- Completely standalone library
- Very fast and lightweight
- PHP 7 compatible



## Basic Usage
```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/ShapeFileAutoloader.php');
\ShapeFile\ShapeFileAutoloader::register();

// Import classes
use \ShapeFile\ShapeFile;
use \ShapeFile\ShapeFileException;

try {
    // Open shapefile
    $ShapeFile = new ShapeFile('data.shp');
    
    // Read all the records
    while ($record = $ShapeFile->getRecord(ShapeFile::GEOMETRY_WKT)) {
        if ($record['dbf']['_deleted']) continue;
        // Geometry
        print_r($record['shp']);
        // DBF Data
        print_r($record['dbf']);
    }
    
} catch (ShapeFileException $e) {
    // Print detailed error information
    exit('Error '.$e->getCode().' ('.$e->getErrorType().'): '.$e->getMessage());
}
```

Check the [Examples](#examples) section for more usage hints.



## Classes
There are 3 Classes available in the `\ShapeFile` namespace:

- [\ShapeFile\ShapeFileAutoloader](#class-shapefileautoloader)
- [\ShapeFile\ShapeFileException](#class-shapefileexception)
- [\ShapeFile\ShapeFile](#class-shapefile)



## Class ShapeFileAutoloader
This is a simple static Class which provides autoloading capabilities. Use the static method `\ShapeFile\ShapeFileAutoloader::register()` as shown in the [example](#basic-usage) to register the PHP ShapeFile autoloader.



## Class ShapeFileException
A custom Exception which extends PHP native [Exception](http://php.net/manual/en/language.exceptions.php) Class. It adds a custom `getErrorType()` method and can be used to isolate PHP ShapeFile related exceptions. See it in action in the [example above](#basic-usage).



## Class ShapeFile
The main Class which exposes the following public methods:

- [__construct](#__construct)
- [getShapeType](#getshapetype)
- [getBoundingBox](#getboundingbox)
- [getPRJ](#getprj)
- [getDBFFields](#getdbffields)
- [getTotRecords](#gettotrecords)
- [setCurrentRecord](#setcurrentrecord)
- [getCurrentRecord](#getcurrentrecord)
- [setDefaultGeometryFormat](#setdefaultgeometryformat)
- [getRecord](#getrecord)


### __construct
```php?start_inline=1
public ShapeFile::__construct(mixed $files [, int $flags = 0]);
```

#### `$files`
It can be either a *String* with the path to the `.shp` file or an *Array* containing the individual paths to the `.shp`, `.shx`, `.dbf` and `.prj` files.

For example, the three following variants are equivalent:

```php?start_inline=1
// This is will look for "myshape.shp", "myshape.shx", "myshape.dbf" and "myshape.prj" files
$ShapeFile = new ShapeFile('myshape');

// This as well
$ShapeFile = new ShapeFile('myshape.shp');

// And this too
$ShapeFile = new ShapeFile(array(
    'shp'   => 'myshape.shp',
    'shx'   => 'myshape.shx',
    'dbf'   => 'myshape.dbf',
    'prj'   => 'myshape.prj'
));
```

The *Array* version is useful in case of arbitrarily named files (*ie. temporary files*).
Note that the `.prj` file is absolutely **optional**.

#### `$flags`
You can pass **optional** flags, combined with a *bitwise Or* operator `|` or simply adding them:

```php?start_inline=1
// This sets both FLAG_SUPPRESS_Z and FLAG_SUPPRESS_M flags...
$ShapeFile = new ShapeFile('dati/multipointz.shp', ShapeFile::FLAG_SUPPRESS_Z | ShapeFile::FLAG_SUPPRESS_M);

// ... and so does this
$ShapeFile = new ShapeFile('dati/multipointz.shp', ShapeFile::FLAG_SUPPRESS_Z + ShapeFile::FLAG_SUPPRESS_M);
```

Available flags are:
 `ShapeFile::FLAG_SUPPRESS_Z` : Ignores *Z coordinate* from shapefile
 `ShapeFile::FLAG_SUPPRESS_M` : Ignores *M coordinate* from shapefile



### getShapeType
```php?start_inline=1
public mixed ShapeFile::getShapeType([int $format])
```

Gets the ShapeFile type as either text or number.

#### `$format`
It specifies the return format and can one of:
 `ShapeFile::FORMAT_INT` : Integer (*Default*)
 `ShapeFile::FORMAT_STR` : String



### getBoundingBox
```php?start_inline=1
public array ShapeFile::getBoundingBox()
```

Returns the whole ShapeFile bounding box as an *Array*:

```php?start_inline=1
array(
    [xmin] => float
    [ymin] => float
    [xmax] => float
    [ymax] => float
    [zmin] => float        // Present only for Z shapefiles
    [zmax] => float        // Present only for Z shapefiles
    [mmin] => float/false  // Present only for M and Z shapefiles
    [mmax] => float/false  // Present only for M and Z shapefiles
)
```
*"No data"* values set for *M coordinates* in the shapefiles are returned as *boolean* `false`.
Eventual `FLAG_SUPPRESS_Z` and `FLAG_SUPPRESS_M` flags set with the [__constructor](#construct) will effectively condition the output.



### getPRJ
```php?start_inline=1
public string ShapeFile::getPRJ()
```

Returns the raw WKT string from the `.prj` file. If there's no `.prj` file then `null` is returned.



### getDBFFields
```php?start_inline=1
public array ShapeFile::getDBFFields()
```

Returns and *Array* representing the fields definition in the DBF file:

```php?start_inline=1
array(
    [] => Array(
        [name]      => string
        [type]      => string
        [size]      => integer
        [decimals]  => integer
    )
)
```

The field `type` is encoded as the original dBaseIII/IV specifications:

```
C : Char
D : Date
N : Numeric
L : Logical
```



### getTotRecords
```php?start_inline=1
public integer ShapeFile::getTotRecords()
```

Returns the number of records present in the shapefile.



### setCurrentRecord
```php?start_inline=1
public void ShapeFile::setCurrentRecord(int $index)
```

Sets the index of the current record. If an invalid index is provided, this method will throw a ShapeFileException.

#### `$index`
The index of the record. Note that records count starts from `1` in the shapefiles.



### getCurrentRecord
```php?start_inline=1
public integer ShapeFile::getCurrentRecord()
```

Returns the index of the current record. Note that records count starts from `1` in the shapefiles. When the last record is reached, the special value `ShapeFile::EOF` will be returned.



### setDefaultGeometryFormat
```php?start_inline=1
public void ShapeFile::setDefaultGeometryFormat(int $geometry_format)
```

Sets the default return format for geometries. See the `getRecord` method for details about [$geometry_format](#geometry_format) parameter.
This comes in handy when using the Iterator interface, see [Example 3](#example-3---use-foreach-iterator).



### getRecord
```php?start_inline=1
public array ShapeFile::getRecord([int $geometry_format = ShapeFile::GEOMETRY_ARRAY])
```

Returns the current record and move the cursor forward to the next element. When the last record is reached, the cursor will be set to the special value `ShapeFile::EOF` and this method will return boolean value **`false`**.

```php?start_inline=1
array(
   [shp]  => array() or string
   [dbf]  => array()
)
```

#### `$geometry_format`
A *bitmask* to specify the format for returned geometries (`shp` part of the returned *Array*).
The available formats are:
 `ShapeFile::GEOMETRY_ARRAY` : A structured *Array* **(Default)**
 `ShapeFile::GEOMETRY_WKT` : Well Known Text string
 `ShapeFile::GEOMETRY_GEOJSON_GEOMETRY` : GeoJSON string including only the *geometry* object
 `ShapeFile::GEOMETRY_GEOJSON_FEATURE` : GeoJSON string including the whole *feature* object
You can combine them using a *bitwise Or* operator `|` or simply adding them.




## Geometry Output
Geometries read with [getRecord](#getrecord) method can be returned as a structured *Array* or a string containing their [WKT](https://en.wikipedia.org/wiki/Well-known_text) or [GeoJSON](http://geojson.org) representation.
Multi `MULTI*`, 3dz `* Z`, 3dm `* M` and  4d `* ZM` geometries are recognized as such.
Note that eventual `FLAG_SUPPRESS_Z` and `FLAG_SUPPRESS_M` flags set with the [__constructor](#construct) will effectively condition the output.
In the output *Array* *"no data"* values set for *M coordinates* in the shapefiles are returned as *boolean* `false`. 


### GEOMETRY_ARRAY / Combined bitmask
```php?start_inline=1
--- Record Type  0: Null
null

--- Record Types  1: Point,  11: PointZ,  21: PointM
Array(
  [x]       => float
  [y]       => float
  [z]       => float        // Present only for Record Type 11
  [m]       => float/false  // Present only for Record Types 11 and 21
  [wkt]     => string       // Present only when format ShapeFile::GEOMETRY_WKT is enabled
  [geojson] => string       // Present only when formats ShapeFile::GEOMETRY_GEOJSON_GEOMETRY or ShapeFile::GEOMETRY_GEOJSON_FEATURE are enabled
)

--- Record Types  8: MultiPoint,  18: MultiPointZ,  28: MultiPointM
Array(
  [bounding_box] => Array(
    [xmin]          => float
    [ymin]          => float
    [xmax]          => float
    [ymax]          => float
    [zmin]          => float        // Present only for Record Type 18
    [zmax]          => float        // Present only for Record Type 18
    [mmin]          => float/false  // Present only for Record Types 18 and 28
    [mmax]          => float/false  // Present only for Record Types 18 and 28
  )
  [numpoints]    => integer
  [points]       => Array(
    []              => Array(
      [x]              => float
      [y]              => float
      [z]              => float        // Present only for Record Type 18
      [m]              => float/false  // Present only for Record Types 18 and 28
    )
  )
  [wkt]          => string  // Present only when format ShapeFile::GEOMETRY_WKT is enabled
  [geojson]      => string  // Present only when formats ShapeFile::GEOMETRY_GEOJSON_GEOMETRY or ShapeFile::GEOMETRY_GEOJSON_FEATURE are enabled
)

--- Record Types  3: PolyLine,  13: PolyLineZ,  23: PolyLineM
Array(
  [bounding_box] => Array(
    [xmin]          => float
    [ymin]          => float
    [xmax]          => float
    [ymax]          => float
    [zmin]          => float        // Present only for Record Type 13
    [zmax]          => float        // Present only for Record Type 13
    [mmin]          => float/false  // Present only for Record Types 13 and 23
    [mmax]          => float/false  // Present only for Record Types 13 and 23
  )
  [numparts]     => integer
  [parts]        => Array(
    []              => Array(
      [numpoints]      => integer
      [points]         => Array(
        []                => Array(
          [x]                => float
          [y]                => float
          [z]                => float        // Present only for Record Type 13
          [m]                => float/false  // Present only for Record Types 13 and 23
        )
      )
    )
  )
  [wkt]          => string  // Present only when format ShapeFile::GEOMETRY_WKT is enabled
  [geojson]      => string  // Present only when formats ShapeFile::GEOMETRY_GEOJSON_GEOMETRY or ShapeFile::GEOMETRY_GEOJSON_FEATURE are enabled
)

--- Record Types  5: Polygon,  15: PolygonZ,  25: PolygonM
Array(
  [bounding_box] => Array(
    [xmin]          => float
    [ymin]          => float
    [xmax]          => float
    [ymax]          => float
    [zmin]          => float        // Present only for Record Type 15
    [zmax]          => float        // Present only for Record Type 15
    [mmin]          => float/false  // Present only for Record Types 15 and 25
    [mmax]          => float/false  // Present only for Record Types 15 and 25
  )
  [numparts]     => integer
  [parts]        => Array(
    []              => Array(
      [numrings]       => integer
      [rings]          => Array(
        []                => Array(
          [numpoints]        => integer
          [points]           => Array(
            []                  => Array(
              [x]                  => float
              [y]                  => float
              [z]                  => float        // Present only for Record Type 15
              [m]                  => float/false  // Present only for Record Types 15 and 25
            )
          )
        )
      )
    )
  )
  [wkt]          => string  // Present only when format ShapeFile::GEOMETRY_WKT is enabled
  [geojson]      => string  // Present only when formats ShapeFile::GEOMETRY_GEOJSON_GEOMETRY or ShapeFile::GEOMETRY_GEOJSON_FEATURE are enabled
)
```


### GEOMETRY_WKT
```
---------- NULL ----------
--- Record Type 0: Null
null


---------- 2d ----------
--- Record Type 1: Point
POINT(0 0)

--- Record Type 8: MultiPoint
MULTIPOINT(0 0, 1 1)

--- Record Type 3: PolyLine
LINESTRING(0 0, 1 1, 2 2)
MULTILINESTRING((0 0, 1 1, 2 2), (4 4, 5 3))

--- Record Type 5: Polygon
POLYGON((0 0, 0 4, 4 4, 4 0, 0 0), (1 1, 1 2, 2 2, 2 1, 1 1))
MULTIPOLYGON(((5 5, 6 6, 7 5, 5 5)), ((0 0, 0 4, 4 4, 4 0, 0 0), (1 1, 1 2, 2 2, 2 1, 1 1)))


---------- 3dm ----------
--- Record Type 21: PointM
POINTM(0 0 0)

--- Record Type 28: MultiPointM
MULTIPOINTM(0 0 0, 1 1 1)

--- Record Type 23: PolyLineM
LINESTRINGM(0 0 0, 1 1 1, 2 2 2)
MULTILINESTRINGM((0 0 0, 1 1 1, 2 2 2), (4 4 4, 5 5 5))

--- Record Type 25: PolygonM
POLYGONM((0 0 1, 0 4 1, 4 4 1, 4 0 1, 0 0 1), (1 1 1, 1 2 1, 2 2 1, 2 1 1, 1 1 1))
MULTIPOLYGONM(((5 5 0, 6 6 0, 7 5 0, 5 5 0)), ((0 0 0, 0 4 0, 4 4 0, 4 0 0, 0 0 0), (1 1 0, 1 2 0, 2 2 0, 2 1 0, 1 1 0)))


---------- 3dz and 4d ----------
--- Record Type 11: PointZ
POINTZ(0 0 0)
POINTZM(0 0 0 0)

--- Record Type 18: MultiPointZ
MULTIPOINTZ(0 0 0, 1 1 1)
MULTIPOINTZM(0 0 0 0, 1 1 1 1)

--- Record Type 13: PolyLineZ
LINESTRINGZ(0 0 0, 1 1 1, 2 2 2)
LINESTRINGZM(0 0 0 0, 1 1 1 1, 2 2 2 2)
MULTILINESTRINGZ((0 0 0, 1 1 1, 2 2 2), (4 4 4, 5 5 5))
MULTILINESTRINGZM((0 0 0 0, 1 1 1 1, 2 2 2 2), (4 4 4 4, 5 5 5 5))

--- Record Type 15: PolygonZ
POLYGONZ((0 0 1, 0 4 1, 4 4 1, 4 0 1, 0 0 1), (1 1 1, 1 2 1, 2 2 1, 2 1 1, 1 1 1))
POLYGONZM((0 0 1 0, 0 4 1 0, 4 4 1 0, 4 0 1 0, 0 0 1 0), (1 1 1 0, 1 2 1 0, 2 2 1 0, 2 1 1 0, 1 1 1 0))
MULTIPOLYGONZ(((5 5 0, 6 6 0, 7 5 0, 5 5 0)), ((0 0 0, 0 4 0, 4 4 0, 4 0 0, 0 0 0), (1 1 0, 1 2 0, 2 2 0, 2 1 0, 1 1 0)))
MULTIPOLYGONZM(((5 5 0 2, 6 6 0 2, 7 5 0 2, 5 5 0 2)), ((0 0 0 2, 0 4 0 2, 4 4 0 2, 4 0 0 2, 0 0 0 2), (1 1 0 2, 1 2 0 2, 2 2 0 2, 2 1 0 2, 1 1 0 2)))
```


### GEOMETRY_GEOJSON_GEOMETRY / GEOMETRY_GEOJSON_FEATURE
```php?start_inline=1
--- Record Type 0: Null
null

--- Record Types  1: Point,  11: PointZ
{
    "type": "Point", 
    "coordinates": [x, y, z]
}

--- Record Types  8: MultiPoint,  18: MultiPointZ
{
    "type": "MultiPoint", 
    "coordinates": [
        [x, y, z], ...
    ]
}

--- Record Types  3: PolyLine,  13: PolyLineZ
{
    "type": "LineString", 
    "coordinates": [
        [x, y, z], ...
    ]
}

{
    "type": "MultiLineString", 
    "coordinates": [
        [
            [x, y, z], 
            ...
        ],
        ...
    ]
}

--- Record Types  5: Polygon,  15: PolygonZ
{
    "type": "Polygon", 
    "coordinates": [
        [
            [x, y, z],
            ...
        ],
        ...
    ]
}

{
    "type": "MultiPolygon", 
    "coordinates": [
        [
            [
                [x, y, z],
                ...
            ],
            ...
        ], 
        ...
    ]
}
```

Note that, complying to [section 3.1.6 of RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.6), the *orientation* of Polygons and MultiPolygons inner and outer rings in GeoJSON output is reversed compared to how they are stored in ESRI Shapefiles. The library takes care of that under the hood and you will note how the order of points is different in GeoJSON output.

Also, a clarification is required for *M* geometries: they are not supported by the GeoJSON format but I decided to extend it in order to deal with *measured Shapefiles*. You will find some `PointM`, `MultiPointM`, `LineStringM`, `MultiLineStringM`, `PolygonM`, `MultiPolygonM` geometry types and the coordinates will be expressed in either `[x, y, z, m]` or `[x, y, m]` depending on the Shapefile type and flags set. Use the [ShapeFile::FLAG_SUPPRESS_M](#flags) flag if you prefer to ignore the *M* dimension and be fully compliant to [RFC 7946](https://tools.ietf.org/html/rfc7946).


### GEOMETRY_GEOJSON_FEATURE
This format packs a `bbox` object and all the dbf `properties` into a single GeoJSON *feature*, ready to go.

```
{
    "type": "Feature",
    "bbox": [
        xmin,   
        ymin,   
        zmin,   // Present only for 3dz and 4d geometries 
        mmin,   // Present only for measured geometries
        xmax,   
        ymax,   
        zmax,   // Present only for 3dz and 4d geometries 
        mmax    // Present only for measured geometries
    ],
    "geometry": {
        // A regular geometry object as described before
    },
    "properties": {
        "name": "value",
        ...
    }
}
```



## Error Codes
```
Code    Type                        Description
-----------------------------------------------------------------------------------------------------------------------------------------
11      FILE_EXISTS                 File not found. Check if the file exists and is readable
12      FILE_OPEN                   Unable to read file
21      SHAPE_TYPE_NOT_SUPPORTED    Shape Type not supported
22      WRONG_RECORD_TYPE           Wrong Record's Shape Type
31      POLYGON_AREA_TOO_SMALL      Polygon Area too small, can't determine vertex orientation
32      POLYGON_NOT_VALID           Polygon not valid or Polygon Area too small. Please check the geometries before reading the Shapefile
41      DBF_FILE_NOT_VALID          DBF file doesn't seem to be a valid dBase III or dBase IV format
42      DBF_MISMATCHED_FILE         Mismatched DBF file. Number of records not corresponding to the SHP file
43      DBF_EOF_REACHED             End of DBF file reached. Number of records not corresponding to the SHP file
91      RECORD_INDEX_NOT_VALID      Record index not valid. Check the total number of records in the SHP file
```



## Extending the Library
The main `ShapeFile` class can be easily extended thanks to the protected method `init()`:

```php?start_inline=1
protected void ShapeFile::init(resource $shp_handle, int $shp_size, resource $shx_handle, int $shx_size, resource $dbf_handle, int $dbf_size [, string $prj_contents = null [, int $flags = 0]]);
```

#### `$shp_handle`, `$shx_handle`, `$dbf_handle`
Resource handles of the `.shp`, `.shx`, `.dbf` files.

#### `$shp_size`, `$shx_size`, `$dbf_size`
Filesizes expressed in bytes.

#### `$prj_contents`
Optional raw WKT contents of the PRJ file.

#### `$flags`
Optional [flags](#flags) to be passed to `ShapeFile` constructor.


### See it in action
```php?start_inline=1
class ShapeFileCustom extends \ShapeFile\ShapeFile
{
    public function __construct($your_custom_arguments_here, $flags = 0)
    {        
        /*
            Some custom code here...
        */
        
        // In the end, you will need some resource streams and filesizes, as well as the optional prj file contents:
        $shp_handle   = .....
        $shx_handle   = .....
        $dbf_handle   = .....
        $shp_size     = .....
        $shx_size     = .....
        $dbf_size     = .....
        $prj_contents = .....
        
        // Now call the init() method and let the ShapeFile class do its job:
        $this->init($shp_handle, $shp_size, $shx_handle, $shx_size, $dbf_handle, $dbf_size, $prj_contents, $flags);
    }
}
```



## Examples

### Example 1 - Get shapefile info
```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/ShapeFileAutoloader.php');
\ShapeFile\ShapeFileAutoloader::register();

// Import classes
use \ShapeFile\ShapeFile;
use \ShapeFile\ShapeFileException;

echo "<pre>";
try {
    // Open shapefile
    $ShapeFile = new ShapeFile('data.shp');
    
    // Get Shape Type
    echo "Shape Type : ";
    echo $ShapeFile->getShapeType()." - ".$ShapeFile->getShapeType(ShapeFile::FORMAT_STR);
    echo "\n\n";
    
    // Get number of Records
    echo "Records : ";
    echo $ShapeFile->getTotRecords();
    echo "\n\n";
    
    // Get Bounding Box
    echo "Bounding Box : ";
    print_r($ShapeFile->getBoundingBox());
    echo "\n\n";
    
    // Get DBF Fields
    echo "DBF Fields : ";
    print_r($ShapeFile->getDBFFields());
    echo "\n\n";
    
} catch (ShapeFileException $e) {
    // Print detailed error information
    exit('Error '.$e->getCode().' ('.$e->getErrorType().'): '.$e->getMessage());
}
echo "</pre>";
```


### Example 2 - Access a specific record
```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/ShapeFileAutoloader.php');
\ShapeFile\ShapeFileAutoloader::register();

// Import classes
use \ShapeFile\ShapeFile;
use \ShapeFile\ShapeFileException;

echo "<pre>";
try {
    // Open shapefile
    $ShapeFile = new ShapeFile('data.shp');
    
    // Check if provided index is valid
    if ($_GET['record_index'] > 0 && $_GET['record_index'] <= $ShapeFile->getTotRecords()) {
        // Set the cursor to a specific record
        $ShapeFile->setCurrentRecord($_GET['record_index']);
        // Read only one record
        $ret = $ShapeFile->getRecord();
    } else {
        $ret = "Index not valid!";
    }
    
    print_r($ret);
    
} catch (ShapeFileException $e) {
    // Print detailed error information
    exit('Error '.$e->getCode().' ('.$e->getErrorType().'): '.$e->getMessage());
}
echo "</pre>";
```


### Example 3 - Use foreach iterator
```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/ShapeFileAutoloader.php');
\ShapeFile\ShapeFileAutoloader::register();

// Import classes
use \ShapeFile\ShapeFile;
use \ShapeFile\ShapeFileException;

echo "<pre>";
try {
    // Open shapefile
    $ShapeFile = new ShapeFile('data.shp');
    
    // Sets default return format
    $ShapeFile->setDefaultGeometryFormat(ShapeFile::GEOMETRY_WKT | ShapeFile::GEOMETRY_GEOJSON_GEOMETRY);
    
    // Read all the records using a foreach loop
    foreach ($ShapeFile as $i => $record) {
        if ($record['dbf']['_deleted']) continue;
        // Record number
        echo "Record number: $i\n";
        // Geometry
        print_r($record['shp']);
        // DBF Data
        print_r($record['dbf']);
    }
    
} catch (ShapeFileException $e) {
    // Print detailed error information
    exit('Error '.$e->getCode().' ('.$e->getErrorType().'): '.$e->getMessage());
}
echo "</pre>";
```



## Wait, what about MultiPatch shape types?
Well, after more than 10 years working with GIS related technology, I have yet to see a *MultiPatch* shapefile. Supporting them is not currently in my todo list.


## History
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
