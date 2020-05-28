---
layout      : post
title       : PostGIS normalize_geometry 1.2.1
description : Fixed multipolygons handling
tags        : [Releases, PostGIS, PostgreSQL, PL/pgSQL]
---


A bugfix after almost 2 years since when a bug was introduced with the last minor release sounds close to unbelievable, yet it went unnoticed for all this time.
Luckily, thanks to a user's reporting, I found it. It was about time!


### What has been fixed in Version 1.2.1
- Multipolygons handling and *recomposition*. The function was producing some invalid geometries (i.e.: mixing up multipolygons outer and inner rings).


## Download and documentation

Go to the Lab page: [PostGIS normalize_geometry](/labs/postgis-normalize-geometry/)
