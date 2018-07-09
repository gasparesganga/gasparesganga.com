---
layout      : lab
title       : PostGIS NormalizeGeometry
description : PL/pgSQL function to remove spikes and simplify geometries with PostGIS
updated     : 2016-12-06
getit       :
  github        : gasparesganga/postgis-normalize-geometry
  download      : true
---


## Contents
- [Get it](#get-it)
- [Background](#background)
- [Synopsis](#synopsis)
- [Input parameters](#input-parameters)
- [How normalization works](#how-normalization-works)
- [Return value](#return-value)
- [Examples](#examples)
- [History](#history)
- [Comments and Ideas](#comments-and-ideas)


## Get it
{% include getit.html %}


## Background
The initial proof-of-concept about checking the angles between adjacent points was provided by the well-known **Andreas Schmidt** & **Nils Krüger**'s function [Spike-Remover](https://trac.osgeo.org/postgis/wiki/UsersWikiExamplesSpikeRemover) *(kudos to them)*.
But I felt that wasn't enough for a generic purpose normalizing function. It produced some *false positives* and failed to detect many other cases which ultimately made it unusable for me.
I wrote a brand-new algorithm integrating the angle checks with area and points distance ones, building a production-ready function that can be safely used in automated queries.

### What it does
The function decomposes all `POLYGON`, `MULTIPOLYGON` and `MULTILINESTRING` into single `LINESTRING`, then it iterates over all the points considering 3 at a time. When conditions depending on the input parameters are met, the point which produces the unwanted condition is removed.
This effectively removes **spikes** and **points lying on the same straight line**, producing normalized geometries.


## Synopsis

```sql
geometry normalize_geometry(
    PAR_geom                        geometry,
    PAR_area_threshold              double precision,
    PAR_angle_threshold             double precision,
    PAR_point_distance_threshold    double precision,
    PAR_null_area                   double precision,
    PAR_union                       boolean DEFAULT true
);
```



## Input parameters

##### `PAR_geom`
That's the input geometry. It can be any PostGIS geometry type, but the function will actually do something only on `POLYGON`, `MULTIPOLYGON`, `LINESTRING` and `MULTILINESTRING` types.

##### `PAR_area_threshold`
Expressed in square `units`, depending on the geometry *SRID*. For example, if the geometry *SRID* is an *UTM* one, this value is assumed to be expressed in square meters.

##### `PAR_angle_threshold`
Expressed in `decimal degrees` *(half a degree is `0.5` and a round angle is `360`)*.

##### `PAR_point_distance_threshold`
Expressed in linear `units`, depending on the geometry *SRID*. For example, if the geometry *SRID* is an *UTM* one, this value is assumed to be expressed in meters.

##### `PAR_null_area`
Expressed in square `units`, the same as `PAR_area_threshold`.

##### `PAR_union`
Set this parameter to `false` if you whish to recollect single parts of multigeometries using `ST_Collect()` instead of `ST_Union()`. More on that [here](#return-value).


#### What about the other geometry types?
`POINT` and `MULTIPOINT` are returned unchanged: a `POINT` is as simple as it gets, while a `MULTIPOINT` cannot have a *spike* by definition and if it has more than one point with the same coordinates then it isn't a *valid* geometry, thus you need to make it valid, not normalize it.
`GEOMETRYCOLLECTION` are also returned unchanged: this is because I never use `GEOMETRYCOLLECTION` and I didn't bother about treating them. Actually, to me it doesn't sound like a brilliant idea to work and normalize directly a `GEOMETRYCOLLECTION`, as too many *unexpected results* may appear. Maybe I will spend some time thinking about it in the future.



## How normalization works

The function analyzes all the adjacent points in the input geometry in groups of three.
Now imagine a triangle is drawn connecting those three points. The **central** point of a group is removed in one of the following cases:

1. The area of the triangle is smaller than `PAR_area_threshold` and the angle corresponding to the central point is smaller than `PAR_angle_threshold`.
2. The area of the triangle is smaller than `PAR_area_threshold` and the angle corresponding to the first or the last point is smaller than `PAR_angle_threshold` while the distance between the other two points is smaller than `PAR_point_distance_threshold`.
3. The area of the triangle is smaller than `PAR_null_area`, regardless of the angles.


### A more *technical* explaination
Considering 3 adjacent points <code>P<sub>n-1</sub></code>, <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code>, the point <b><code>P<sub>n</sub></code></b> will be removed in one of these cases:

#### Case 1 - Removing *spikes*
***Both*** the following conditions must be met:

* The area obtained connecting those points *(ie. the area of the triangle formed by <code>P<sub>n-1</sub></code>, <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code> points)* is equal or smaller than `PAR_area_threshold`.
* The angle in <code>P<sub>n</sub></code> is equal or smaller than `PAR_angle_threshold` 
  **OR**
  the distance between <code>P<sub>n-1</sub></code> and <code>P<sub>n</sub></code> is equal or smaller than `PAR_point_distance_threshold` and the angle in <code>P<sub>n+1</sub></code> is equal or smaller than `PAR_angle_threshold`
  **OR**
  the distance between <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code> is equal or smaller than `PAR_point_distance_threshold` and the angle in <code>P<sub>n-1</sub></code> is equal or smaller than `PAR_angle_threshold`.

#### Case 2 - Removing point lying *almost* on the same straight line
The area obtained connecting those points *(ie. the area of the triangle formed by <code>P<sub>n-1</sub></code>, <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code> points)* is equal or smaller than `PAR_null_area`.

### Some considerations and uses of `PAR_null_area` parameter
Leaving the parameters `PAR_area_threshold`, `PAR_angle_threshold` and `PAR_point_distance_threshold` set to `0` and using only the last parameter `PAR_null_area`, some interesting results can be obtained: the specific value `0` for `PAR_null_area` will remove all the useless points lying *exactly* on the same straight line, while providing any value greater than `0` for `PAR_null_area` the function can effectively be used to *simplify* your geometries. See [Example 3](#example-3---use-the-function-to-simplify-geometries).
If *(for any undisclosed reason)* you don't even want to remove the points lying on the same straight line, use a value **smaller** than `0` for `PAR_null_area` (ie. `-1`) and this feature will be disabled.

It is implicit that every polygon or inner ring of polygons whose area is smaller than `PAR_null_area` will be entirely removed.



## Return value
The output of the function is a normalized **`geometry`** *(what else did you expect?)*. In case a geometry is entirely removed *(less than 3 points are left for a polygon, less than 2 points are left for a linestring, a polygon's area is smaller than `PAR_null_area`)* `NULL` will be returned.

By default, the output is wrapped by PostGIS function [ST_Union()](http://postgis.net/docs/ST_Union.html) which is used to recollect the single parts of `MULTI*` geometries given in input *(remember that input geometries are decomposed into single `LINESTRING` to perform the normalization)*.
While this should usually be convenient, there might be other cases where one would like to treat the single parts of multigeometries separately *(ie. not necessarly dissolving multipolygon's boundaries, etc.)*. Then just set `PAR_union` to `false` and [ST_Collect()](http://postgis.net/docs/ST_Collect.html) will be used instead of `ST_Union()`. A `ST_Dump` will then provide all the single parts. See [Example 2](#example-2---filter-single-parts-of-multigeometries).


    
## Examples

### Example 1 - Basic usage
Those parameters are the ones I use most of the times:

```sql
SELECT normalize_geometry(t.geom, 0.5, 0.5, 0.005, 0.0001) FROM my_table;
```

Those will successfully normalize geometries like:

```sql
LINESTRING(0 0, 2 2, 0 4, -5 4, 0 4.001, 2 6)
POLYGON((0 0, 1 1, 2 1, 3 0.5, 2 -3, 3 0.499, 0 0))
```
<img src="{% asset postgis-normalize-geometry/_assets/example1a.png @path %}" alt="example1a" style="width:100%; max-width:800px;">

into:

```sql
LINESTRING(0 0, 2 2, 0 4, 2 6)
POLYGON((0 0, 1 1, 2 1, 3 0.5, 0 0))
```
<img src="{% asset postgis-normalize-geometry/_assets/example1b.png @path %}" alt="example1b" style="width:100%; max-width:800px;">


### Example 2 - Filter single parts of multigeometries
Setting the parameter `PAR_union` to `false`, the output will be recollected with `ST_Collect()`, so a `ST_Dump()` can be used to obtain the single parts of multigeometries:

```sql
SELECT (ST_Dump(normalize_geometry(geom, 0.5, 0.5, 0.005, 0.0001, false))).geom FROM my_table;
```

If you are on PostgreSQL **9.3+**, here is what your average query would look like, taking advantage of `LATERAL` and including some filtering condition:

```sql
SELECT l.geom [, other-fields] 
FROM my_table AS t, 
LATERAL (SELECT (ST_Dump(normalize_geometry(t.geom, 0.5, 0.5, 0.005, 0.0001, false))).geom) AS l 
WHERE [some-condition];
```

If you are on an older version of PostgreSQL, a subquery will do:

```sql
SELECT * FROM ( 
    SELECT (ST_Dump(normalize_geometry(geom, 0.5, 0.5, 0.005, 0.0001, false))).geom [, other-fields] 
    FROM my_table 
) AS subq 
WHERE [some-condition];
```


### Example 3 - Use the function to simplify geometries
Both [ST_Simplify()](http://postgis.net/docs/ST_Simplify.html) and [ST_SimplifyPreserveTopology()](http://postgis.net/docs/ST_SimplifyPreserveTopology.html) use the *Douglas-Peucker algorithm*. Who does really (I mean, *FOR REAL!*) know how the `tolerance` parameter works and is able use it in a predictable way? Personally, I've had some disastrous results with them.
Using `normalize_geometry` with all *threshold* parameters set to `0` and focusing on `PAR_null_area`, we have a pretty powerful geometry-simplifying function, try it!

```sql
-- Remove only points lying on the same straight line
SELECT geometry normalize_geometry(geom, 0, 0, 0, 0) FROM my_table;

-- A higher PAR_null_area value will simplify the geometry removing more points
SELECT 
    normalize_geometry(geom, 0, 0, 0, 0)    AS geom_A,  
    normalize_geometry(geom, 0, 0, 0, 0.2)  AS geom_B,  
    normalize_geometry(geom, 0, 0, 0, 0.5)  AS geom_C,  
    normalize_geometry(geom, 0, 0, 0, 1)    AS geom_D,  
    normalize_geometry(geom, 0, 0, 0, 3)    AS geom_E  
FROM (
    SELECT ST_Buffer('POINT(0 0)', 10, 12) AS geom
) AS s;
```

<img src="{% asset postgis-normalize-geometry/_assets/example3.png @path %}" alt="example3" style="width:100%; max-width:1000px;">


## History
*6 Dicember 2016* - [Version 1.1.0](/posts/postgis-normalize-geometry-1.1.0/)
*2 June 2016* - [Version 1.0](/posts/postgis-normalize-geometry-release/)
