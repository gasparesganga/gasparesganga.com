---
layout      : post
title       : PHP Shapefile 3.1.0
description : Writing performance boost, append capabilities and a few bugfixes
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


Exactly two months have passed since v3 release and honestly I wasn't expecting such a *featureful* new release this early on. It was actually driven by the great testing and analyzing work conducted by a user who decided to rely on this library for a big project and took his time to analyze where better performance could be achived as well as pointing out a few issues and requesting some new features. **Thank you so much, Pablo!**
Taking the chance to review the code, I also found and fixed a few nasty bugs that were introduced with v3.
Capability to *append records* to existing Shapefiles comes with a [potentially breaking change](#capability-to-append-records-to-existing-shapefiles), as well as proper DBF [field names sanitization](#sanitize-and-resolve-conflicting-and-duplicated-dbf-field-names). I am aware a minor release is not supposed to bring any breaking change, but I really didn't feel like jumping to v4 after just 2 months and for such a minor detail that I, in all honesty, don't think it will break many people's code.


### What's new in Version 3.1.0
- Writing buffer in `ShapefileWriter` class
- Capability to append records to existing Shapefiles
- Various new public methods for both `ShapefileReader` and `ShapefileWriter` classes
- Sanitize and resolve conflicting and duplicated DBF field names
- Other minor code and performance improvements across the library
- Default `c+b` file access mode for `ShapefileWriter` class
- Convert field names to uppercase for `Geometry` data when `Shapefile::OPTION_DBF_FORCE_ALL_CAPS` is enabled
- Decouple field names sanitization and `Shapefile::OPTION_DBF_FORCE_ALL_CAPS` option
- Accept explicit `null` values when `Shapefile::OPTION_ENFORCE_GEOMETRY_DATA_STRUCTURE` is enabled
- Write correct record number in SHP record headers
- Suppress PHP Warnings in `fread()` and `fwrite()` calls
- Fix bug causing a corrupted DBF file when a `Shapefile::ERR_GEOM_MISSING_FIELD` is raised
- Fix corner case bug when no record has been written yet


#### Writing buffer in `ShapefileWriter` class
Records are now not immediately written into files (or, more technically, *resource streams*). Rather they are buffered into memory and written when they reach a certain amount. This allows up to a 50% reduction in writing time (or even more in some specific cases)!
There is a brand new **`Shapefile::OPTION_BUFFERED_RECORDS`** constructor option for `ShapefileWriter` class that specifies the number of records to keep into the memory buffer before writing them. Use a value equal or less than `0` to keep all records into a buffer and write them at once when finalizing the file. Default value is `10`, which should suit most scenarios (taking into account an average of total records, complexity of data, system configuration, etc.).
There is also a new **`ShapefileWriter::flushBuffer()`** method, which allows to manually write memory buffers to files. It will effectively reset the record counter that causes automatic buffer flushing according to the value specified with `Shapefile::OPTION_BUFFERED_RECORDS` constructor option.


#### Capability to append records to existing Shapefiles
The library can now append records to an existing Shapefile. This is achieved thanks to a new **`Shapefile::OPTION_EXISTING_FILES_MODE`** constructor option for `ShapefileWriter` class, that defines the behaviour with existing files with the same name and can assume the following 3 values:
- `Shapefile::MODE_PRESERVE` : Throws a `ShapefileException` with `Shapefile::ERR_FILE_EXISTS` error (this is the default)
- `Shapefile::MODE_OVERWRITE` : Overwrites existing files
- `Shapefile::MODE_APPEND` : Appends new records to existing files

Of course this feature made obsolete and useless **`Shapefile::OPTION_OVERWRITE_EXISTING_FILES`** constructor option for `ShapefileWriter` class, which has been removed. <u><b>This might break some existing code</b></u> (yet very young, 2 months old at max), but I think it was worth it.


#### Various new public methods for both `ShapefileReader` and `ShapefileWriter` classes
Both `ShapefileReader` and `ShapefileWriter` classes now expose 3 new methods:
- [isZ()](/labs/php-shapefile/#shapefileisz)
- [isM()](/labs/php-shapefile/#shapefileism)
- [getFieldsNames()](/labs/php-shapefile/#shapefilegetfieldsnames).

Also, a few methods that were only available to `ShapefileReader` are now exposed by `ShapefileWriter` too:
- [getShapeType()](/labs/php-shapefile/#shapefilegetshapetype)
- [getBoundingBox()](/labs/php-shapefile/#shapefilegetboundingbox)
- [getPRJ()](/labs/php-shapefile/#shapefilegetprj)
- [getCharset()](/labs/php-shapefile/#shapefilegetcharset)
- [setCharset()](/labs/php-shapefile/#shapefilesetcharset)
- [getField()](/labs/php-shapefile/#shapefilegetfield)
- [getFieldType()](/labs/php-shapefile/#shapefilegetfieldtype)
- [getFieldSize()](/labs/php-shapefile/#shapefilegetfieldsize)
- [getFieldDecimals()](/labs/php-shapefile/#shapefilegetfielddecimals)
- [getFields()](/labs/php-shapefile/#shapefilegetfields)
- [getTotRecords()](/labs/php-shapefile/#shapefilegettotrecords)

They can come in handy when `Shapefile::OPTION_EXISTING_FILES_MODE` is set to `Shapefile::MODE_APPEND`, in order to check existing files definition.


#### Sanitize and resolve conflicting and duplicated DBF field names
DBF field names can be maximum 10 characters and contain only letters, numbers and underscores.
The library will now always *sanitize* invalid and/or duplicated field names added with any `ShapefileWriter` field-adding method ([addCharField()](/labs/php-shapefile/#shapefilewriteraddcharfield), [addNumericField()](/labs/php-shapefile/#shapefilewriteraddnumericfield), etc.): names will be truncated at 10 characters, not allowed characters replaced with underscores and in case of resulting duplicated names or conflicts, a serial number from `_1` to `99` will be added.
<u><b>This feature comes with another potential (or should I say <i>virtual</i>?) breaking change</b></u>: `$flag_sanitize_name` parameter was removed from all `ShapefileWriter` field-adding methods. It is actually not a very big deal, since it would only affect people relying on a custom sanitization function of theirs **that wasn't working well**. Since the library wouldn't allow illegal field names anyways, a `ShapefileException` with `Shapefile::ERR_DBF_FIELD_NAME_NOT_UNIQUE` error type was being thrown in case the field name was not valid.
Of course **`Shapefile::ERR_DBF_FIELD_NAME_NOT_UNIQUE`** error type was removed too.
Also, `Shapefile::ERR_DBF_FIELD_NAME_NOT_VALID` error type is now defined as `"Too many field names conflicting"`, that is, more than 100!


#### Other minor code and performance improvements across the library
Since at the beginning this release was focused on performance, a few tiny touches here and there in the codebase were made in order to improve it generally. Most notably the DBF values enconding logic has been changed when parsing numbers, relying on PHP native `number_format()` for non-textual numeric input.


#### Default `c+b` file access mode for `ShapefileWriter` class
The addition of appending records to existing files required reading and not just writing access to them. Default file access mode for `ShapefileWriter` class is now `c+b`. This should not be a problem, unless you have some *weird* writing-but-not-reading permission on files or directories (in that case, fix them please, that's not useful for shapefiles...).


#### Convert field names to uppercase for `Geometry` data when `Shapefile::OPTION_DBF_FORCE_ALL_CAPS` is enabled
That was a big bug that went unnoticed since v3: when `Shapefile::OPTION_DBF_FORCE_ALL_CAPS` is enabled all field names must silently be considered as uppercase when adding a `Geometry` to a Shapefile.


#### Decouple field names sanitization and `Shapefile::OPTION_DBF_FORCE_ALL_CAPS` option
Another silly bug causing `Shapefile::OPTION_DBF_FORCE_ALL_CAPS` to be tied to field name sanitization. Fixed now.


#### Accept explicit `null` values when `Shapefile::OPTION_ENFORCE_GEOMETRY_DATA_STRUCTURE` is enabled
A `ShapefileException` with `Shapefile::ERR_GEOM_MISSING_FIELD` error was being erroneously raised when a field had an explicit `null` value and `Shapefile::OPTION_ENFORCE_GEOMETRY_DATA_STRUCTURE` was enabled.


#### Write correct record number in SHP record headers
There was a bug causing wrong record number to be written in SHP record headers (record count in Shapefiles starts from `1`, not from `0`).


#### Suppress PHP Warnings in `fread()` and `fwrite()` calls
Who needs a PHP Warning when a `ShapefileException` is thrown anyways?


#### Fix bug causing a corrupted DBF file when a `Shapefile::ERR_GEOM_MISSING_FIELD` is raised
This one was tricky and it became very evident after file-append capabilities: a Shapefile record is actually spread across multiple files, so the library must make sure that no file gets corrupted when an exception is raised and the execution interrupted. Now all records already written will be successfully included in the output file (*unless something very nasty happens, like killing the process at OS level...*).


#### Fix corner case bug when no record has been written yet
If something goes wrong or you are intentionally trying to create an *empty* Shapefile without even specifying its type, this situation is now handled correctly, resulting in an empty Shapefile of type `Shapefile::TYPE_NULL`.



### Wait, what about a *reading buffer* in `ShapefileReader` class?
I tried to apply some buffering strategies to ShapefileReader, but it turned out it did not improve its performance and in some case it even worsened it.
That's because `ShapefileReader` class is able to randomly access the Shapefile by design (a great feature indeed) and the only viable solution was a kludgy *speculative buffer*, keeping in mind that there can be *garbage* (A.K.A. unused bytes) between one record and another.
The result brought some overhead that hardly compensated with a better throughput and the code was messy, so I ultimately decided to ditch it.
Giving some technical insight but cutting it short: PHP streams are complicated beasts and when reading a file resource the underlying OS and its filesystem already take care of many aspects regarding buffering and optimization. Better relying on them, because it is much easier to mess things up than improve them.


  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
