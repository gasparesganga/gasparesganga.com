---
layout      : lab
title       : jQuery FormatNumber
description : jQuery Plugin to output numbers as formatted strings
updated     : 2015-01-18
css         : []
js          : []
download    : jquery-format-number/archive/master.zip
source      : jquery-format-number
---

### *$.FormatNumber (number, options)*
Returns a string containig the `number` formatted according to the given `options`.

#### Options and defaults values
```javascript
decimalDigits      : "auto"    // Integer or "auto"
decimalSeparator   : "."       // String
prefix             : ""        // String
suffix             : ""        // String
thousandSeparator  : " "       // String
```


### *$.FormatNumberSetup (options)*
Set default `options` for all future calls to `$.FormatNumber`



## Examples

##### Euro
```javascript
console.log($.FormatNumber(12345.1, {
    decimalDigits     : 2,
    decimalSeparator  : ",",
    prefix            : "",
    suffix            : " €",
    thousandSeparator : "."
}));
// Output: 12.345,10 €*
```

##### Area
```javascript
console.log($.FormatNumber(12345.123, {
    decimalDigits     : 0,
    decimalSeparator  : ",",
    prefix            : "",
    suffix            : " m²",
    thousandSeparator : "."
}));
// Output: 12.345 m²
```

##### Set Defaults
```javascript
$.FormatNumberSetup({
    decimalDigits     : "auto",
    decimalSeparator  : ".",
    prefix            : "",
    suffix            : "",
    thousandSeparator : " "
});
// Default output: 123 456.7890
```
