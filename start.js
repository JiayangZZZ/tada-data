
var express = require('express');
var app = express();
var d3 = require('d3');
var request = require('request');

var json = require('./JSON/post-labels.json');

app.use(express.static(__dirname + '/Views'));
app.use('/Scripts', express.static('Scripts'));
app.use('/JSON', express.static('JSON'));

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
 * Request trending tags
 */
request.post({
	headers: {'content-type' : 'application/json; charset=utf-8'},
	url: 'http://10.14.41.30:8081/api/labels/top',
	json: true,
	body: {
		"start_time": 1505258232,
		"end_time": 1505517432
	}
}, function(err, res, body) {
	// console.log(body);
})

/*
 * Express app
 */
app.listen(3000, function() {
	console.log("Tada listening on port 3000...");
})