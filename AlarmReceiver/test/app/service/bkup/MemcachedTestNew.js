/*
*	File Read Service Test.
*	Author: Vamsi Gude
*/

var MemcachedService = require('../../../app/server/service/MemcachedService');


var memcachedService = new MemcachedService();
memcachedService.connect();


var npromise = memcachedService.get('project');
npromise.then(function(data){
	console.log('Retrived value is: '+data);
	memcachedService.disconnect();
}, function(error){
	console.log('Error occurred while retrieving data ... Error is: '+err);
	memcachedService.disconnect();
});

/*
var promise = memcachedService.save('project', 'AlarmReceiver');
	
promise.then(function(data){
	console.log('Successfully saved data ...');
	
	var npromise = memcachedService.get('project');
	npromise.then(function(data){
		console.log('Retrived value is: '+data);
	}, function(error){
		console.log('Error occurred while retrieving data ... Error is: '+err);
	});
	
	var npromise2 = memcachedService.isKeyExist('project');
	npromise2.then(function(data){
		console.log('isKeyExist value is: '+data);
		memcachedService.disconnect();
	}, function(error){
		console.log('Error occurred checking key exit or not ... Error is: '+err);
		memcachedService.disconnect();
	});
	
}, function(err){
	console.log('Error occurred while saving data .. Error is: '+err);
});
*/	