hbs-precompiler
===============
The hbs-precompiler precompiles handlebars templates into a single javascript file when express runs.

``` javascript
var hbsPrecompiler = require('hbs-precompiler');

app.use(hbsPrecompiler({ 
  in: '/path/with/templates', 
  out: '/path/to/output.js',
  uglify: true
}));
```
