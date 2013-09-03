/**
 * Memcached Service Test File 
 * Author: Vamsi Gude (vamgude)
 */

var assert = require('assert');
var expect = require('expect.js');
var should = require('should');

var Alarm = require('../../../app/server/model/Alarm');
var alarmobj = new Alarm();
var MemcachedService = require('../../../app/server/service/MemcachedService');
var memcachedService = new MemcachedService();
memcachedService.connect();

var alarmstr = "hostName=nclab-r10-wdm1-ons1,rack=,shelf=,slot=,ppmHolder=,port=,nativeAlarmCause=Server Monitor Threshold Crossed,serviceAffectibility=NSA,severity=1,interfaceName=System - CPU_Usage,alarmCondition=na,objectType=,netime=2012-12-08 16:32:24 UTC,cleared=true";
var alarms = "hostName=nclab-r10-wdm1-ons1,rack=,shelf=,slot=,ppmHolder=,port=,nativeAlarmCause=Security Intrusion Attempt Detected - See Audit Log,serviceAffectibility=NSA,severity=5,interfaceName=SYSTEM,alarmCondition=INTRUSION_PSWD,objectType=,netime=2012-12-10 19:21:05 UTC,cleared=false~hostName=nclab-r10-wdm1-ons1,rack=,shelf=,slot=,ppmHolder=,port=,nativeAlarmCause=Server Monitor Threshold Crossed,serviceAffectibility=NSA,severity=1,interfaceName=System - CPU_Usage,alarmCondition=na,objectType=,netime=2012-12-08 16:32:24 UTC,cleared=true";

describe('Memcached Test Suite', function(){
	it('Memcached Save Test', function(done){
		var promise = memcachedService.save(alarms);
		promise.then(function(data){
			expect(data).to.equal('success');
			done();
		}, function(err){
			should.not.exist(err);
			done();
		});
	});
	
	it('Memcached Retrieve Test', function(done){
		var newAlarmObject = alarmobj.parseAlarm(alarmstr);
		var promise = memcachedService.get(newAlarmObject.formatKey());
		promise.then(function(data){
			//console.log(JSON.stringify(data));
			JSON.stringify(data).should.not.be.empty;
			expect(JSON.stringify(data)).to.contain('2012-12-08 16:32:24 UTC');
			done();
		}, function(err){
			should.not.exist(err);
			done();
		});
	});
	
	it('Memcached isKeyExist Test', function(done){
		var promise = memcachedService.isKeyExist(alarms);
		promise.then(function(data){
			//console.log('***'+data);
			data.should.be.empty;
			done();
		}, function(err){
			should.not.exist(err);
			done();
		});
	});
	
	it('Memcached isKeyExist Test-2', function(done){
		var newalarm = "hostName=aer01-mda1-wdm1-ons1,rack=1,shelf=1,slot=2,ppmHolder=1,port=6,nativeAlarmCause=Forward Defect Indication,serviceAffectibility=NSA,severity=5,interfaceName=LINEWL-1-2-3-TX-1551.72,alarmCondition=FDI,objectType=PHYSICAL_TERMINATION_POINT,netime=2013-06-18 22:46:36 UTC,cleared=false";
		var promise = memcachedService.isKeyExist(newalarm);
		promise.then(function(data){
			data.should.not.be.empty;
			memcachedService.disconnect();
			done();
		}, function(err){
			should.not.exist(err);
			memcachedService.disconnect();
			done();
		});
	});
});