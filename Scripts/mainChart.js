
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

	var options = {'title':'Top Objects in Sims Tumblr Posts',
	               'width':960,
	               'height':1000,
	               'chartArea': {'width': '60%', 'height': '80%'}};

	var chart = new google.visualization.BarChart(document.getElementById('chart_main'));
	chart.draw(data, options);
}