hbs-precompiler
===============
The hbs-precompiler precompiles handlebars templates into a single javascript file when express runs.

``` javascript
var Precompiler = require('hbs-precompiler');

var hbsPrecompiler = new Precompiler({
  in: '/path/with/templates',
  out: '/path/to/output.js',
  minify: true,
  watch: true
}).precompile();
```
