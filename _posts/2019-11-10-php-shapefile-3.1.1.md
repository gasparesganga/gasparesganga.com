---
layout      : post
title       : PHP Shapefile 3.1.1
description : A couple of trivial bugfixes
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


A couple of trivial bugfixes, tracked down by a super alert user (thanks again Pablo!).


### What has been fixed in Version 3.1.1
- Truncate *PRJ* and *CPG* files before writing them to prevent content to be appended
- Increased maximum number of fields in *DBF* files to 255


#### Truncate *PRJ* and *CPG* files before writing them to prevent content to be appended
That was resulting in corrupted *PRJ* and *CPG* files when `Shapefile::OPTION_EXISTING_FILES_MODE` was set to `Shapefile::MODE_APPEND`

#### Increased maximum number of fields in *DBF* files to 255
I had set the previous 128 limit according to original dBaseIII specs, but 255 is the actual limit enforced by virtually every modern GIS software/library.


  
## Download and documentation

Go to the Lab page: [PHP Shapefile](/labs/php-shapefile/)
