
/* 
 * Most popular tags bar chart
 * 
 */

var title = "Most popular tags on Tubmler";

var margin = {top: 40, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
	.rangeRoundBands([0, 9000], .5);

var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(10);

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

d3.json("./JSON/post-labels.json", function(err, data) {
	if(err) throw err;

	data.forEach(function(d) {
		d.description = d.description;
		d.score = d.score;
	})

	addTitle(title);

	x.domain(data.map(function(d) {
		return d.description;
	}));

	y.domain([0, data[0].score]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform",
			"translate(0, " + height + ")")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-1em")
		.attr("dy", "-.55em")
		.attr("transform", "rotate(-40)");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("y", "5")
		.attr("dy", "-.71em")
		.attr("transform", "rotate(-90)");

	svg.selectAll("bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) {
			return x(d.description);
		})
		.attr("width", x.rangeBand())
		.attr("y", function(d) {
			return y(d.score);
		})
		.attr("height", function(d) {
			return height-y(d.score);
		});
});

/*
 * Add title
 *
 * @title {string}
 */

function addTitle(title) {
	d3.select("body").append("h1")
		.attr("class", "title")
		.text(title);
}