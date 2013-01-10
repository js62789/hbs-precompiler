var hbsPrecompiler = require('../app.js');


var compiler = new hbsPrecompiler({
	in: './templates',
	out: './output.js'
});