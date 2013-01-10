var fs = require('fs'),
	path = require('path'),
	handlebars = require('handlebars'),
	UglifyJS = require('uglify-js');

function Precompiler(opts){
	this.setOptions(opts);
	this.precompile();
}

Precompiler.prototype = {
	precompile: function(){
		var opts = this.opts,
			templatesDir = opts.in,
			outputFile = opts.out,
			minify = opts.minify,
			output = '(function() {\n  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};\n';

		var files = this.getTemplateFilesIn(templatesDir);

		for(var i in files){
			var file = files[i],
				fileName = path.basename(file),
				templateName = fileName.substring(0,fileName.indexOf('.'));

			var precompiled = this.precompileTemplateFile(file);
			output += 'templates[\'' + templateName + '\'] = template(' + precompiled + ');\n';
		}

		output += '})();';

		if (minify) {
			var minified = UglifyJS.minify(output, {
				fromString: true
			});
			output = minified.code;
		}

		fs.writeFileSync(outputFile, output, 'utf8');
	},
	precompileTemplateFile: function(file){
		var data = fs.readFileSync(file, 'utf8');
		return handlebars.precompile(data);
	},
	setOptions: function(opts){
		var defaultOptions = {
			minify: true
		};

		for(var i in defaultOptions){
			if(!opts.hasOwnProperty(i)){
				opts[i] = defaultOptions[i];
			}
		}

		if(!opts['in']){
			throw 'Must provide a directory to scout';
		}else if(!opts['out']){
			throw 'Must provide an output file';
		}

		this.opts = opts;
	},
	getTemplateFilesIn: function(dir){
		var hbsExt = ['.hbs','.handlebars'],
			files = [];

		this.walkDir(dir, function(file){
			if(hbsExt.indexOf(path.extname(file)) !== -1)
			files.push(file);
		});

		return files;
	},
	walkDir: function(dir, callback){
		var self = this;

		fs.readdirSync(dir).map(function(obj){
			var fullPath = dir + '/' + obj,
				stat = fs.statSync(fullPath);

			if(stat.isDirectory()){
				self.walkDir(fullPath, callback);
			}else if(stat.isFile()){
				callback(fullPath);
			}
		});
	}
};

module.exports = Precompiler;