import { Component, OnInit } from '@angular/core';
import { DataloadService } from "../services/dataload.service";
import { DatawriteService } from "../services/datawrite.service";
var moment = require('moment');


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  monthsThisYear;

  logs;

  masterLogs;

  displayLogs;

  objectKeys = Object.keys;

  monthSelected;

  items;

  showData;

  logMonths;

  MASTERLOGDATA;

  EMPLOYEE;

  INVENTORY;

  constructor(private dwService: DatawriteService, private dlService: DataloadService) { }

  ngOnInit() {
    this.showData = false;
    this.EMPLOYEE = false;
    this.INVENTORY = false;
    this.MASTERLOGDATA = [];
    this.logMonths = [];
    this.logs = this.dlService.getLogs();
    this.masterLogs = this.formatLogs(this.logs);
    console.log(this.objectKeys(this.masterLogs)[0])
    this.monthSelected = moment(this.objectKeys(this.masterLogs)[0], 'MMMM').format('MMMM');

    this.displayLogs = this.fetchLogs(this.monthSelected);
    console.log(this.displayLogs)

    this.items = this.displayLogs;

    this.objectKeys(this.masterLogs).forEach((month) => {
      this.logMonths.push(month);
    })
    console.log(this.logMonths);


  }

  fetchLogs(month) {
    if (this.masterLogs[month] !== undefined && this.masterLogs[month].length > 0) {
      return this.masterLogs[month];
    } else {
      return 0
    }
  }

  openData(data, section) {
    this.showData = true;
    this.MASTERLOGDATA = data;
    section == "EMPLOYEES" ? this.EMPLOYEE = true : section == "INVENTORY" ? this.INVENTORY = true : null

  }

  toggleShowData() {
    this.EMPLOYEE = false;
    this.INVENTORY = false;
    this.MASTERLOGDATA = [];
    this.showData = !this.showData;
  }

  formatLogs(logs) {
    let masterReturn = [];
    logs.forEach(log => {
      if (masterReturn.hasOwnProperty(moment(log.time_stamp).format('MMMM'))) {
        masterReturn[moment(log.time_stamp).format('MMMM')].push(log)
      } else {
        masterReturn[moment(log.time_stamp).format('MMMM')] = [];
        masterReturn[moment(log.time_stamp).format('MMMM')].push(log);
      }
    });

    return masterReturn;
  }

  getLogsForMonth(event) {
    console.log(this.fetchLogs(event.target.value));
    // let x =  event.target.value;
    this.items = this.fetchLogs(event.target.value);
    this.monthSelected = moment(event.target.value, 'MMMM').format('MMMM');
    // this.monthSelected = moment(event.target.value).format('MMMM');


  }

}
