
var dataRaw = document.getElementById('raw-data').getAttribute('data-data');
dataRaw = JSON.parse(dataRaw);
document.getElementById('raw-data').removeAttribute('data-data');

var dataTopThirty = dataRaw.slice(0, 30);

google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'description');
	data.addColumn('number', 'score');
	data.addRows(dataTopThirty);

	var options = {
		'title':'Top Objects in Sims Tumblr Posts',
		'width':960,
		'height':1000,
		'chartArea': {'width': '60%', 'height': '80%'}
	};

	var chart = new google.visualization.BarChart(document.getElementById('chart_main'));

	function selectHandler() {

		var seletedItem = chart.getSelection()[0];
		var endTime = new Date().getTime();
		endTime = Math.floor(endTime/1000);

		var description;

		if(seletedItem) {
			var index = seletedItem.row;

			description = data.hc[index][0].Cf;
			console.log(description);
		}
		
		var xhr = new XMLHttpRequest();

		xhr.open('POST', 'http://10.14.41.30:8081/api/labels/time', true);

		xhr.setRequestHeader('content-type', 'application/json; charset=utf-8')

		xhr.onload = function() {
			if(this.status == 200) {
				var data = parseJSONObject(JSON.parse(this.responseText));
				drawSubChart(description, data);
			}
		}

		xhr.onerror = function() {
			console.log("request error");
		}

		xhr.send(JSON.stringify({
			"start_time": endTime - 3600 *6,
			"end_time": endTime,
			"duration": 3600,
			"label": description
		}));
	}

	google.visualization.events.addListener(chart, 'select', selectHandler);
	
	chart.draw(data, options);
}

/* Draw sub chart
 *
 * @{String} description
 * @{Object} dataJSON
 */
function drawSubChart(description, dataJSON) {

	var data = new google.visualization.DataTable();
	data.addColumn('number', 'X');
	data.addColumn('number', description);
	// data.addColumn('number', 'grass');

	data.addRows(dataJSON);

	var options = {
		'title': description + ': Popularity Over Time',
		'width':960,
		hAxis: {
			title: 'Time (hours)'
		},
		vAxis: {
			title: 'Popularity'
		}
	};

	var chart = new google.visualization.LineChart(document.getElementById('chart_sub'));

	chart.draw(data, options);
}

/*
 * Parse JSON object to Gogle data rows
 */
var parseJSONObject = function(data) {

	var rows = [];
	var description = data.description,
		startTime = data.start_time,
		endTime = data.end_time,
		duration = data.duration,
		scores = data.scores.reverse();
	var i = 1;
	scores.forEach(function(s) {
		var row = [];
		row.push(i);
		row.push(s);
		rows.push(row);
		i++;
	})

	return rows;
}
