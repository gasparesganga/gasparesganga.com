---
layout      : lab
title       : PostGIS NormalizeGeometry
description : PL/pgSQL function to normalize geometries and remove spikes with PostGIS
updated     : 2016-05-27
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
The function decompose all the `POLYGON`s `MULTIPOLYGON`s and `MULTILINESTRING` into single `LINESTRING`s, then it iterates over all the points considering 3 at a time. When conditions depending on the input parameters are met, the point which produces the unwanted condition is removed.
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
Expressed in square `units`, depending on the geometry's *SRID*. For example, if the geometry's *SRID* is *UTM*, this value is assumed to be expressed in square meters.

##### `PAR_angle_threshold`
Expressed in `decimal degrees` *(half a degree is `0.5` and a round angle is `360`)*.

##### `PAR_point_distance_threshold`
Expressed in linear `units`, depending on the geometry's *SRID*. For example, if the geometry's SRID is UTM, this value is assumed to be expressed in meters.

##### `PAR_null_area`
Expressed in square `units`, the same as `PAR_area_threshold`.



## How normalization works
Considering 3 consecutive points <code>P<sub>n-1</sub></code>, <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code>, the point <code>P<sub>n</sub></code> will be removed in one of these cases:

#### Case 1 - Removing *spikes*
***Both*** the following conditions must be met:
- The area obtained connecting those points *(ie. the area of the triangle formed by <code>P<sub>n-1</sub></code>, <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code> points)* is equal or smaller than `PAR_area_threshold`.
- The angle in <code>P<sub>n</sub></code> is equal or smaller than `PAR_angle_threshold`, **OR** the distance between <code>P<sub>n-1</sub></code> and <code>P<sub>n</sub></code> is equal or smaller than `PAR_point_distance_threshold` and the angle in <code>P<sub>n+1</sub></code> is equal or smaller than `PAR_angle_threshold` **OR** the distance between <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code> is equal or smaller than `PAR_point_distance_threshold` and the angle in <code>P<sub>n-1</sub></code> is equal or smaller than `PAR_angle_threshold`

#### Case 2 - Removing point lying *almost* on the same straight line
The area obtained connecting those points *(ie. the area of the triangle formed by <code>P<sub>n-1</sub></code>, <code>P<sub>n</sub></code> and <code>P<sub>n+1</sub></code> points)* is equal or smaller than `PAR_null_area`.

### Some considerations and uses of `PAR_null_area` parameter
The value `0` for `PAR_null_area` means *exactly on the same straight line*, while providing any value greater than `0` the function can be used to *simplify* your geometries. Note that if you provide all-zero input parameters the function can be effectively used just to remove useless points lying on the same straight line. See [example999](#example-999---xxx-xxx-xxx) and [example999](#example-999---xxx-xxx-xxx).
If *(for any undisclosed reason)* you don't even want to remove the points lying on the same straight line, use a value **smaller** than `0` for `PAR_null_area` (ie. `-1`) and this feature will be disabled.



## Return value
The output of the function is a normalized **`geometry`** *(what else were you expecting?)*.
<u>It is very important to remeber that the output is wrapped by PostGIS [ST_Collect()](http://postgis.net/docs/ST_Collect.html).</u> This is because it's not guaranteed that after the normalization the geometry will be the same type as it was inputed. For example a `POLYGON` can become a `LINESTRING` and `MULTIPOLYGON` can become a `GEOMETRYCOLLECTION` consisting of a `POLYGON` and a `LINESTRING`.
While in some cases a `ST_Union()` would be more convenient, there are other cases where one would like to treat the single geometries separately *(ie. not necessarly dissolving multipolygon's boundaries, etc.)*.
The function intentionally uses `ST_Collect()`, leaving to the user the freedom to further operate on the normalized geometries.

#### What about the other geometry types?
`POINT`s and `MULTIPOINT`s are returned invariated: if a `MULTIPOINT` has more than one point with the same coordinates then it isn't a *valid* geometry, thus you need to make it valid, not normalize it.
`GEOMETRYCOLLECTION`s are also returned as they are inputed: this is because I never use `GEOMETRYCOLLECTION`s and I didn't bother about treating them. I'm going to release an upgrade which supports them, but for now it's on my todo list.



## Examples

ricordati di st_DUMPPPPPPPPPP
```sql
SELECT normalize_geometry(geom) FROM my_table
```

```sql
-- solo punti sulla retta
geometry normalize_geometry(0, 0, 0, 0);

-- semplificazione null_area maggiore di 0...

SELECT g.gid, CASE WHEN g.is_collection THEN ST_Multi(ST_Union(l.geom)) ELSE ST_Union(l.geom) END 
				FROM g, 
				LATERAL (SELECT (ST_Dump(cartografia__normalizza__geometria(g.geom, %5$L, %6$L, %7$L, %8$L))).geom) AS l 
				GROUP BY g.gid, g.is_collection 
esempio di poligono che diventano due, e che farne? un multipoligono o lasciarlo separato?
```

