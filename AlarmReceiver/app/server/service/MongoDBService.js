/**
 * New node file
 */
var mongojs = require('mongojs');
var constants = require("../util/constants");
var Q = require("q");
var lutil = require("../util/Util");
var AlarmModel = require("../model/Alarm");

 module.exports = MongoDBService;
 
 function MongoDBService() { }
 
MongoDBService.prototype.connect = function(){
 	var self = this; 	
 	var url = constants.mongo_host+':'+constants.mongo_port+'/'+constants.mongo_schema;
	var collections = [constants.mongo_collection];

	console.log('MongoDBService.connect():: Connecting to mongodb ('+url+')');
	var db = mongojs.connect(url,collections);
	self.db = db;
	console.log('MongoDBService.connect():: Successfully connected to mongodb ...'+db);	
 }
 
MongoDBService.prototype.save = function(alarms){
 	var self = this;
 	var defer = Q.defer();	
	
	if(alarms == null || lutil.trim(alarms) == ''){
		console.log('MongoDBService.save():: passed alarms values is blank .. returning ...');
		defer.resolve('success');
	} 
	else{
		console.log('MongoDBService.save():: Trying to save alarms in mongodb ...');
		var db = self.db;
		
		var alarmModel = new AlarmModel();
		var alarmarr = alarms.split('~');
		
		var tmparr = new Array();
		for(var i=0; i<alarmarr.length; i++){
			if(alarmarr[i]!=null && lutil.trim(alarmarr[i])!=''){
				var alarmobj = alarmModel.parseAlarm(alarmarr[i]);
				var alarmkey = alarmobj.formatKey();
				tmparr.push(alarmkey);			
			}
		}
		console.log('MongoDBService.save():: tmparr size is: '+tmparr.length);
		
		var count = 0;
		
		for(var i=0; i<alarmarr.length; i++){
			if(alarmarr[i]!=null && lutil.trim(alarmarr[i])!=''){
				var alarmobj = alarmModel.parseAlarm(alarmarr[i]);
				//var alarmvalue = JSON.parse(JSON.stringify(JSON.parse(alarmobj.toJson()).alarm));
				var alarmvalue = {
					'hostName' : alarmobj.hostName,
					'rack' : alarmobj.rack,
					'shelf' : alarmobj.shelf,
					'slot' : alarmobj.slot,
					'ppmHolder' : alarmobj.ppmHolder,
					'port' : alarmobj.port,
					'nativeAlarmCause' : alarmobj.nativeAlarmCause,
					'serviceAffectibility' : alarmobj.serviceAffectibility,
					'severity' : alarmobj.severity,
					'interfaceName' : alarmobj.interfaceName,
					'alarmCondition' : alarmobj.alarmCondition,
					'objectType' : alarmobj.objectType,
					'cleared' : alarmobj.cleared,
					'netime' : new Date(alarmobj.netime)
				};
				console.log('MongoDBService.save():: Trying to save json value: '+alarmvalue+' ...');
				
				db.alarms.save(alarmvalue, function(err, data) {
				  	if (err) {
				  		console.log('MongoDBService.save():: Error occurred while saving alarm json('+json+') ... Error is: '+err);
				  		count++;
				  		console.log('MongoDBService.save():: count: '+count+', tmparr length: '+tmparr.length);
						if(count >= tmparr.length){
							defer.resolve('success');
						}
				  	}
				  	else{
				  		console.log('MongoDBService.save():: Successfully saved alarm json('+alarmvalue+') ... Return value is: '+data);
				  		count++;
				  		console.log('MongoDBService.save():: count: '+count+', tmparr length: '+tmparr.length);
						if(count >= tmparr.length){
							defer.resolve('success');
						}
				  	}
				});
			}
		}
	}
	
	return defer.promise;
 } 

MongoDBService.prototype.disconnect = function(){
 	var self = this;
 	console.log('MongoDBService.connect():: disconnecting from mongodb ...');
	var db = self.db;
	db.close();
	console.log('MongoDBService.connect():: successfully disconnected from mongodb ...');
 } 