---
layout      : post
title       : PostGIS normalize_geometry 1.1.0
description : array_remove() backport for older versions of PostgreSQL
tags        : [Releases, PostGIS, PostgreSQL, PL/pgSQL]
---


This release does not add any new functionalities to `normalize_geometry`, but it rather includes a *backports.sql*, providing some functions which might be missing in older version of PostgreSQL and are required by NormalizeGeometry, thus extending the compatibility of my library.


### What's new in Version 1.1.0
- Pure *SQL* backport for `array_remove()` function, missing in PostgreSQL 9.2 version and lower


## Download and documentation

Go to the Lab page: [PostGIS normalize_geometry](/labs/postgis-normalize-geometry/)
