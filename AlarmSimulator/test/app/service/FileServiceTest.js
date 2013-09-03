/*
*	File Read Service Test.
*	Author: Vamsi Gude
*/

var assert = require('assert');
var should = require('should');
var FileService = require('../../../app/server/service/FileService');


var filesvc = new FileService();

describe('File Service Test Suite', function(){
	it('File Read Test - Positive', function(done){
		var promise = filesvc.readFile('../../../app/server/resources/alarms_csv.txt');
		promise.then(function(data){
			console.log('FileServiceTest.readFilePositive:: Receievd output ...');
			
			var valid = data.length>0?true:false;
			valid.should.be.true;	
				
			data.should.not.be.empty;		
			done();
		}, function(err){
			console.log('FileServiceTest.readFilePositive:: Receievd error ...'+err);		
			should.not.exist(err);		
			done();
		});	
	});
	
	it('File Read Test - Negative', function(done){
		var promise = filesvc.readFile('../../../app/server/resources/abc.txt');
		promise.then(function(data){
			console.log('FileServiceTest.readFileNegative:: received data ... data should not present ... ');
			should.not.exist(data);
			done();
		}, function(err){	
			console.log('FileServiceTest.readFileNegative:: received error: '+err+'\nExpected result...');
			err.name.should.not.be.empty;
			done();
		});	
	});
});