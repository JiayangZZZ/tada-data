
var express = require('express');
var app = express();
var request = require('request');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

var json = require('./JSON/post-labels.json');

app.use(express.static(__dirname + '/Views'));
app.set('views', path.join(__dirname, '/Views'));
app.use('/Scripts', express.static('Scripts'));
app.use('/JSON', express.static('JSON'));
app.use('/Styles', express.static('Styles'));

app.set('view engine', 'pug');

/*
 * Route
 */
app.get('/', function (req, res) {
	res.sendFile('index.html');
})


var data = new EventEmitter();

app.get('/data', function (req, res) {

	var endTime = new Date().getTime();
	endTime = Math.floor(endTime/1000);

	var primaryJSON,
		secondaryJSON = [],
		secondaryChartLegend = [];

	request.post({
		headers: {'content-type' : 'application/json; charset=utf-8'},
		url: 'http://10.14.41.20:8081/api/labels/top',
		json: true,
		body: {
			"start_time": endTime-3600*100,
			"end_time": endTime
		}
	}, function(err, r, body) {
		if(err) {
			console.log(err)
		}
		else {
			primaryJSON = body.slice(0, 20);
			var requestCount = 20;

			primaryJSON.forEach(function(e) {
				request.post({
					headers: {'content-type' : 'application/json; charset=utf-8'},
					url: 'http://10.14.41.20:8081/api/labels/time',
					json: true,
					body: {
						"start_time": endTime-3600*24,
						"end_time": endTime,
						"duration": 3600,
						"label": e.description
					}
				}, function(err, r, body) {
					if(err) {
						console.log(err);
					}

					secondaryChartLegend.push(body.description);

					var object = {
						'description' : body.description,
						'scores' : body.scores,
						'image' : body.images[0]
					}
					secondaryJSON.push(object);
					requestCount --;

					if(requestCount <= 0) {
						
						primaryJSON = attachImage(primaryJSON, secondaryJSON);
						var secondaryScores = secondaryJSON.map(function(obj) {
							return obj.scores.reverse();
						});
						
						res.render('index', {
							title: 'Tada data',
							message: 'Tada Active Database Analysis',
							data: parsePrimaryJSON(primaryJSON),
							data2: constructRows(secondaryScores),
							lineChartLengend: secondaryChartLegend
						})
					}
				})
			});
		}
	})
})

/*
 * Express app
 */
app.listen(process.env.PORT || 8081, function(){
	console.log("Tada server listening on port %d in %s mode", this.address().port, app.settings.env);
});

/*
 * Parse primary JSON
 */
var parsePrimaryJSON = function(data) {

	var rows = [];
	data.forEach(function(d) {
		var row = [];
		row.push(d.description);
		row.push(d.score);
		row.push(createCustomTooltip(d.description, d.image));
		rows.push(row);
	})

	return rows;
}

/**
 * Parse secondary data
 * @data Array
 */
var parseSecondaryData = function(scores) {
	var rows = [];
	var i = 1;
	scores = scores.reverse();
	scores.forEach(function(s) {
		var row = [];
		row.push(i);
		row.push(s);
		rows.push(row);
		i++
	})

	return rows;
}

/**
 * Attach image to primary chart data
 *
 */
var attachImage = function(receiver, sender) {
	receiver.forEach(function(receiverObj) {
		var senderObj = sender.filter(function(obj) {
			return obj.description == receiverObj.description;
		})[0];
		receiverObj.image = senderObj.image;
	})

	return receiver;
}

/**
 * Create custom tooltip for Google charts
 *
 */
function createCustomTooltip(description, imgSrc) {
	return '<div style="padding:5px 5px 5px 5px;">' + '<img src="' + imgSrc + '" style="width:200px;height:auto"></div>';
}

/**
 * Construct sub chart data
 */
function constructRows(array) {
	var newArray = array[0].map(function(col, i) {

		var ROW = array.map(function(row) {
			return row[i];
		})
		ROW.unshift(i);
		return ROW;
	})
	return newArray;
	// var rows = [];
	// for(var i = 0; i < array.length; i++) {
	// 	var row = [];

	// 	row.push(i);
	// 	array.forEach(function(e) {
	// 		row.push(e.scores[i])
	// 	});
	// 	rows.push(row);
	// }
	
	// return rows;
}