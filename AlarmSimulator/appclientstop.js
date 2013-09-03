/*
* Sample client to test the alarm simulator functionality.
* Author: Vamsi Gude(vamgude)
*/

var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

client.connect('8124', 'localhost', function(){
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