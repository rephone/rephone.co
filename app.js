
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3950);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// config for rephone.co
app.disable('x-powered-by');
app.set('strict routing', true);
app.set('project-name', 'Rephone Community');
app.set('project-title', 'Rephone Community');
app.set('company-name', 'Seeed Studio');
app.set('cdn-server', '');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// global locals
app.locals.projectName = app.get('project-name');
app.locals.projectTitle = app.get('project-title');
app.locals.cdnServer = app.get('cdn-server');
app.locals.cacheBreaker = '?20150915';

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
