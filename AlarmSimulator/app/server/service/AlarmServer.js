/*
*	This file will be used to generate alarms. It internally uses FileService to retrieve alarms from file
*	Author: Vamsi Gude
*/

var net = require('net');
var Q = require("q");
var FileService = require("./FileService");
var constants = require("../util/constants");
var lutil = require("../util/Util");
var dateFormat = require("dateformat");

module.exports = AlarmServer;

function AlarmServer(){ 
	this.stop = false;
}

AlarmServer.prototype.startServer = function(){
	var self = this;
	console.log('AlarmServer.startServer:: Starting alarm server ...');
	
	self.stop = false;
	
	var server = net.createServer(
		function (conn){
			console.log('AlarmServer.startServer:: Client connected ... IP address: '+conn.remoteAddress+', port: '+conn.remotePort);
			console.log('AlarmServer.startServer:: sending alarm data ...');
			
			sendAlarms(self, conn);
			
			//conn.on('connect', function(){
			//	console.log('AlarmServer.startServer:: client is connected ... sending alarm data ...');
			//	sendAlarms(self);
			//});
			
			conn.on('close', function(){
				console.log('AlarmServer.startServer:: client closed the connection ...');
			});		
		}
	);
	server.listen(constants.port, function(){
		console.log('AlarmServer.startServer:: Server listening on '+constants.port+' port ...');
	});
	
	var adminserver = net.createServer(
		function (conn){
			console.log('AlarmServer.startServer.adminServer:: Client connected ... IP address: '+conn.remoteAddress+', port: '+conn.remotePort);
			
			conn.on('data', function(data){
				console.log('AlarmServer.startServer.adminServer:: Data received from client is: '+data);
				if(data!=null && data == 'SHUTDOWN'){
					console.log('AlarmServer.startServer.adminServer:: Stopping the alarm server and admin server ...');
					self.stop = true;
					conn.end();
					server.close(function(){
						server.on('close', function(){
							console.log('AlarmServer.startServer.adminServer:: Alarm server closed successfully ...');
						});
					});
					adminserver.close(function(){
						adminserver.on('close', function(){
							console.log('AlarmServer.startServer.adminServer:: Admin server closed successfully ...');
						});
					});					
					console.log('------------------------------------------');
				}
			});
		}
	);
	adminserver.listen(constants.adminport, function(){
		console.log('AlarmServer.startServer:: Admin Server listening on '+constants.adminport+' port ...');
	});
}

function sendAlarms(self, conn){
	console.log('AlarmServer.sendAlarms:: sending alarms to client...');
	var filesvc = new FileService();
	var promise = filesvc.readFile(constants.alarmfile);
	promise.then(function(data){
		console.log('AlarmServer.sendAlarms:: successfully received data from File Service ...');
		var darr = data.split('\n');
		console.log('AlarmServer.sendAlarms:: Data Array length is: '+darr.length);
		var len = 10;
		console.log('AlarmServer.sendAlarms:: Going to generate '+len+' alarms ...');
		var newAlarms = '';
		for(var i=0; i<len; i++){
			var pos = Math.floor(Math.random()*darr.length);
			console.log('AlarmServer.sendAlarms:: Data Array Length is: '+darr.length+', Reading position is: '+pos);
			var tmpalarm = darr[pos];
			var tmparr = tmpalarm.split(',');
			tmpalarm = '';
			for(var j=0; j<tmparr.length; j++){
				if(tmparr[j].indexOf('netime')>=0){
					var date = new Date();
			  		var fdate = dateFormat(date, "yyyy-mm-dd HH:MM:ss");
			  		tmpalarm+='netime='+fdate+' UTC,'
				}
				else{
					tmpalarm+=tmparr[j]+',';
				}
			}
			tmpalarm = tmpalarm.substring(0, tmpalarm.length-1);			
			newAlarms+=tmpalarm+'\n';
		}
		console.log('AlarmServer.sendAlarms:: New Alarm Data is: '+newAlarms);
		console.log('\n');
		
		var dupAlarms = '';
		for(var i=0; i<len; i++){
			var pos = Math.floor(Math.random()*darr.length);
			console.log('AlarmServer.sendAlarms:: Data Array Length is: '+darr.length+', Reading position is: '+pos);
			dupAlarms+=darr[pos]+'\n';
		}
		console.log('AlarmServer.sendAlarms:: Duplicate Alarm Data is: '+dupAlarms);		
		
		conn.write(newAlarms+dupAlarms);
		console.log('AlarmServer.sendAlarms:: successfully sent data to client ...');
		console.log('AlarmServer.sendAlarms:: stop flag value is: '+self.stop);
		if(!self.stop){
			console.log('AlarmServer.sendAlarms:: Setting 1 min interval before calling sendAlarms ... Date is: '+new Date());
			var myfunc = function(){ sendAlarms(self, conn); };
			setTimeout(myfunc,60000);
		}
		else{
			console.log('AlarmServer.sendAlarms:: stop flag is set to true ... closing client connection');
			conn.end();
		}
	},function(err){
		console.log('AlarmServer.sendAlarms:: Erro received from File Service ... Error is: '+err);
		console.log('AlarmServer.sendAlarms:: stop flag value is: '+self.stop);
		if(!self.stop){
			console.log('AlarmServer.sendAlarms:: Setting 1 min interval before calling sendAlarms ... ');
			console.log('***************************************************************************************');
			var myfunc = function(){ sendAlarms(self, conn); };
			setTimeout(myfunc,60000);
		}
		else{
			console.log('AlarmServer.sendAlarms:: stop flag is set to true ... closing client connection');
			conn.end();
		}
	});
}