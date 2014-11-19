/**
 * Module dependencies.
 */

var express = require('express'),
routes = require('./routes');
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

// Configuration for Development Mode
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

// Configuration for Production Mode
app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/create', routes.createUser);
app.post('/save', routes.saveUser);
app.get('/list', routes.list);
app.get('/update', routes.editUser);
app.post('/update', routes.updateUser);
app.get('/delete', routes.deleteUser);

// open socket
app.listen(5000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);