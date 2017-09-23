
// Loads google packages
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawTooltipsCharts);

// Set up data for main chart
var primaryData = JSON.parse(document.getElementById('raw-data').getAttribute('data-data'));
primaryData = primaryData.slice(0,30);
document.getElementById('raw-data').removeAttribute('data-data');

// Set up data for tooltips
var tooltipData = JSON.parse(document.getElementById('raw-data').getAttribute('data-sub'));
document.getElementById('raw-data').removeAttribute('data-data');


// Draws the charts to pull PNG for tooltips
// function drawTooltipsCharts() {
// 	var data = new google.visualization.arrayToDataTable(tooltipData);
// 	var view = new google.visualization.DataView(data);

// 	for (var i = 0; i < primaryData.length; i++)
// }

console.log(primaryData);
console.log(tooltipData);