var spawn = require('child_process').spawn;

function WKHtmlToImage() {
	this.command = 'wkhtmltoimage';

	this.setCommand = function(path) {
		this.command = path;
		return this;
	}

	this.generate = function(input, options, callback) {
		var options = options || {};
		if (typeof options == 'function') {
			callback = options;
			options = {};
		}
		
		var output = options.output;
		delete options.output;
		
		var args = [this.command, '--quiet'];
		for (var key in options) {
			var val = options[key];
			key = key.length === 1 ? '-' + key : '--' + key.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
			
			if (val !== false)
				args.push(key);
				
			if (typeof val !== 'boolean') {
				// escape and quote the value if it is a string
				if (typeof val === 'string')
					val = '"' + val.replace(/(["\\$`])/g, '\\$1') + '"';
					
				args.push(val);
			}
		}
		
		var isUrl = /^(https?|file):\/\//.test(input);
		args.push(isUrl ? '"' + input + '"' : '-'); // stdin if HTML given directly
		args.push(output || '-');       // stdout if no output file

		if (process.platform === 'win32') {
			var child = spawn(args[0], args.slice(1));
		} else {
			// this nasty business prevents piping problems on linux
			var child = spawn('/bin/sh', ['-c', args.join(' ')]);
		}

		if (callback) {
			child.on('exit', callback);
		}

		if (!isUrl) {
			child.stdin.end(input);
		}
		
		// return stdout stream so we can pipe
		return child.stdout;
	}
}

module.exports = new WKHtmlToImage();