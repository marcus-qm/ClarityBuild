import { Injectable, NgZone, ViewChild } from '@angular/core';
import { IpcRenderer } from "electron";
import { ElectronService } from 'ngx-electron';
import { InsightsService } from '../services/jsonhelper/insights.service';
import { Observable, Subject } from 'rxjs';
import { DatasaveService } from "../services/datasave.service";

var moment = require('moment');

declare var fs: any;

// import * as masterData from '../../assets/dummy.json';

@Injectable({
  providedIn: 'root'
})
export class DataloadService {

  // @ViewChild(NavComponent)
  // navComponent: NavComponent

  someObservable;

  message: string;

  private ipc: IpcRenderer;

  masterData = {};

  isMasterSet: Observable<boolean>;

  private masterSubject: Subject<boolean>;


  constructor(private dsService: DatasaveService, private iService: InsightsService, private _electronService: ElectronService, private _ngZone: NgZone) {

    this.masterSubject = new Subject<boolean>();

    this.isMasterSet = this.masterSubject.asObservable();

    this.masterSubject.next(false);

    this.playPingPong('getFiles');

    this._electronService.ipcRenderer.on('getFilesResponse', (event, arg) => {
      this._ngZone.run(() => {
        this.masterData = arg;
        this.masterSubject.next(true);
      });
    });

  }


  playPingPong(message) {
    this.masterSubject.next(false);
    this._electronService.ipcRenderer.send(message);
  }

  isMasterDataLoaded() {
    return this.isMasterSet;
  }

  attemptToFetchMasterAgain() {

    this.playPingPong('getFiles');

    this._electronService.ipcRenderer.on('getFilesResponse', (event, arg) => {
      this._ngZone.run(() => {
        this.masterData = arg;
        // console.log("Master Set");
      });
    });

  }


  retryServiceReturn(x) {
    this.attemptToFetchMasterAgain();

  }

  getLogs() {
    return this.masterData['logs'];
  }

  getUserEmployees() {
    return this.masterData['employees'];
  }

  
  getUserSubscription() {
    return this.masterData['subscription'];
  }

  getUserFirstName() {
    return this.masterData['user'].first_name;
  }

  getFirstTimeUser() {
    return this.masterData['user'].first_login;
  }

  getUserLastName() {
    return this.masterData['user'].last_name;
  }

  getUserID() {
    // console.log("called")
    return this.masterData['user'].id;
    // return res
  }

  getUserDOB() {
    return this.masterData['user'].DOB;
  }

  getUserEmail() {
    return this.masterData['user'].email;
  }

  expensePresetsExist() {
    return this.masterData['expenses_presets'].length > 0;
  }


  getExpensePresetLabels() {
    return this.masterData['expenses_presets'];
  }

  getInventory() {
    return this.masterData['inventory'];
  }


  getUserInformation() {
    return this.masterData['user'];
  }

  getBusinessInformation() {

    if (this.isMasterSet) {
      return this.masterData['business'];
    } else {
      setTimeout(this.getBusinessInformation(), 500);
    }

  }


  incomePresetsExist() {
    return this.masterData['income_presets'].length > 0;
  }

  getIncomePresetLabels() {
    return this.masterData['income_presets'];
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  getAllEntries() {
    //console.log.log(this.isEmpty(this.masterData['entry_db']))
    if (this.isEmpty(this.masterData['entry_db'])) {
      return undefined
    } else {
      return this.masterData['entry_db'];
    }

  }

  getEntryForDate(date) {
    //console.log.log(`getEntryForDate called for ${date}`);
    //console.log.log(this.masterData['entry_db'][date] === undefined);
    if (this.isEmpty(this.masterData['entry_db'])) {
      return undefined
    } else {
      if (this.masterData['entry_db'].hasOwnProperty(date)) {
        return this.masterData['entry_db'][date];
      } else {
        return undefined;
      }
    }
  }

  getAllExpenseEntriesByName(name, range) {
    // YTD
    let expenseEntries = [];
    console.log(moment().startOf('year'))
    for (let index = 0; index <= range; index++) {
      let entry = {}
      if (this.masterData['entry_db'][moment().startOf('year').add(index, 'days').format("DD/MM")] !== undefined && this.masterData['entry_db'][moment().startOf('year').add(index, 'days').format("DD/MM")].expenses !== undefined) {
        console.log(this.masterData['entry_db'][moment().startOf('year').add(index, 'days').format("DD/MM")].expenses.length)
        this.masterData['entry_db'][moment().startOf('year').add(index, 'days').format("DD/MM")].expenses.forEach(expense => {
          if (expense.label === name) {
            entry = {
              [moment().startOf('year').add(index, 'days').format("DD/MM")]: {
                label: expense.label,
                value: expense.value
              }
            }
            expenseEntries.push(entry)
          }
        });
      }
    }

    return expenseEntries
  }

  getIncomeFromEntryDate(date) {
    //console.log.log(`getIncomeFromEntryDate called for ${date}`);
    //console.log.log(this.masterData['entry_db'].hasOwnProperty(date));
    if (this.isEmpty(this.masterData['entry_db'])) {
      return undefined
    } else {
      if (this.masterData['entry_db'].hasOwnProperty(date)) {
        return this.masterData['entry_db'][date].income;
      } else {
        return undefined;
      }
    }
  }

  getExpenseFromEntryDate(date) {
    //console.log.log(`getExpenseFromEntryDate called for ${date}`);
    if (this.masterData['entry_db'][date] !== undefined) {
      return this.masterData['entry_db'][date].expenses;
    } else {
      return undefined;
    }

  }

  countBackDatesInterval(startDate, interval) {
    var dateArray = [];
    var currentDate = moment(startDate, 'DD/MM');
    for (let index = 0; index < interval; index++) {
      ////console.log.log(currentDate);
      dateArray.push(moment(currentDate).format('DD/MM'))
      currentDate = moment(currentDate).subtract(1, 'days');
    }
    return dateArray;
  }

  getNullActiveIncome() {
    let labels = this.getIncomePresetLabels();
    //console.log.log(labels);

    let active_labels = labels.filter(label => label.value === true);

    let data = [];
    active_labels.forEach(label => {
      data.push({ "label": label.label, "value": 0 })
    })

    return data;

  }


  findLastEntry() {
    let lastEntryDate;

    for (let index = 0; index < 365; index++) {
      if (this.getEntryForDate(moment().subtract(index, 'days').format("DD/MM")) !== undefined) {
        lastEntryDate = moment().subtract(index, 'days').format("DD/MM");
        console.log(lastEntryDate)
        break;
      }
    }

    return lastEntryDate;

  }

  getIncomesFromEntryRange(date, interval) {
    let incomeRanges = [];
    let incomeEntries = [];
    let incomeReslt = {};

    incomeRanges = [...this.countBackDatesInterval(date, interval)];
    //console.log.log(incomeRanges);


    incomeRanges.forEach(entry => {
      // entry = moment(entry).format("DD/MM");
      let data = {
        "date": entry,
        "income": this.getIncomeFromEntryDate(entry) === undefined ? this.getNullActiveIncome() : this.getIncomeFromEntryDate(entry)
      }


      // ////console.log.log(this.getIncomeFromEntryDate(entry));

      // if (this.getIncomeFromEntryDate(entry) !== undefined) {
      incomeEntries.push(data);
      // }
    })

    // ////console.log.log(incomeRanges);

    return incomeEntries;
  }

  getExpensesFromEntryRange(date) {
    let expensesRanges = [];

    return expensesRanges;
  }

  getTopExpenses(date, x) {
    let days = this.countBackDatesInterval(moment(date, 'DD/MM'), x);
    let expenses = [];
    let data;
    let masterExpenses = [];

    days.forEach(day => {
      let data = {
        "date": day,
        "expenses": this.getExpenseFromEntryDate(day) === undefined ? this.iService.returnNullExpense() : this.getExpenseFromEntryDate(day)
      }

      expenses.push(data);
    })

    ////console.log.log('from dl');
    //console.log.log(expenses);

    data = this.iService.getTopExpense(expenses);

    ////console.log.log(data);


    for (var entry in data) {
      masterExpenses.push([entry, data[entry]]);
    }

    masterExpenses.sort(function (a, b) {
      return b[1] - a[1];
    });

    if (masterExpenses.length == 0 || masterExpenses == undefined) {
      masterExpenses = [];
    }

    return masterExpenses;
  }

  reload(data) {
    ////console.log.log(data);
  }

  getDate() {
    //console.log.log(`called ${moment().format('DD/MM')}`);
    return moment().format('DD/MM');
    // return "30/12";
  }
}
