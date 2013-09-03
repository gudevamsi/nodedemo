/*
*	File Read Service Test.
*	Author: Vamsi Gude
*/

var assert = require('assert');
var should = require('should');
var MemcachedService = require('../../../app/server/service/MemcachedService');


var memcachedService = new MemcachedService();

it('MemcachedService Test - Positive', function(done){
	memcachedService.connect();
	var promise = memcachedService.save('project', 'AlarmReceiver');
	
	promise.then(function(data){
		console.log('FileServiceTest.readFilePositive:: Receievd output ...');
		
		var valid = data.length>0?true:false;
		valid.should.be.true;	
			
		data.should.not.be.empty;		
		done();
	}, function(err){
		console.log('FileServiceTest.readFilePositive:: Receievd error ...'+err);		
		should.not.exist(err);		
		done();
	});	
});