---
layout      : lab
title       : PHP ShapeFile
description : PHP library to read any ESRI Shapefile and its associated DBF into a PHP Array or WKT
updated     : 2016-11-01
css         : []
js          : []
download    : php-shapefile/archive/v2.0.0.zip
source      : php-shapefile
---


## Features

- Supports all kinds of shapefiles, including Z and M ones
- Provides WKT/EWKT output
- [PHP FIG](http://www.php-fig.org/) [PSR-1](http://www.php-fig.org/psr/psr-1/), [PSR-2](http://www.php-fig.org/psr/psr-2/) and [PSR-4](http://www.php-fig.org/psr/psr-4/) compliant
- Completely standalone library
- Very fast and lightweight
- PHP 7 compatible



## Usage

```php?start_inline=1
// Register autoloader
require_once('php-shapefile/src/ShapeFileAutoloader.php');
\ShapeFile\ShapeFileAutoloader::register();
// Import classes
use \ShapeFile\ShapeFile;
use \ShapeFile\ShapeFileException;

// Open shape and read all the records
try {
    $ShapeFile = new ShapeFile('data.shp');
    while ($record = $ShapeFile->getRecord(ShapeFile::GEOMETRY_BOTH)) {
        if ($record['dbf']['_deleted']) continue;
        // Geometry
        print_r($record['shp']);
        // DBF Data
        print_r($record['dbf']);
    }
} catch (ShapeFileException $e) {
    exit('Error '.$e->getCode().' ('.$e->getErrorType().'): '.$e->getMessage());
}
```



## Classes
There are 3 classes available in the `\ShapeFile` namespace:

- [\ShapeFile\ShapeFileAutoloader](#class-shapefileautoloader)
- [\ShapeFile\ShapeFileException](#class-shapefileexception)
- [\ShapeFile\ShapeFile](#class-shapefile)



## Class ShapeFileAutoloader
This is a simple static class which provides autoloading capabilities. Use the static method `\ShapeFile\ShapeFileAutoloader::register()` as shows in the [example](#usage) to register the PHP ShapeFile autoloader.



## Class ShapeFileException
A custom Exception which extends PHP native [Exception](http://php.net/manual/en/language.exceptions.php) class. It add a custom `getErrorType()` method and it can be used to isolate PHP ShapeFile related exceptions. See it in action in the [example above](#usage).



## Class ShapeFile
Here are in detail all the public methods available for this Class:

- [__construct](#construct)
- [getShapeType](#getshapetype)
- [getBoundingBox](#getboundingbox)
- [getPRJ](#getprj)
- [getRecord](#getrecord)


### __construct

```php?start_inline=1
public ShapeFile::__construct(mixed $files [, int $flags = 0]);
```

##### `$files`
It can be either a *String* with the path to the `.shp` file or an *Array* containing the individual paths to the `.shp` `.dbf` and `.prj` files.

For example, the three following variants are equivalent:

```php?start_inline=1
// This is will look for "myshape.shp", "myshape.dbf" and "myshape.prj" files
$ShapeFile = new ShapeFile('myshape');

// This as well
$ShapeFile = new ShapeFile('myshape.shp');

// And this too
$ShapeFile = new ShapeFile(array(
    'shp'   => 'myshape.shp',
    'dbf'   => 'myshape.dbf',
    'prj'   => 'myshape.prj'
));
```

The *Array* version is useful in case of arbitrarily named files (*ie. temporary files*).
Note that the `.prj` file is absolutely **optional**.

##### `$flags`
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

##### `$format`
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



### getRecord

```php?start_inline=1
public array ShapeFile::getRecord([int $geometry_format])
```

Returns the next record from the open file.

```php?start_inline=1
array(
   'shp' => array() or string
   'dbf' => array()
)
```

<b>`geometry_format`</b> specifies the format for returned geometries.
It can be either
 `ShapeFile::GEOMETRY_ARRAY` : A structured *Array*. See [Output](#geometry-output) section (*Default*)
 `ShapeFile::GEOMETRY_WKT` : Well Known Text



## Geometry Output

Geometries can be read as structured arrays or [WKT](http://en.wikipedia.org/wiki/Well-known_text).
Multi `MULTI*`, 3dz `* Z`, 3dm `* M` and  4d `* ZM` geometries are recognized as such.
Note that eventual `FLAG_SUPPRESS_Z` and `FLAG_SUPPRESS_M` flags set with the [__constructor](#construct) will effectively condition the output.
In the output *array* *"no data"* values set for *M coordinates* in the shapefiles are returned as *boolean* `false`. 


### WKT

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


### Array

```php?start_inline=1
--- Record Type  0: Null
null

--- Record Types  1: Point,  11: PointZ,  21: PointM
Array(
  [x]   => float
  [y]   => float
  [z]   => float        // Present only for Record Type 11
  [m]   => float/false  // Present only for Record Types 11 and 21
  [wkt] => string       // Present only for format ShapeFile::GEOMETRY_BOTH
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
  [wkt]          => string  // Present only for format ShapeFile::GEOMETRY_BOTH
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
  [wkt]          => string  // Present only for format ShapeFile::GEOMETRY_BOTH
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
  [wkt]          => string  // Present only for format ShapeFile::GEOMETRY_BOTH
)
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
42      DBF_EOF_REACHED             End of DBF file reached. Number of records not corresponding to the SHP file
```


## But what about MultiPatch shape types?
Well, in more than 10 years working with GIS related technology, I have yet to see a *MultiPatch* shapefile! Supporting them is not currently in my todo list.


## History
*1 November 2016* - [Version 2.0.0](/posts/php-shapefile-version-2.0.0/)
*31 March 2016* - [Version 1.1](/posts/php-shapefile-version-1.1/)
*13 November 2014* - [Version 1.0](/posts/php-shapefile-release/)
