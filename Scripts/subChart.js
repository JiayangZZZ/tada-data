
var dataRaw2 = document.getElementById('raw-data').getAttribute('data-sub');
dataRaw2 = JSON.parse(dataRaw2);
document.getElementById('raw-data').removeAttribute('data-sub');

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

	var data = new google.visualization.DataTable();
	data.addColumn('number', 'X');
	data.addColumn('number', 'girl');

	data.addRows(dataRaw2);

	var options = {
		'title': 'Girl: Popularity Over Time',
		'width':960,
		hAxis: {
			title: 'Time'
		},
		vAxis: {
			title: 'Popularity'
		}
	};

	var chart = new google.visualization.LineChart(document.getElementById('chart_sub'));

	chart.draw(data, options);
}