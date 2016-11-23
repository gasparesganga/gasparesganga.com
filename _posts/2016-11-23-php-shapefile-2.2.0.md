---
layout      : post
title       : PHP ShapeFile 2.2.0
description : Random access to specific record, handling of unexpected bytes in the files and Iterator interface
tags        : [Releases, PHP, ESRI, ShapeFile, GIS]
---

I stumbled across some shapefiles which seemed to be corrupted, even if many GIS softwares were still perfectly capable of reading them.
How so?
The answer lies in the reason why all three *shp*, *dbf* and ***shx*** are required for a shapefile to be deemed valid: there can be some useless, apparently random, bytes between records in the main *shp* file!
The sequential read approach used by this library wasn't obviously capable of handling them, so a few changes were required.


### What's new in Version 2.2.0
- *SHX* file is now required
- Capability to randomly access the shapefile records
- Implements the [Iterator](http://php.net/manual/en/class.iterator.php) interface
- Method `getTotRecords()`
- Method `setCurrentRecord()`
- Method `getCurrentRecord()`


#### SHX file is now required
Technically this is not a breaking change, hovewer it could potentially break your code if you are explicitly passing an array with the single filenames without specifying the *shx* one. Check the [constructor](/labs/php-shapefile#construct) syntax.

#### Capability to randomly access the shapefile
It goes without saying that having the *shx* file available, the library is now capable of access a specific record, without needing to sequentially reed all of them.

#### Implements the *Iterator* interface
The library now implements the [Iterator](http://php.net/manual/en/class.iterator.php) interface, meaning you can use a *foreach* loop to iterate over the records if you like.

#### Method `getTotRecords()`
This new method provides the number of records in the shapefile. See [getTotRecords](/labs/php-shapefile/#gettotrecords).

#### Method `setCurrentRecord()`
You can manually set the pointer to a specific record with this method. See [setCurrentRecord](/labs/php-shapefile/#setcurrentrecord).

#### Method `getCurrentRecord()`
Gets the current record pointer. See [getCurrentRecord](/labs/php-shapefile/#getcurrentrecord).



## Download and documentation

Go to the Lab page: [PHP ShapeFile](/labs/php-shapefile/)
