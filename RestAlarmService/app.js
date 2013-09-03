var restify = require('restify');
var constants = require("./app/server/util/constants");
var Logger = require('bunyan');

var log = new Logger({
	name: 'RestAlarmService',
	streams: [
	          {
	              level: 'info',
	              path: './log/restAlarmService.log'  // log info and above to a file
	            }] 
});


var url = constants.mongo_host+':'+constants.mongo_port+'/'+constants.mongo_schema;
var collections = [constants.mongo_collection];

console.log('connect():: Connecting to mongodb ('+url+')');

var db = require("mongojs").connect(url, collections);





var server = restify.createServer({
	name: "AlarmService",
	 log: log
	
});
server.use(restify.fullResponse());
server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser({mapParams: false}));

server.pre(function(req, res, next) {
	  server.log.info({ req: req }, 'no req.log in "pre" handler');
	  req.headers.accept = 'application/json';  
	  return next();
	});
require('./app/server/router')(server,db);

server.listen(8088, function() {
  console.log('%s listening at %s', server.name, server.url);
});