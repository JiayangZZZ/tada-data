
const express = require('express');
const app = express();
var html = 'html placeholder';

app.get('/', function (req, res) {
	res.send(html);
})

app.listen(3000, function() {
	console.log("Tada listening on port 3000...");
})