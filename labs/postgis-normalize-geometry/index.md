---
layout      : lab
title       : PostGIS NormalizeGeometry
description : PL/pgSQL function to normalize geometries and remove spikes with PostGIS
updated     : 2016-05-28
css         : []
js          : []
download    : postgis-normalize-geometry/archive/v1.0.zip
source      : postgis-normalize-geometry
---

## Background
The initial proof-of-concept about checking the angles between adjacent points was provided by the well-known **Andreas Schmidt** & **Nils Krüger**'s function [Spike-Remover](https://trac.osgeo.org/postgis/wiki/UsersWikiExamplesSpikeRemover) *(kudos to them)*.
But I felt that wasn't enough for a generic purpose normalizing function. It produced some *false positives* and failed to detect many other cases which ultimately made it unusable for me.
I wrote a brand-new algorithm integrating the angle checks with area and points distance ones, building a production-ready function that can be safely used in automated queries.

### What it does
The function decompose all the `POLYGON`, `MULTIPOLYGON` and `MULTILINESTRING` into single `LINESTRING`, then it iterates over all the points considering 3 at a time. When conditions depending on the input parameters are met, the point which produces the unwanted condition is removed.
This effectively removes **spikes** and **points lying on the same straight line**, producing normalized geometries.



## Synopsis

```sql
geometry normalize_geometry(
    PAR_geom                        geometry,
    PAR_area_threshold              double precision,
    PAR_angle_threshold             double precision,
    PAR_point_distance_threshold    double precision,
    PAR_null_area                   double precision
);
```



## Input parameters

##### `PAR_geom`
That's the input geometry. It can be any PostGIS geometry type.

##### `PAR_area_threshold`
Expressed in square `units`, depending on the geometry *SRID*. For example, if the geometry *SRID* is an *UTM* one, this value is assumed to be expressed in square meters.

##### `PAR_angle_threshold`
Expressed in `decimal degrees` *(half a degree is `0.5` and a round angle is `360`)*.

##### `PAR_point_distance_threshold`
Expressed in linear `units`, depending on the geometry *SRID*. For example, if the geometry *SRID* is an *UTM* one, this value is assumed to be expressed in meters.

##### `PAR_null_area`
Expressed in square `units`, the same as `PAR_area_threshold`.



## How normalization works
Considering 3 adjacent points <code>P<sub>n-1</sub></code>, <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code>, the point <b><code>P<sub>n</sub></code></b> will be removed in one of these cases:

#### Case 1 - Removing *spikes*
***Both*** the following conditions must be met:

* The area obtained connecting those points *(ie. the area of the triangle formed by <code>P<sub>n-1</sub></code>, <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code> points)* is equal or smaller than `PAR_area_threshold`.
* The angle in <code>P<sub>n</sub></code> is equal or smaller than `PAR_angle_threshold` 
  **OR** the distance between <code>P<sub>n-1</sub></code> and <code>P<sub>n</sub></code> is equal or smaller than `PAR_point_distance_threshold` and the angle in <code>P<sub>n+1</sub></code> is equal or smaller than `PAR_angle_threshold`
  **OR** the distance between <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code> is equal or smaller than `PAR_point_distance_threshold` and the angle in <code>P<sub>n-1</sub></code> is equal or smaller than `PAR_angle_threshold`

#### Case 2 - Removing point lying *almost* on the same straight line
The area obtained connecting those points *(ie. the area of the triangle formed by <code>P<sub>n-1</sub></code>, <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code> points)* is equal or smaller than `PAR_null_area`.

### Some considerations and uses of `PAR_null_area` parameter
The value `0` for `PAR_null_area` means *exactly on the same straight line*, while providing any value greater than `0` the function can be used to *simplify* your geometries. Note that if you provide all-zero input parameters the function can be effectively used just to remove useless points lying on the same straight line. See [example3](#example-3---use-the-function-to-simplify-the-geometries).
If *(for any undisclosed reason)* you don't even want to remove the points lying on the same straight line, use a value **smaller** than `0` for `PAR_null_area` (ie. `-1`) and this feature will be disabled.



## Return value
The output of the function is a normalized **`geometry`** *(what else were you expecting?)*.
<u>It is very important to remeber that the output is wrapped by PostGIS <a href="http://postgis.net/docs/ST_Collect.html">ST_Collect()</a>.</u> This is because it's not guaranteed that after the normalization the geometry will be the same type as it was inputed. For example a `POLYGON` can become a `LINESTRING` and `MULTIPOLYGON` can become a `GEOMETRYCOLLECTION` consisting of a `POLYGON` and a `LINESTRING`.
While in some cases a `ST_Union()` would be more convenient, there are other cases where one would like to treat the single geometries separately *(ie. not necessarly dissolving multipolygon's boundaries, etc.)*.
The function intentionally uses `ST_Collect()`, leaving to the user the freedom to further operate on the normalized geometries.

### But this `ST_Collect()` is annoying, I'd rather prefer `ST_Union()`...
I strongly reccomend that you ***not*** do that and instead handle the normalized geometries according to your use case *(eg. you are working on a polygon table, so you want to filter only `POLYGON` and `MULTIPOLYGON`, leaving out the rest)*, but if you want to perform a [ST_Union](http://postgis.net/docs/ST_Union.html) on the normalized geometry and don't want to deal with nested `ST_Dump()`/subqueries/`LATERAL` stuff *(maybe you want to perform a straightforward `UPDATE`)*, then you can use this wrapper function:
```sql
CREATE OR REPLACE FUNCTION normalize_geometry_union(
    PAR_geom                        geometry, 
    PAR_area_threshold              double precision, 
    PAR_angle_threshold             double precision, 
    PAR_point_distance_threshold    double precision, 
    PAR_null_area                   double precision 
) RETURNS geometry AS $$
    SELECT ST_Union(geom) FROM (SELECT (ST_Dump(normalize_geometry(PAR_geom, PAR_area_threshold, PAR_angle_threshold, PAR_point_distance_threshold, PAR_null_area))).geom) d;
$$ LANGUAGE sql;
```

#### What about the other geometry types?
`POINT` and `MULTIPOINT` are returned invariated: if a `MULTIPOINT` has more than one point with the same coordinates then it isn't a *valid* geometry, thus you need to make it valid, not normalize it.
`GEOMETRYCOLLECTION` are also returned as they are inputed: this is because I never use `GEOMETRYCOLLECTION` and I didn't bother about treating them. I'm going to release an upgrade which supports them, but for now it's on my todo list.


    
## Examples

### Example 1 - Basic usage
Those parameters are the ones I use most of the times
```sql
SELECT normalize_geometry(t.geom, 0.5, 0.5, 0.005, 0.0001) FROM my_table;
```


### Example 2 - A more useful real-life case
Remember that `normalize_geometry` output is coming from `ST_Collect()`, so a `ST_Dump()` is a good idea to start with:
```sql
SELECT id, (ST_Dump(normalize_geometry(t.geom, 0.5, 0.5, 0.005, 0.0001))).geom FROM my_table;
```

If you are on PostgreSQL 9.3+, here is what your average query would look like, taking advantage of `LATERAL`:
```sql
SELECT t.id, ST_Union(l.geom) AS geom 
FROM my_table AS t, 
LATERAL (SELECT (ST_Dump(normalize_geometry(t.geom, 0.5, 0.5, 0.005, 0.0001))).geom) AS l 
GROUP BY t.id 
```

If you are on an older version of PostgreSQL, a subquery will do:
```sql
SELECT id, ST_Union(geom) AS geom 
FROM (
    SELECT id, (ST_Dump(normalize_geometry(geom, 0.5, 0.5, 0.005, 0.0001))).geom 
    FROM my_table 
) AS subq 
GROUP BY id;
```

You most likely want to filter the geometries somehow, let's assume you only want Polygons/Multipolygons discarding all the *leftovers*:
```sql
SELECT t.id, ST_Union(l.geom) AS geom 
FROM my_table AS t, 
LATERAL (SELECT (ST_Dump(normalize_geometry(t.geom, 0.5, 0.5, 0.005, 0.0001))).geom) AS l 
WHERE ST_GeometryType(l.geom) = 'ST_Polygon' 
GROUP BY t.id 
```


### Example 3 - Use the function to simplify the geometries
Both [ST_Simplify()](http://postgis.net/docs/ST_Simplify.html) and [ST_SimplifyPreserveTopology()](http://postgis.net/docs/ST_SimplifyPreserveTopology.html) use the *Douglas-Peucker algorithm*. Who does really (I mean, *REALLY*) know how the `tolerance` parameter work and can use it in a predictable way?
Using `normalize_geometry` with the first three parameters set to `0` and focusing on `PAR_null_area`, we have a pretty nice simplifying function, try it!
```sql
-- Remove only points lying on the same straight line
SELECT geometry normalize_geometry(geom, 0, 0, 0, 0) FROM my_table;

-- A more "aggressive" PAR_null_area setting will simplify the geometry removing more points
SELECT geometry normalize_geometry(geom, 0, 0, 0, 0.01) FROM my_table;
```

--- qui un'immagine con originale, 0 e altri 2 settaggi sarebbe buona!
