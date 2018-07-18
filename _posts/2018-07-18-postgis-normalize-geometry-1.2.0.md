---
layout      : post
title       : PostGIS normalize_geometry 1.2.0
description : PostgreSQL 10 compatible
tags        : [Releases, PostGIS, PostgreSQL, PL/pgSQL]
---


Finally `normalize_geometry` is compatible with PostgreSQL 10, it was about time!

### What's new in Version 1.2.0
I got rid of those SRF (set-returning functions) appearing in a query's SELECT list (both `ST_Dump()` and `ST_DumpRings()` are used to decompose polygons and multipolygons)
It's been a little trickier than expected because of PL/pgSQL plan caching policy, which caused me some major headaches and finally led to a dynamic query execution as the only viable solution.
Don't worry, performances are even better than before thanks to some conditional `LEFT JOIN LATERAL`. That plan caching wasn't necessary at all.


## Download and documentation

Go to the Lab page: [PostGIS normalize_geometry](/labs/postgis-normalize-geometry/)
