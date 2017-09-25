
// Loads google packages
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

// Set up data for main chart
var primaryData = JSON.parse(document.getElementById('raw-data').getAttribute('data-data'));
// primaryData = primaryData.slice(0,30);
document.getElementById('raw-data').removeAttribute('data-data');

// Set up data for tooltips
var secondaryData = JSON.parse(document.getElementById('raw-data').getAttribute('data-sub'));
document.getElementById('raw-data').removeAttribute('data-data');

//Draw chart
function drawChart() {
	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn('string', 'description');
	dataTable.addColumn('number', 'score');
	dataTable.addColumn({
		'type' : 'string',
		'role' : 'tooltip',
		'p' : {'html' : true}
	});

	dataTable.addRows(primaryData);

	var options = {
		title : 'Top objects in Sims Tumblr posts',
		width : 960,
		height : 1000,
		chartArea : {
			'width' : '60%',
			'height' : '80%'
		},
		focusTarget: 'category',
		tooltip : {isHtml : true}
	};

	var chart = new google.visualization.BarChart(document.getElementById('chart_main'));

	chart.draw(dataTable, options);
	drawSecondaryChart();
}

function drawSecondaryChart() {
	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn('number', 'time');
	for(var i = 0; i < primaryData.length; i++) {
		dataTable.addColumn('number', primaryData[i][0]);
	}

	dataTable.addRows(secondaryData);

	var options = {
		title : 'Top objects in Sims Tumblr posts',
		width : 900,
		height: 500,
		hAxis: {
			title: 'Time (hours)'
		},
		vAxis: {
			title: 'Popularity'
		},
		chartArea : {
			'width' : '60%',
			'height' : '80%'
		}
	};

	var chart = new google.charts.Line(document.getElementById('chart_sub'));

	chart.draw(dataTable, google.charts.Line.convertOptions(options));
}