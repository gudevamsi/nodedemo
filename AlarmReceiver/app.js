/**
 * This file will be used for starting the Alarm Receiver Application
 * Author: Vamsi Gude (vamgude)
 */
 
var net = require('net');
var constants = require("./app/server/util/constants");
var AlarmReceiver = require("./app/server/service/AlarmReceiver");
var alarmReceiver = new AlarmReceiver();

console.log('app.main:: Starting alarm receiver ...'); 
alarmReceiver.startAlarmReceiver();
console.log('app.main:: Started alarm receiver ...');

console.log('app.main:: Starting client admin server ...');
var adminserver = net.createServer(
	function (conn){
		console.log('app.main.clientAdminServer:: Client connected ... IP address: '+conn.remoteAddress+', port: '+conn.remotePort);
		
		conn.on('data', function(data){
			console.log('app.main.clientAdminServer:: Data received from client is: '+data);
			if(data!=null && data == 'SHUTDOWN'){
				console.log('app.main.clientAdminServer:: Stopping the alarm server and admin server ...');
				alarmReceiver.stopAlarmReceiver();	
				adminserver.close();				
				console.log('------------------------------------------');
			}
		});
	}
);
adminserver.listen(constants.clientadminport, function(){
	console.log('app.main.clientAdminServer:: Admin Server listening on '+constants.clientadminport+' port ...');
});