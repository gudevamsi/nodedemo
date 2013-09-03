/**
 * New node file
 */

var Util = require("util");

module.exports = SignalController;


var SignalDao = require('../dao/SignalDAO');
function SignalController(connection){
	this.connection = connection;
	
}



SignalController.prototype.findAllSignals=function(req, res,db,next,log){
	var dao = new SignalDao();	
	
	log.info("FIND ALL SIGNALS");
	var promise=dao.getAllSignals(req, res,db);
	promise.then(function(data){
		log.info("FIND ALL SIGNALS DATA RECIEVED SUCCESSFULLY");
		 res.send(data);
		next();
	},function(error){
		log.info('Error occurred checking  ... Error is: '+error);
		 next(new Error('Error occurred checking  ... Error is: '+error));
		console.log('Error occurred checking  ... Error is: '+error);
	});
}

SignalController.prototype.findAllSignalsBySeverity=function(req, res,db,next,log){
	log.info("FIND ALL SIGNALS BY SEVERITY with severity"+severityLevel);
	var severityLevel = req.params.level;
	if(isNaN(req.params.level) ||req.params.level>5 ){
		log.fatal("Invalid Severity Specified");
		
		res.send(new restify.InvalidArgumentError('Invalid Severity Level'))
		 next(new Error("Invalid severity specified"));
		
	}

	var dao = new SignalDao();	
	var promise=dao.findAllSignalsBySeverity(severityLevel,db,next);
	promise.then(function(data){
		log.info("FIND ALL SIGNALS BY SEVERITY with severity"+severityLevel+" Succeded");
		 res.send(data);
		 return next();
	},function(error){
		log.error('FIND ALL SIGNALS BY SEVERITY  -- Error is: '+error)
		next(new Error('Error occurred checking  ... Error is: '+error));
		
	});
}

SignalController.prototype.findAllSignalsByClearance=function(req, res,db,next,log){
	
	var iscleared = false;

	log.info("FIND ALL SIGNALS BY CLEARANCE cleared"+req.params.cleared);
	if(req.params.cleared == 1 || req.params.cleared == 0){
		
	if(req.params.cleared==1)
	iscleared = true;
	
	var dao = new SignalDao();	
	var promise=dao.findAllSignalsByClearance(iscleared,db);
	promise.then(function(data){
		log.info("FIND ALL SIGNALS BY SEVERITY with clearance Succeded");
		 res.send(data);
	},function(error){
		log.error('FIND ALL SIGNALS BY CLEARANCE -- Error is: '+error)
		next(new Error('Error occurred checking  ... Error is: '+error));
		
	});
	}else{
		log.fatal("Invalid cleared status specified");
		 next(new Error("Invalid cleared status specified"));
	
	}
}

SignalController.prototype.findAllSignalsByDate=function(req, res,db,next,log){
	var date=req.params.date;
	log.info("FIND ALL SIGNALS BY DATE "+date);
	var datearr=date.split("-");
	if(datearr.length!=3){
		log.error('FIND ALL SIGNALS BY DATE --Invalid Date format ')
		next(new Error('Date Format Issue'));
	}
	var dao = new SignalDao();	
	var promise=dao.findAllSignalsByDate(db,datearr);
	promise.then(function(data){
		log.info("FIND ALL SIGNALS BY DATE Succeded");
		 res.send(data);
	},function(error){
		log.error('FIND ALL SIGNALS BY Date -- Error is: '+error)
		
	});
}

SignalController.prototype.findAllSignalsBetweenDates=function(req, res,db,next,log){
	var fromdate=req.params.fromdate;
	var toDate = req.params.toDate;
	log.info("FIND ALL SIGNALS BETWEEN DATES "+fromdate +" to "+toDate);
	var datearr=fromdate.split("-");
	var toDatearr = toDate.split("-");
	if(datearr.length!=3){
		log.error('FIND ALL SIGNALS BETWEEN DATE -- FromDate Error is: ')
		next(new Error('Date Format Issue'));
	}
	if(toDatearr.length!=3){
		log.error('FIND ALL SIGNALS BETWEEN DATE -- ToDate Error is: ')
		next(new Error('Date Format Issue'));
	}
	var dao = new SignalDao();	
	var promise=dao.findAllSignalsBetweenDates(db,datearr,toDatearr);
	promise.then(function(data){
		log.info("FIND ALL SIGNALS Between DATE Succeded");
		 res.send(data);
	},function(error){
		log.error('FIND ALL SIGNALS BETWEEN Date -- Error is: ')
		
	});
}


	

