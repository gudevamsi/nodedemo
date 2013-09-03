/*
*	This file will be used to store and retrieve alarms in memcached
*	Author: Vamsi Gude(vamgude)
*/

var constants = require("../util/constants");
var lutil = require("../util/Util");
var Memcached = require("memcached");
var Q = require("q");
var Alarm = require("../model/Alarm");

module.exports = MemcachedService;

function MemcachedService(){ 
	Memcached.config.poolSize = 25;
}

MemcachedService.prototype.connect = function(){
	var self = this;
	console.log('MemcachedService.connect():: Connecting to memcached ('+constants.memcached_host+':'+constants.memcached_port+')');
	var memcached = new Memcached(constants.memcached_host+":"+constants.memcached_port);
	console.log('MemcachedService.connect():: Successfully connected to memcached ...');
	self.memcached = memcached;
}

MemcachedService.prototype.save = function(alarms){
	var self = this;
	var memcached = self.memcached;
	var defer = Q.defer();
	if(alarms == null || lutil.trim(alarms) == ''){
		console.log('MemcachedService.save():: passed alarms values is blank .. returning ...');
		defer.resolve('success');
	} 
	else{
		console.log('MemcachedService.save():: Trying to save alarms in memcached ...');
		var alarm = new Alarm();
		var alarmarr = alarms.split('~');
		
		var tmparr = new Array();
		for(var i=0; i<alarmarr.length; i++){
			if(alarmarr[i]!=null && lutil.trim(alarmarr[i])!=''){
				var alarmobj = alarm.parseAlarm(alarmarr[i]);
				var alarmkey = alarmobj.formatKey();
				tmparr.push(alarmkey);			
			}
		}
		console.log('MemcachedService.save():: tmparr size is: '+tmparr.length);
		
		var count = 0;
		
		for(var i=0; i<alarmarr.length; i++){
			if(alarmarr[i]!=null && lutil.trim(alarmarr[i])!=''){
				var alarmobj = alarm.parseAlarm(alarmarr[i]);
				var alarmkey = alarmobj.formatKey();
				console.log('MemcachedService.save():: alarm key is: '+alarmkey);
				var alarmvalue = JSON.parse(JSON.stringify(JSON.parse(alarmobj.toJson()).alarm));
				console.log('MemcachedService.save():: Trying to save key: '+alarmkey+', value: '+alarmvalue+' ...');
				memcached.set(alarmkey, alarmvalue, constants.memcached_save_time, function(err){
					if(err){
						console.log('MemcachedService.save():: Error occurred while saving data. Error is: '+err+', key:'+alarmkey+', value: '+alarmvalue);
						count++;
						console.log('MemcachedService.save():: count: '+count+', tmparr length: '+tmparr.length);
						if(count >= tmparr.length){
							defer.resolve('success');
						}
					}
					else{
						console.log('MemcachedService.save():: Successfully saved data ... key: '+alarmkey+', value: '+alarmvalue);
						count++;
						console.log('MemcachedService.save():: count: '+count+', tmparr length: '+tmparr.length);
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

MemcachedService.prototype.get = function(key){
	var self = this;
	var memcached = self.memcached;
	var defer = Q.defer();
	console.log('MemcachedService.get():: Trying to retrieve key: '+key+' from memecached ...');
	memcached.get(key, function(err, data){
		if(err){
			console.log('MemcachedService.get():: Error occurred while retrieving key('+key+'). Error is: '+err);
			defer.reject(err);
		}
		else{
			console.log('MemcachedService.get():: Successfully retrieved data ... data is: '+data);
			defer.resolve(data);
		}
	});
	return defer.promise;	
}

MemcachedService.prototype.isKeyExist = function(alarms){
	var self = this;
	var memcached = self.memcached;
	var defer = Q.defer();
	if(alarms==null || lutil.trim(alarms)==''){
		console.log('MemcachedService.isKeyExist():: Passes alarms are empty ... returning ...');
		defer.resolve('success');
	}
	else{
		var alarm = new Alarm();
		var alarmarr = alarms.split('\n');
		
		var tmparr = new Array();
		for(var i=0; i<alarmarr.length; i++){
			if(alarmarr[i] != null && lutil.trim(alarmarr[i])!= ''){
				var alarmobj = alarm.parseAlarm(alarmarr[i]);
				var alarmkey = alarmobj.formatKey();
				var obj = new Object();
				obj.key = alarmkey;
				obj.value = alarmarr[i];
				console.log('MemcachedService.isKeyExist():: Adding key: '+alarmkey+', value: '+alarmarr[i]+' to temparray');
				tmparr.push(obj);
			}
		}
		var count = 0;
		
		var retvalue = '';
		for(var i=0; i<alarmarr.length; i++){
			if(alarmarr[i] != null && lutil.trim(alarmarr[i])!= ''){
				var alarmobj = alarm.parseAlarm(alarmarr[i]);
				var alarmkey = alarmobj.formatKey();
				memcached.get(alarmkey, function(err, data){
					if(err){
						console.log('MemcachedService.isKeyExist():: Error occurred while retrieving key('+alarmkey+'). Error is: '+err);
						console.log('MemcachedService.isKeyExist():: adding it to return array as received error while checking for duplicate ...');
						for(var k=0; k<tmparr.length; k++){
							if(tmparr[k].key == alarmkey){
								console.log('MemcachedService.isKeyExist():: matched tmparr key: '+tmparr[k].key+', vlaue is: '+tmparr[k].value);
								retvalue+=tmparr[k].value+'~';
							}
						}
						count++;
						console.log('MemcachedService.isKeyExist():: count: '+count+', array length: '+tmparr.length);
						if(count >= tmparr.length){
							defer.resolve(retvalue);
						}
					}
					else{
						if(data){
							console.log('MemcachedService.isKeyExist():: Successfully retrieved data for key: '+alarmkey+'... data is: '+data+' ... Ignoring current alarm as it is duplicate alarm ..');
							count++;
							console.log('MemcachedService.isKeyExist():: count: '+count+', array length: '+tmparr.length);
							if(count >= tmparr.length){
								defer.resolve(retvalue);
							}	
						}
						else{
							console.log('MemcachedService.isKeyExist():: No value preset for key: '+alarmkey+' ... adding alarm to return array');
							for(var k=0; k<tmparr.length; k++){
								if(tmparr[k].key == alarmkey){
									console.log('MemcachedService.isKeyExist():: matched tmparr key: '+tmparr[k].key+', vlaue is: '+tmparr[k].value);
									retvalue+=tmparr[k].value+'~';
								}
							}
							count++;
							console.log('MemcachedService.isKeyExist():: count: '+count+', array length: '+tmparr.length);							
							if(count >= tmparr.length){
								defer.resolve(retvalue);
							}
						}
					}
				});
			}
		}
	}
	
	return defer.promise;
	
	/*console.log('MemcachedService.isKeyExist():: Trying to check whether key: '+key+' exist in memecached or not ...');
	memcached.get(key, function(err, data){
		if(err){
			console.log('MemcachedService.isKeyExist():: Error occurred while retrieving key('+key+'). Error is: '+err);
			defer.reject(err);
		}
		else{
			if(data){
				console.log('MemcachedService.isKeyExist():: Successfully retrieved data for key: '+key+'... data is: '+data);
				defer.resolve('YES');
			}
			else{
				console.log('MemcachedService.isKeyExist():: No value preset for key: '+key+' ...');
				defer.resolve(key);
			}
		}
	});*/
	
}

MemcachedService.prototype.disconnect = function(){
	var self = this;
	var memcached = self.memcached;
	console.log('MemcachedService.disconnect():: Disconnecting from memcached ...');
	memcached.end();
	console.log('MemcachedService.disconnect():: Disconnected from memcached ...');
}