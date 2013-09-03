/*
*	This file will be used to receive alarms. It will open port with alarm server and wait for alarms
*	Author: Vamsi Gude
*/

var net = require('net');
var constants = require("../util/constants");
var lutil = require("../util/Util");
var AlarmStoreService = require("./AlarmStoreService");

module.exports = AlarmReceiver;

function AlarmReceiver(){ }

AlarmReceiver.prototype.startAlarmReceiver = function(){
	var self = this;
	console.log('AlarmReceiver.startAlarmReceiver:: Starting alarm receiver ...');
	
	var client = new net.Socket();
	client.setEncoding('utf8');
	
	console.log('AlarmReceiver.startAlarmReceiver:: connecting to: '+constants.serverhostname+':'+constants.port);
	client.connect(constants.port, constants.serverhostname, function(){
		console.log('AlarmReceiver.startAlarmReceiver:: Successfully connected to server ...');
		self.socket = client;
	});
	
	client.on('data', function(data){
		console.log('AlarmReceiver.startAlarmReceiver:: Data from server: '+data);
		if(data!=null && lutil.trim(data) !=''){
			var alarmStoreService = new AlarmStoreService();
			alarmStoreService.storeAlarm(data);
			console.log('AlarmReceiver.startAlarmReceiver:: Gave alarms to alarm store service for saving in memcached ...');
		}
	});
	
	client.on('close', function(){
		console.log('AlarmReceiver.startAlarmReceiver::Connection closed...');
	});
}

AlarmReceiver.prototype.stopAlarmReceiver = function(){
	var self = this;
	console.log('AlarmReceiver.startAlarmReceiver:: Stopping alarm receiver ...');
	
	var client = self.socket;
	if(client!=null){
		client.end();
	}
	console.log('AlarmReceiver.startAlarmReceiver:: Stopped alarm receiver ...');
}