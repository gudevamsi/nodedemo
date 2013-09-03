var assert = require('assert');
var should = require('should');
var constants = require("../app/server/util/constants");
var signalDao = require('../app/server/modules/dao/SignalDAO');


it('SignalController Test - Positive', function(done){
	
	var url = constants.mongo_host+':'+constants.mongo_port+'/'+constants.mongo_schema;
	var collections = [constants.mongo_collection];

	var db = require("mongojs").connect(url, collections);
	
	var dao = new signalDao();	
	console.log("--Not a number--"+"HELLLLLLLO")
	var promise=dao.getAllSignals(null, null,db);
	promise.then(function(data){
		
		var valid = data.length>0?true:false;
		valid.should.be.true;	
			
		data.should.not.be.empty;		
		done();
	},function(error){
		console.log('SignalController Test.getAllSignalsCount:: Receievd error ...'+err);		
		should.not.exist(err);		
		done();
	});
});

it('findAllSignalsBySeverity', function(done){
	
	var url = constants.mongo_host+':'+constants.mongo_port+'/'+constants.mongo_schema;
	var collections = [constants.mongo_collection];

	var db = require("mongojs").connect(url, collections);
	
	var dao = new signalDao();	
	var promise=dao.findAllSignalsBySeverity("1",db,null);
	promise.then(function(data){
		data.should.not.be.empty;		
		done();
	},function(error){
		
		console.log('SignalController Test.findAllSignalsBySeverity:: Receievd error ...'+err);		
		should.not.exist(err);		
		done();
	});
});

it('AllSignalsByClearance---Positive', function(done){
	
	var url = constants.mongo_host+':'+constants.mongo_port+'/'+constants.mongo_schema;
	var collections = [constants.mongo_collection];

	var db = require("mongojs").connect(url, collections);
	
	var dao = new signalDao();	
	var promise=dao.findAllSignalsByClearance(true,db);
	promise.then(function(data){
		data.should.not.be.empty;		
		done();
	},function(error){
		
		console.log('SignalController Test.AllSignalsByClearance:: Receievd error ...'+err);		
		should.not.exist(err);		
		done();
	});
});

it('AllSignalsByDate--Positive', function(done){
	
	var url = constants.mongo_host+':'+constants.mongo_port+'/'+constants.mongo_schema;
	var collections = [constants.mongo_collection];

	var db = require("mongojs").connect(url, collections);
	var date="18-06-2013";
	
	var datearr=date.split("-");
	var dao = new signalDao();	
	var promise=dao.findAllSignalsByDate(db,datearr);
	promise.then(function(data){
		data.should.not.be.empty;	
		done();
	},function(error){
		
		console.log('SignalController Test.AllSignalsByClearance:: Receievd error ...'+err);		
		should.not.exist(err);		
		done();
	});
});

it('AllSignalsBetweenDate--negative', function(done){
	
	var url = constants.mongo_host+':'+constants.mongo_port+'/'+constants.mongo_schema;
	var collections = [constants.mongo_collection];

	var db = require("mongojs").connect(url, collections);
	var fromdate ="18-06-2013";
	var toDate="17-06-2013";
	var datearr=fromdate.split("-");
	var toDatearr = toDate.split("-");
		
	var dao = new signalDao();	
	var promise=dao.findAllSignalsBetweenDates(db,datearr,toDatearr);
	promise.then(function(data){
		data.should.be.empty;	
		done();
	},function(error){
		
		console.log('SignalController Test.AllSignalsByClearance:: Receievd error ...'+err);		
		should.not.exist(err);		
		done();
	});
});


it('AllSignalsBetweenDate--positive', function(done){
	
	var url = constants.mongo_host+':'+constants.mongo_port+'/'+constants.mongo_schema;
	var collections = [constants.mongo_collection];

	var db = require("mongojs").connect(url, collections);
	var fromdate ="18-06-2013";
	var toDate="19-06-2013";
	var datearr=fromdate.split("-");
	var toDatearr = toDate.split("-");
	
	
	var dao = new signalDao();	
	var promise=dao.findAllSignalsBetweenDates(db,datearr,toDatearr);
	promise.then(function(data){
		data.should.not.be.empty;	
		done();
	},function(error){
		
		console.log('SignalController Test.AllSignalsBetweenDate--positive:: Receievd error ...'+err);		
		should.not.exist(err);		
		done();
	});
});



it('findAllSignalsBySeverity--Negative', function(done){
	
	var url = constants.mongo_host+':'+constants.mongo_port+'/'+constants.mongo_schema;
	var collections = [constants.mongo_collection];

	var db = require("mongojs").connect(url, collections);
	
	var dao = new signalDao();	
	var promise=dao.findAllSignalsBySeverity("abc",db,null);
	promise.then(function(data){
		data.should.be.empty;		
		done();
	},function(err){
		
		console.log('SignalController Test.findAllSignalsBySeverity:: Receievd error ...'+err);		
		should.exist(err);		
		done();
	});
});
