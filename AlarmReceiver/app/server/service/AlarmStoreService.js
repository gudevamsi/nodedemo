/*
*	This file will be used to receive alarms. It will open port with alarm server and wait for alarms
*	Author: Vamsi Gude
*/

var constants = require("../util/constants");
var lutil = require("../util/Util");
var MemcachedService = require("./MemcachedService");
var Alarm = require("../model/Alarm");
var MongoDBService = require("./MongoDBService");

module.exports = AlarmStoreService;

function AlarmStoreService(){ }

AlarmStoreService.prototype.storeAlarm = function(alarms){
	console.log('AlarmStoreService.storeAlarm():: Start of store alarm method ...Storing following alarms ...');
	console.log(alarms);
	
	if(alarms==null || lutil.trim(alarms)==''){
		console.log('AlarmStoreService.storeAlarm():: Received alarms string is empty ... returning ...');
		return;
	}
	
	var alarm = new Alarm();
	
	var memcachedService = new MemcachedService();
	memcachedService.connect();
	
	console.log('AlarmStoreService.storeAlarm():: Performing duplicate check ...');
	var dupcheckpromise = memcachedService.isKeyExist(alarms);
	
	dupcheckpromise.then(function(retalarms){
		console.log('AlarmStoreService.storeAlarm():: Duplicate check completed ...return value is: '+retalarms);
		console.log('AlarmStoreService.storeAlarm():: trying to save new alarms in memcached ...');
		var memcachedsavepromise = memcachedService.save(retalarms);
		memcachedsavepromise.then(function(data){
			console.log('AlarmStoreService.storeAlarm():: successfully saved alarms in memcached ... return value is: '+data);
			memcachedService.disconnect();
		}, function(err){
			console.log('AlarmStoreService.storeAlarm():: Failed to save alarms in memcached ... Error is: '+err);
			memcachedService.disconnect();
		});
		
		console.log('AlarmStoreService.storeAlarm():: trying to connect to mongodb ...');
		var mongoDBService = new MongoDBService();
		mongoDBService.connect();
		console.log('AlarmStoreService.storeAlarm():: Successfully connected to mongodb ...');
		console.log('AlarmStoreService.storeAlarm():: trying to store alarms in mongodb ...');
		var mongosavepromise = mongoDBService.save(retalarms);
		mongosavepromise.then(function(data){
			console.log('AlarmStoreService.storeAlarm():: successfully saved alarms in mongodb .. return value is: '+data);
			mongoDBService.disconnect();
		}, function(err){
			console.log('AlarmStoreService.storeAlarm():: Failed to save alarms in mongodb .. Error is: '+err);
			mongoDBService.disconnect();
		});
		
	}, function(err){
		console.log('AlarmStoreService.storeAlarm():: Duplicate check failed ...Error is: '+data);
		memcachedService.disconnect();
	});
		
}