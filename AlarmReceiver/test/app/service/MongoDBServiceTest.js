/**
 * MongoDB Service Test File 
 * Author: Vamsi Gude (vamgude)
 */

var assert = require('assert');
var expect = require('expect.js');
var should = require('should');

var MongoDBService = require('../../../app/server/service/MongoDBService');
var mongoDBService = new MongoDBService();
mongoDBService.connect();

var alarms = "hostName=nclab-r10-wdm1-ons1,rack=,shelf=,slot=,ppmHolder=,port=,nativeAlarmCause=Security Intrusion Attempt Detected - See Audit Log,serviceAffectibility=NSA,severity=5,interfaceName=SYSTEM,alarmCondition=INTRUSION_PSWD,objectType=,netime=2012-12-10 19:21:05 UTC,cleared=false~hostName=nclab-r10-wdm1-ons1,rack=,shelf=,slot=,ppmHolder=,port=,nativeAlarmCause=Server Monitor Threshold Crossed,serviceAffectibility=NSA,severity=1,interfaceName=System - CPU_Usage,alarmCondition=na,objectType=,netime=2012-12-08 16:32:24 UTC,cleared=true";

describe('MongoDB Test Suite', function(){
	it('MongoDB Save Test', function(done){
		var promise = mongoDBService.save(alarms);
		promise.then(function(data){
			expect(data).to.equal('success');
			mongoDBService.disconnect();
			done();
		}, function(err){
			should.not.exist(err);
			mongoDBService.disconnect();
			done();
		});
	});
});