
var dataRaw2 = document.getElementById('raw-data').getAttribute('data-sub');
var dataRaw3 = document.getElementById('raw-data').getAttribute('data-sub2');
dataRaw2 = JSON.parse(dataRaw2);
dataRaw3 = JSON.parse(dataRaw3);

for(var i = 0; i < dataRaw2.length; i++) {
	dataRaw2[i].push(dataRaw3[i][1]);
}

// console.log(dataRaw2)
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

	var data = new google.visualization.DataTable();
	data.addColumn('number', 'X');
	data.addColumn('number', 'room');
	data.addColumn('number', 'grass');

	data.addRows(dataRaw2);

	var options = {
		'title': 'Girl: Popularity Over Time',
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