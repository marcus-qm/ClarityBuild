import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { DataloadService } from "../services/dataload.service";
import { Observable, Subject } from 'rxjs';
var moment = require('moment');




@Injectable({
  providedIn: 'root'
})
export class DatawriteService {

  constructor(private dlService: DataloadService, private _electronService: ElectronService) { }

  addEntryToJSON(payload) {
    //console.log.log(payload);
    this._electronService.ipcRenderer.send('addEntry', payload);
    this.dlService.playPingPong('getFiles');

  }

  addPastEntryToJSON(payload, entrydate) {
    //console.log.log(payload);
    this._electronService.ipcRenderer.send('addPastEntry', payload, entrydate);
    this.dlService.playPingPong('getFiles');

  }

  modifyUserData(payload) {
    //console.log.log(payload);
    this._electronService.ipcRenderer.send('modifyUserData', payload);
    this.dlService.playPingPong('getFiles');

  }

  modifyBusinessData(payload) {
    //console.log.log(payload);
    this._electronService.ipcRenderer.send('modifyBusinessData', payload);
    this.dlService.playPingPong('getFiles');

  }

  setIncomeDefaults(payload) {
    this._electronService.ipcRenderer.send('setIncomeDefaults', payload);
    this.dlService.playPingPong('getFiles');

  }

  setExpenseDefaults(payload) {
    //console.log.log("sent to main");
    this._electronService.ipcRenderer.send('setExpenseDefaults', payload);
    this.dlService.playPingPong('getFiles');


  }

  setAccountID(payload) {
    this._electronService.ipcRenderer.send('setAccountID', payload);
    this.dlService.playPingPong('getFiles');
  }

  modifiyEmployeeList(payload) {
    this._electronService.ipcRenderer.send('modifiyEmployeeList', payload);
    this.dlService.playPingPong('getFiles');


  }

  updateInventory(payload) {
    this._electronService.ipcRenderer.send('updateInventory', payload);
    this.dlService.playPingPong('getFiles');
  }

  log(payload, logList) {
    logList.unshift(payload);
    this._electronService.ipcRenderer.send('log', logList);
    this.dlService.playPingPong('getFiles');
  }

  writeAction(action) {
    let message = "";
    action === "ADD" ? message = "You added" : action === "EDIT" ? message = "You edited" : action === "DELETED" ? message = "You deleted" : ""
    return message
  }

  writeSection(action) {
    let message = "";
    action === "ENTRY" ? message = "an entry" : action === "PROFILE" ? message = "profile information" : action === "BUSINESS" ? message = "business information" : action === "DEFAULTS" ? message = "entry defaults" : action === "EMPLOYEES" ? message = "employee information" : action === "INVENTORY" ? message = "inventory information" : message = ""
    return message
  }

  writeLog(action, section, data?) {
    let log = {};
    let message = "";
    message = `${this.writeAction(action)} ${this.writeSection(section)}`
    log = {
      "time_stamp": moment().format("MM-DD-YYYY hh:mm:ss"),
      "log_message": message,
      "action": action,
      "data": data || null,
      section: section
    }
    return log
  }


}
