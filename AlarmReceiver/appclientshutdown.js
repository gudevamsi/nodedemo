/**
 * This file will be used for stop alarm receiver application
 * Author: Vamsi Gude
 */

var constants = require("./app/server/util/constants");

var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

client.connect(constants.clientadminport, 'localhost', function(){
	console.log('Connected to server ...');
	client.write('SHUTDOWN');
	client.end();
});

client.on('data', function(data){
	console.log('Data from server: '+data);
});

client.on('close', function(){
	console.log('Connection closed...');
});