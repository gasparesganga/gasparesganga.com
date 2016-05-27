---
layout      : post
title       : PostGIS NormalizeGeometry release
description : It works, for real!
tags        : [PostGIS, PostgreSQL, PL/pgSQL]
---

Ok, this is a good one, I promise!


This is actually part of a more complex normalizing-framework I wrote for the [company](http://www.setinsnc.it) I work for.
Until now it has been considered one of our *trade secrets* and I'm glad I can release it for the public.


It has been tested and used in production with every single geometry in our geodatabases (*a lot* of geometries...) for a few years by now.
This means that if you find any problem with it, the cause could be either that I have accidentally broken something while stripping down the un-releasable parts *(let me know and I will fix it)* or that you are using some input geometries and/or parameters very different than our typical use cases *(in this case please provide me some example data and I will improve the function)*.


## Download and documentation

Go to the Lab page: [PostGIS NormalizeGeometry](/labs/postgis-normalize-geometry/)
