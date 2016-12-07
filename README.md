node-wkhtmltoimage
==================

A Node.js wrapper for the [wkhtmltoimage](http://wkhtmltopdf.org/) command line tool.  It converts HTML documents to images using WebKit.  This was originally based on [node-wkhtmltopdf](https://github.com/devongovett/node-wkhtmltopdf).

## Usage

```javascript
var wkhtmltoimage = require('wkhtmltoimage');

// Optionally specify binary path
var wkhtmltoimage = require('wkhtmltoimage').setCommand(__dirname + '/bin/wkhtmltoimage');

// URL
wkhtmltoimage.generate('http://example.com/', { pageSize: 'letter' })
  .pipe(fs.createWriteStream('out.jpg'));

// HTML
wkhtmltoimage.generate('<h1>Hello world</h1>')
  .pipe(res);

// output to a file directly
wkhtmltoimage.generate('http://example.com/', { output: 'out.jpg' });

// Optional callback
wkhtmltoimage.generate('http://example.com/', { pageSize: 'letter' }, function (code, signal) {
});
wkhtmltoimage.generate('http://example.com/', function (code, signal) {
});
```

`wkhtmltoimage` is just a function, which you call with either a URL or an inline HTML string, and it returns a stream that you can read from or pipe to wherever you like (e.g. a file, or an HTTP response).

There are [many options](http://wkhtmltopdf.org/usage/wkhtmltopdf.txt) available to wkhtmltoimage.  All of the command line options are supported as documented on the page linked to above.  The options are camelCased instead-of-dashed as in the command line tool.

There is also an `output` option that can be used to write the output directly to a filename, instead of returning a stream.

## Installation

First, you need to install the wkhtmltoimage (included with wkhtmltopdf) command line tool on your system.  The easiest way to do this is to [download](http://wkhtmltopdf.org/) a prebuilt version for your system.

Then install the node module, use `npm`:

    npm install wkhtmltoimage

Be sure `wkhtmltoimage` is in your PATH when you're done installing.  Alternatively, use .setCommand(path) to specify the binary path.

## License

MIT
