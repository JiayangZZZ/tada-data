
// Loads google packages
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Set up data for main chart
var primaryData = JSON.parse(document.getElementById('raw-data').getAttribute('data-data'));
// primaryData = primaryData.slice(0,30);
console.log(primaryData)
document.getElementById('raw-data').removeAttribute('data-data');

// Set up data for tooltips
var tooltipData = JSON.parse(document.getElementById('raw-data').getAttribute('data-sub'));
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
}


console.log(primaryData);
console.log(tooltipData);