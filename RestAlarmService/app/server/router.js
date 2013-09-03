var SignalController = require('./modules/controller/SignalController');

module.exports  = function(server,db) {	
	server.get('/reports/AllSignals', function (req, res, next) {
		 server.log.info("Request Recieved for AllSignals");
		var signalController = new SignalController(db);	
		signalController.findAllSignals(req,res,db,next,server.log);		
	});	

	server.get('/reports/severity/:level', function (req, res, next) {		
		var severityLevel = req.params.level;		
		var signalController = new SignalController(db);		
		signalController.findAllSignalsBySeverity(req,res,db,next,server.log);	
	});

	server.get('/reports/cleared/:cleared', function (req, res, next) {			
		var signalController = new SignalController(db);		
		signalController.findAllSignalsByClearance(req,res,db,next,server.log);		
	});

	server.get('/reports/date/:date', function (req, res, next) {		
		var signalController = new SignalController(db);		
		signalController.findAllSignalsByDate(req,res,db,next,server.log);		
	});
	
	server.get('/reports/date/:fromdate/:toDate', function (req, res, next) {		
		var signalController = new SignalController(db);		
		signalController.findAllSignalsBetweenDates(req,res,db,next,server.log);		
	});
};