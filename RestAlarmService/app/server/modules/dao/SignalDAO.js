
var Q = require("q");




module.exports = SignalDao;

function SignalDao(){

}


SignalDao.prototype.getAllSignalsCount=function(req,res,db){
	var defer = Q.defer();
	//var subtype = req.query.subtype;
	
	//console.log("subType:   "+subtype);
	db.alarms.count({}, function(error, data){
		
		if(error){
			defer.reject(err);
		}else{
			defer.resolve(data);
		}
		
	   
	   // res.send(data)
	});
	return defer.promise;	
}

SignalDao.prototype.getAllSignals=function(req,res,db){
	
	var defer = Q.defer();
	//var subtype = req.query.subtype;
	
	//console.log("subType:   "+subtype);
	db.alarms.find({}, function(error, data){
		
		if(error){
			defer.reject(err);
		}else{
			defer.resolve(data);
		}
		console.log(data);
	   
	   // res.send(data)
	});
	return defer.promise;	
}

SignalDao.prototype.findAllSignalsBySeverity=function(severityLevel,db){
	
	var defer = Q.defer();
	console.log("--inside dao severityLevel--"+severityLevel)
	db.alarms.find({severity:severityLevel}, function(error, data){
		
		if(error){
			defer.reject(err);
		}else{
			defer.resolve(data);
		}
		
	  
	   // res.send(data)
	});
	return defer.promise;	
}


SignalDao.prototype.findAllSignalsByClearance=function(iscleared,db){
	
	var defer = Q.defer();
	console.log("iscleared condition"+iscleared);
	var clearStatus;
	if(iscleared){
		clearStatus="true";
	}else{
		clearStatus="false";
	}
	db.alarms.find({cleared:clearStatus}, function(error, data){
		
		if(error){
			defer.reject(err);
		}else{
			defer.resolve(data);
		}
		
	    
	   // res.send(data)
	});
	return defer.promise;	
}

SignalDao.prototype.findAllSignalsByDate=function(db,dateArr){
	
	var defer = Q.defer();
	var year = dateArr[2];
	var month = dateArr[1];
	var day = dateArr[0];
	
	var d = year+"-"+month+"-"+day;
	db.alarms.find({netime: {$gte: new Date(d)}}, function(error, data){
		
		if(error){
			defer.reject(err);
		}else{
			defer.resolve(data);
		}
		
	   
	});
	return defer.promise;	
}


SignalDao.prototype.findAllSignalsBetweenDates=function(db,fromdateArr,toDateArr){
	
	var defer = Q.defer();
	var year = fromdateArr[2];
	var month = fromdateArr[1];
	var day = fromdateArr[0];
	
	var toyear = toDateArr[2];
	var tomonth = toDateArr[1];
	var today = toDateArr[0];
	
	var fromd = year+"-"+month+"-"+day;
	var tod=toyear+"-"+tomonth+"-"+today;
	db.alarms.find({netime: {$gte: new Date(fromd),$lt: new Date(tod)}}, function(error, data){
		
		if(error){
			defer.reject(err);
		}else{
			defer.resolve(data);
		}
		
	    
	});
	return defer.promise;	
}

