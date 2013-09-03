/*
*	Alarm Model file.
*	Author: Vamsi Gude
*/
var lutil = require("../util/Util");
var parser = require('xml2json');

module.exports = Alarm;

function Alarm(alrm){
	var tmp = alrm || 0;
	this.hostName = tmp.hostName || '';
	this.rack = tmp.rack || '';
	this.shelf = tmp.shelf || '';
	this.slot = tmp.slot || '';
	this.ppmHolder  = tmp.ppmHolder || '';
	this.port = tmp.port || '';
	this.nativeAlarmCause= tmp.nativeAlarmCause || '';
	this.serviceAffectibility= tmp.serviceAffectibility || '';
	this.severity = tmp.severity || '';
	this.interfaceName = tmp.interfaceName || '';
	this.alarmCondition = tmp.alarmCondition || '';
	this.objectType = tmp.objectType || '';
	this.netime = tmp.netime || '';
	this.cleared = tmp.cleared || '';
	return this;
}

Alarm.prototype.parseAlarm = function(data){
	var alarm = new Alarm();
	console.log('Alarm.parseAlarm():: Formatting: '+data);
	if(data == null || lutil.trim(data) == ''){
		console.log('Alarm.parseAlarm():: Passed data is empty .. returning blank alarm ..');
		return alarm;
	}
	
	if(data.indexOf(',')>0){
		var arr = data.split(',');
		for(var i=0; i<arr.length; i++){
			var token = arr[i];
			var sarr = token.split('=');
			
			if(sarr[0] == 'hostName'){
				if(sarr.length == 1){
					alarm.hostName ='';
				}
				else{
					alarm.hostName = sarr[1];
				}
			}
			else if(sarr[0] == 'rack'){
				if(sarr.length == 1){
					alarm.rack ='';
				}
				else{
					alarm.rack = sarr[1];
				}
			}
			else if(sarr[0] == 'shelf'){
				if(sarr.length == 1){
					alarm.shelf ='';
				}
				else{
					alarm.shelf = sarr[1];
				}
			}
			else if(sarr[0] == 'slot'){
				if(sarr.length == 1){
					alarm.slot ='';
				}
				else{
					alarm.slot = sarr[1];
				}
			}
			else if(sarr[0] == 'ppmHolder'){
				if(sarr.length == 1){
					alarm.ppmHolder ='';
				}
				else{
					alarm.ppmHolder = sarr[1];
				}
			}
			else if(sarr[0] == 'port'){
				if(sarr.length == 1){
					alarm.port ='';
				}
				else{
					alarm.port = sarr[1];
				}
			}
			else if(sarr[0] == 'nativeAlarmCause'){
				if(sarr.length == 1){
					alarm.nativeAlarmCause ='';
				}
				else{
					alarm.nativeAlarmCause = sarr[1];
				}
			}
			else if(sarr[0] == 'serviceAffectibility'){
				if(sarr.length == 1){
					alarm.serviceAffectibility ='';
				}
				else{
					alarm.serviceAffectibility = sarr[1];
				}
			}
			else if(sarr[0] == 'severity'){
				if(sarr.length == 1){
					alarm.severity ='';
				}
				else{
					alarm.severity = sarr[1];
				}
			}
			else if(sarr[0] == 'interfaceName'){
				if(sarr.length == 1){
					alarm.interfaceName ='';
				}
				else{
					alarm.interfaceName = sarr[1];
				}
			}
			else if(sarr[0] == 'alarmCondition'){
				if(sarr.length == 1){
					alarm.alarmCondition ='';
				}
				else{
					alarm.alarmCondition = sarr[1];
				}
			}
			else if(sarr[0] == 'objectType'){
				if(sarr.length == 1){
					alarm.objectType ='';
				}
				else{
					alarm.objectType = sarr[1];
				}
			}
			else if(sarr[0] == 'netime'){
				if(sarr.length == 1){
					alarm.netime ='';
				}
				else{
					alarm.netime = sarr[1];
				}
			}
			else if(sarr[0] == 'cleared'){
				if(sarr.length == 1){
					alarm.cleared ='';
				}
				else{
					alarm.cleared = sarr[1];
				}
			}
		}
		return alarm;
	}
	else{
		console.log('Alarm.parseAlarm():: data is not separated by comma(,) ... invalid data format ... Returning blank alarm');
		return alarm;
	}	
}

Alarm.prototype.toJson = function(){
	var self = this;
	var xml =   '<alarm>'+
				'<hostName>'+self.hostName+'</hostName>'+
				'<rack>'+self.rack+'</rack>'+
				'<shelf>'+self.shelf+'</shelf>'+
				'<slot>'+self.slot+'</slot>'+
				'<ppmHolder>'+self.ppmHolder+'</ppmHolder>'+
				'<port>'+self.port+'</port>'+
				'<nativeAlarmCause>'+self.nativeAlarmCause+'</nativeAlarmCause>'+
				'<serviceAffectibility>'+self.serviceAffectibility+'</serviceAffectibility>'+
				'<severity>'+self.severity+'</severity>'+
				'<interfaceName>'+self.interfaceName+'</interfaceName>'+
				'<alarmCondition>'+self.alarmCondition+'</alarmCondition>'+
				'<objectType>'+self.objectType+'</objectType>'+
				'<cleared>'+self.cleared+'</cleared>'+
				'<netime>'+self.netime+'</netime>'+
				'</alarm>';
	var json = parser.toJson(xml);
	return json;			
}

Alarm.prototype.print = function(){
	var self = this;
	console.log('Alarm {');
	console.log('\tHostName: '+self.hostName);
	console.log('\tRack: '+self.rack);
	console.log('\tShelf: '+self.shelf);
	console.log('\tSlot: '+self.slot);
	console.log('\tPPM Holder: '+self.ppmHolder);
	console.log('\tPort: '+self.port);
	console.log('\tnativeAlarmCaude: '+self.nativeAlarmCause);
	console.log('\tserviceAffectibility: '+self.serviceAffectibility);
	console.log('\tseverity: '+self.severity);
	console.log('\tInterface Name: '+self.interfaceName);
	console.log('\talarmCondition: '+self.alarmCondition);
	console.log('\tObject Type: '+self.objectType);
	console.log('\tNE Time: '+self.netime);
	console.log('\tCleared: '+self.cleared);
	console.log('}');
}

Alarm.prototype.formatKey = function(){
	var self = this;
	console.log('Alarm.formatKey():: Preparing alarm key ...');
	var tmp = self.hostName+self.rack+self.shelf+self.slot+self.ppmHolder+self.port+self.serviceAffectibility+self.severity+self.interfaceName+self.alarmCondition+self.objectType+self.netime+self.cleared;
	tmp = tmp.replace(/-/g, '');
	tmp = tmp.replace(/:/g, '');
	tmp = tmp.replace(/ /g, '');
	tmp = tmp.replace(/_/g, '');
	tmp = tmp.replace(/\./g, '');
	console.log('Alarm.formatKey():: Formatted key is: '+tmp);
	return tmp;
}