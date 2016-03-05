var app = require('./app');

app.listen(process.env.PORT, function() {	
	console.log('Magic happens on port ' + process.env.PORT);
});