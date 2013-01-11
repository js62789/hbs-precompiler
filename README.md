hbs-precompiler
===============
The hbs-precompiler manages handlebars templates for web sites that serve pages via ExpressJS. Hbs-precompiler precompiles handlebars templates into a single javascript file when express runs and continues to watch the template files for changes. When a template is changed, the templates are re-pre-compiled.

``` javascript
var Precompiler = require('hbs-precompiler');

var hbsPrecompiler = new Precompiler({
  in: '/path/with/templates',
  out: '/path/to/output.js',
  minify: true,
  watch: true
}).precompile();
```
