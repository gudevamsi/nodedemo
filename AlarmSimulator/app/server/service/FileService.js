/*
*	This file will be used to read a file.
*	Author: Vamsi Gude
*/

var Q = require("q");
var lutil = require("../util/Util");
var fs = require('fs');

module.exports = FileService;

function FileService(){ }

FileService.prototype.readFile = function(name){	
	console.log("FileService.readFile():: Start of readFile ...");
	var defer = Q.defer();	 
	 
	if(name == null || lutil.trim(name) == ''){
		console.log("File name is empty ... returning error ... ");
		defer.reject("FileService.readFile():: File is required ...");
	}
	else{
		console.log("FileService.readFile():: Reading file: "+name);
		fs.readFile(name, 'utf8', function (err,data) {
		  if (err) {
		    console.log("FileService.readFile():: Error occurred while reading file ... Error is: "+err);
		    defer.reject(err);
		  }
		  else{
		  	console.log("FileService.readFile():: Successfully read the file ...");
		  	defer.resolve(data);
		  }
		});
	}
	
	return defer.promise;
}