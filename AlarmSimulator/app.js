/**
 * This file will be used for starting the Alarm Simulator Application
 * Author: Vamsi Gude
 */
 
 var AlarmServer = require("./app/server/service/AlarmServer");
 var alarmServer = new AlarmServer();
 
alarmServer.startServer();