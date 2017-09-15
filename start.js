
var express = require('express');
var app = express();
var d3 = require('d3');

var json = require('./JSON/post-labels.json');

app.use(express.static(__dirname + '/Views'));
app.use('/Scripts', express.static('Scripts'));

var startTime = 1505420041
	, endTime = 1505424001;

var databaseUrl = "http://10.14.41.30:8081/label/";

/*
 * Route
 */
app.get('/', function (req, res) {
	res.sendFile('index.html');
})

/*
 * Express app
 */
app.listen(3000, function() {
	console.log("Tada listening on port 3000...");
})