---
layout      : post
title       : PHP ShapeFile 2.0.0
description : Z and M shapes support, PHP 7 compatible, dropped XBase dependency, PSR-compliant code and more!
tags        : [Releases, PHP, ShapeFile, GIS]
---


nuovo GEOMETRY_BOTH
it works on big-endian machines (in the unlikely event...)

attributi stringa (dbf) in utf8 !


### What's new in Version 2.0.0

- Support for Z and M shape types
- Native DBF reading capabilities
- All strings read from DBF are returned already encoded in utf-8
- Code is now [PHP FIG](http://www.php-fig.org/) [PSR-1](http://www.php-fig.org/psr/psr-1/), [PSR-2](http://www.php-fig.org/psr/psr-2/) and [PSR-4](http://www.php-fig.org/psr/psr-4/) compliant
- `ShapeFile` namespace and `ShapeFileAutoloader` class
- `GEOMETRY_BOTH` format for `getRecord()` method
- New DBF error codes
- PHP 7 compatible
- Support for big-endian machines



<br>

#### Support for Z and M shape types
xxxxxxxxxxxxxxxxxxxxxxxxxxx

#### Native DBF reading capabilities
The *XBase* dependency as fallback for *dbase* functions had been dropped. That was a brilliant project but unfortunately it's not maintained anymore and it was causing major PHP 7 compatibility issues.
The solution was to drop both *XBase* and *dbase* dependencies and provide native DBF reading capabilities.
PHP ShapeFile is now 100% standalone, PHP 7 compatible and faster than ever!

#### All strings read from DBF are returned already encoded in utf-8
As a bonus for having native DBF reading capabilities, all the strings read from the DBF files are now returned already encoded in utf-8.

#### Code is now PHP-FIG PSR-1, PSR-2 and PSR-4 compliant
This should be self-explanatory. Even if I don't *fully* agree with all the recommendation, I tried to follow them all in order to provide some *standardized* code.

#### `ShapeFile` namespace and `ShapeFileAutoloader` class
All the classes reside in a brand new `\ShapeFile` namespace and a static `ShapeFileAutoloader` is available to provide autoloading capabilities.

#### `GEOMETRY_BOTH` format for `getRecord()` method
xxxxxxxxxxxxxxxxxxxxxxxxxxx


#### New DBF error codes
Native DBF capabilities require some new `ShapeFileException` error codes. You can find all the error codes [here]((/labs/php-shapefile/#error-codes)).

#### Support for big-endian machines
It's unikely that you will run some PHP code on big-endian machines, but this library will now work nonetheless.



## Download and documentation

Go to the Lab page: [PHP ShapeFile](/labs/php-shapefile/)
