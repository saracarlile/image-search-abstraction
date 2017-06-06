var express = require('express');
var routes = require('./routes/index');
var path = require('path');


var app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.locals.basedir = path.join(__dirname, 'views');
app.use('/', routes); 



var port = process.env.PORT ||  8080;
var server = app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});