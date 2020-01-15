---
layout      : post
title       : PHP ShapeFile 2.4.2
description : Fixed orientation of inner and outer rings in GeoJSON output
tags        : [Releases, PHP, ESRI, Shapefile, GIS]
---


### What's new in Version 2.4.2
- Reversed the orientation of inner and outer rings in GeoJSON output of Polygons and MultiPolygons


#### Reversed the orientation of inner and outer rings in GeoJSON output of Polygons and MultiPolygons
Thanks to a GitHub [ticket](https://github.com/gasparesganga/php-shapefile/issues/13) I noted [section 3.1.6 of RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.6) states:
> A linear ring MUST follow the right-hand rule with respect to the
  area it bounds, i.e., exterior rings are counterclockwise, and
  holes are clockwise.

This creates a conflict with the ESRI Shapefile format, which stores inner and outer rings with opposite orientation.
I won't digress here into the advisability of such a choice for the which goes against well-established *de facto standards* without a real reason to do so. If you really want to know my opinion, please read [my answer to that ticket](https://github.com/gasparesganga/php-shapefile/issues/13#issuecomment-349577163).

Long story short, PHP ShapeFile will silently reverse the orientation of the points **only in GeoJSON output**, so it is now compliant *(I hope...)* to RFC 7946, hurray!

  
## Download and documentation

Go to the Lab page: [PHP ShapeFile](/labs/php-shapefile/)
