---
layout      : lab
title       : PHP ShapeFile
description : PHP Class to read any ESRI Shapefile and its associated DBF into a PHP Array
updated     : 2016-03-31
css         : []
js          : []
download    : php-shapefile/archive/v1.1.zip
source      : php-shapefile
---

<div class="alert">
    <b>31 March 2016 :</b> Version 1.1 released with some minor improvements. Check <a href="/posts/php-shapefile-version-1.1/">this post</a> for an explaination of the changes.
</div>

## Usage

```php?start_inline=1
require_once('shapefile.php');
try {
    $ShapeFile = new ShapeFile('data.shp');
    while ($record = $ShapeFile->getRecord(SHAPEFILE::GEOMETRY_WKT)) {
        if ($record['dbf']['deleted']) continue;
        // Geometry
        print_r($record['shp']);
        // DBF Data
        print_r($record['dbf']);
    }
} catch (ShapeFileException $e) {
    exit('Error '.$e->getCode().': '.$e->getMessage());
}
```


## Class Methods

Here are in detail all the public methods available for this Class:

* [__construct](#construct)
* [getShapeType](#getshapetype)
* [getBoundingBox](#getboundingbox)
* [getPRJ](#getprj)
* [getRecord](#getrecord)


### __construct

```php?start_inline=1
public ShapeFile::__construct(mixed $files);
```

<b>`$files`</b> can be either a *String* with the path to the `.shp` file or an *Array* containing the individual paths to the `.shp` `.dbf` and `.prj` files.

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


### getShapeType

```php?start_inline=1
public mixed ShapeFile::getShapeType([int $format])
```

Gets the ShapeFile type as either text or number.

<b>`$format`</b> specifies the return format.
It can be either
 `SHAPEFILE::FORMAT_INT` : Integer (*Default*)
 `SHAPEFILE::FORMAT_STR` : String


### getBoundingBox

```php?start_inline=1
public array ShapeFile::getBoundingBox()
```

Returns the whole ShapeFile bounding box as an *Array*:

```php?start_inline=1
array(
   'xmin' => float,
   'ymin' => float,
   'xmax' => float,
   'ymax' => float
)
```


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
 `SHAPEFILE::GEOMETRY_ARRAY` : A structured *Array*. See [Output](#geometry-output) section (*Default*)
 `SHAPEFILE::GEOMETRY_WKT` : Well Known Text



## Geometry Output

Geometries can be read as structured arrays or [WKT](http://en.wikipedia.org/wiki/Well-known_text).
Multi geometries `MULTIPOINT`, `MULTILINESTRING` and `MULTIPOLYGON` are recognized as such.

### WKT

```
--- Record Type 0: Null
null

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
```


### Array

```php?start_inline=1
--- Record Type 0: Null
null

--- Record Type 1: Point
Array(
   [x] => float
   [y] => float
)

--- Record Type 8: MultiPoint
Array(
   [xmin]      => float
   [ymin]      => float
   [xmax]      => float
   [ymax]      => float
   [numpoints] => integer
   [points]    => Array(
      [] => Array(
         [x] => float
         [y] => float
      )
   )
)

--- Record Type 3: PolyLine
Array(
   [xmin]     => float
   [ymin]     => float
   [xmax]     => float
   [ymax]     => float
   [numparts] => integer
   [parts]    => Array(
      [] => Array(
         [numpoints] => integer
         [points]    => Array(
            [] => Array(
               [x] => float
               [y] => float
            )
         )
      )
   )
)

--- Record Type 5: Polygon
Array(
   [xmin]     => float
   [ymin]     => float
   [xmax]     => float
   [ymax]     => float
   [numparts] => integer
   [parts]    => Array(
      [] => Array(
         [numrings] => integer
         [rings]    => Array(
            [] => Array(
               [numpoints] => integer
               [points]    => Array(
                  [] => Array(
                     [x] => float
                     [y] => float
                  )
               )
            )
         )
      )
   )
)
```



## Error Codes

```
Code      Description
11      : File not found. Check if the file exists and is readable
12      : Unable to read file
21      : Shape Type not supported
22      : Wrong Record's Shape Type
31      : Polygon Area too small, can't determine vertex orientation
32      : Polygon not valid or Polygon Area too small. Please check the geometries before reading the Shapefile
```


## PHP dBase functions

If your system doesn't come with [dBase](http://php.net/manual/en/intro.dbase.php) functions enabled, I've included the great [XBase](http://www.phpclasses.org/package/2673-PHP-Access-dbf-foxpro-files-without-PHP-ext-.html) library by **Erwin Kooi**.
In order to use the same syntax I've written a conversion module to expose his functions with a `dbase_` prefix instead of `xbase_`. 
I've also made a tiny bugfix to the original code at line `78` of the `api_conversion.php` file for `xbase_get_record` declaration.
Nothing else is different in the code, so all credits go to **Erwin Kooi** for that lib.

