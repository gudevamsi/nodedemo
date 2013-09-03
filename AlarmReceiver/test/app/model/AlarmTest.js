/**
 * Alarm Test File 
 * Author: Vamsi Gude (vamgude)
 */

var assert = require('assert');
var expect = require('expect.js');
var Alarm = require('../../../app/server/model/Alarm');
var alarmobj = new Alarm();
var alarmString = "hostName=nclab-r10-wdm1-ons1,rack=,shelf=,slot=,ppmHolder=,port=,nativeAlarmCause=Security Intrusion Attempt Detected - See Audit Log,serviceAffectibility=NSA,severity=5,interfaceName=SYSTEM,alarmCondition=INTRUSION_PSWD,objectType=,netime=2012-12-10 19:21:05 UTC,cleared=false";

describe('File Service Test Suite', function(){
	it('Alarm Parse Test - Positive', function(done){
	 	var newAlarmObj = alarmobj.parseAlarm(alarmString);
	 	expect(newAlarmObj.hostName).to.equal('nclab-r10-wdm1-ons1');
	 	expect(newAlarmObj.nativeAlarmCause).to.equal('Security Intrusion Attempt Detected - See Audit Log');
	 	expect(newAlarmObj.ppmHolder).to.be.empty();
	 	done();
	});
	
	it('Alarm Json Test - Positive', function(done){
	 	var newAlarmObj = alarmobj.parseAlarm(alarmString);
	 	expect(newAlarmObj.toJson()).to.contain('nclab-r10-wdm1-ons1');
	 	done();
	});
	
	it('Alarm Fomat Key Test - Positive', function(done){
	 	var newAlarmObj = alarmobj.parseAlarm(alarmString);
	 	expect(newAlarmObj.formatKey()).to.equal('nclabr10wdm1ons1NSA5SYSTEMINTRUSIONPSWD20121210192105UTCfalse');
	 	done();
	});
});