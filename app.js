
// Modules
var gzippo    = require('gzippo');
var express   = require('express');
var morgan    = require('morgan');
var app       = express();

// Config
var port = process.env.PORT || 5000;

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(port);
