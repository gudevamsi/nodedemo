/*
*	File Read Service Test.
*	Author: Vamsi Gude
*/

var MongoDBService = require('../../../app/server/service/MongoDBService');


var mongoDBService = new MongoDBService();
mongoDBService.connect();

var str = "hostName=aer01-mda1-wdm1-ons1,rack=1,shelf=1,slot=2,ppmHolder=1,port=7,nativeAlarmCause=Incoming Overhead Signal Absent,serviceAffectibility=NSA,severity=3,interfaceName=LINE-1-2-4-RX,alarmCondition=LOS_O,objectType=PHYSICAL_TERMINATION_POINT,netime=2013-06-18 22:46:07 UTC,cleared=true";

var promise = mongoDBService.save(str);
promise.then(function(data){
	console.log('MongoDBServiceTest: Save return value is: '+data);
	mongoDBService.disconnect();
	console.log(new Date());
}, function(err){
	console.log('MongoDBServiceTest: Save return error is: '+err);
	mongoDBService.disconnect();
	console.log(new Date());
});
