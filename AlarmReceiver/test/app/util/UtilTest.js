/**
 * Alarm Test File 
 * Author: Vamsi Gude (vamgude)
 */

var assert = require('assert');
var expect = require('expect.js');
var Util = require('../../../app/server/util/Util');

describe('Util Test Suite', function(){
	it('String Trim Test - Positive', function(done){
	 	expect(Util.trim('  test ')).to.equal('test');
	 	done();
	});
});