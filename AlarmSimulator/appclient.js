/*
* Sample client to test the alarm simulator functionality.
* Author: Vamsi Gude(vamgude)
*/

var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

client.connect('8000', 'localhost', function(){
	console.log('Connected to server ...');
});

client.on('data', function(data){
	console.log('Data from server: '+data);
});

client.on('close', function(){
	console.log('Connection closed...');
});