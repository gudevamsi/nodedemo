/*
*	Alarm Model file.
*	Author: Vamsi Gude
*/

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
