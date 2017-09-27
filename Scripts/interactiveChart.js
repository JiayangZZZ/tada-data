
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

var lineChartLegend = JSON.parse(document.getElementById('raw-data').getAttribute('data-legend'));
document.getElementById('raw-data').removeAttribute('data-legend');

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
		width : 1200,
		height : 800,
		chartArea : {
			'width' : '60%',
			'height' : '80%'
		},
		focusTarget: 'category',
		tooltip : {isHtml : true},
		animation: {
			'startup' : true,
			duration: 1000,
			easing: 'out'
		}
	};

	var chart = new google.visualization.BarChart(document.getElementById('chart_main'));

	chart.draw(dataTable, options);
	drawSecondaryChart();
}

function drawSecondaryChart() {
	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn('number', 'time');
	for(var i = 0; i < lineChartLegend.length; i++) {
		dataTable.addColumn('number', lineChartLegend[i]);
	}

	dataTable.addRows(secondaryData);

	var options = {
		title : 'Top objects in Sims Tumblr posts',
		width : 1200,
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