import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataloadService } from "../../services/dataload.service";
var moment = require('moment');
const uuidv4 = require('uuid/v4');
import { ChartComponent } from "../../home/quickview/chart/chart.component";
import * as Chart from 'chart.js';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';



@Component({
  selector: 'app-costinsights',
  templateUrl: './costinsights.component.html',
  styleUrls: ['./costinsights.component.css']
})
export class CostinsightsComponent implements OnInit {

  // @ViewChild(ChartComponent)
  // chartComponent: ChartComponent;

  canvas: any;
  ctx: any;
  myChart: any;

  myChartid;

  myChart2id;

  myChart1label;

  myChart2label;

  entryDetails;

  employees;

  employeesDisplay;

  forecasttally;

  year = moment().format("YYYY")

  expenseBreakdownForm;

  inventoryCalculatoryForm: FormGroup;


  date;

  topExpenses;

  showTEModal;

  xEntryLabels;

  minEntry;

  maxEntry;

  searching;

  xEntryValues;

  lastXentries;

  basis;

  basisTally;

  inventory;

  chartTypeTE;

  message;

  chartTypeEB;

  ebLabels;

  ebValues;

  entry;

  objectKeys = Object.keys;

  constructor(private fb: FormBuilder, private dlService: DataloadService) { }

  ngOnInit() {
    this.forecasttally = 0;
    this.basis = "Weekly";
    this.basisTally = 0;
    this.message = "Choose a Day";
    this.myChartid = "topTE";
    this.myChart2id = "ebChart";
    this.myChart1label = "";
    this.myChart2label = "";
    this.searching = false;
    this.chartTypeTE = "line";
    this.chartTypeEB = "pie";
    this.employees = this.dlService.getUserEmployees();
    this.employeesDisplay = this.dlService.getUserEmployees();
    if (this.employees.length > 0) {
      let tally = 0;
      this.employeesDisplay.forEach(employee => {
        //TODO: redo after allowing for hours of operations!!
        if (employee.salary.time_interval !== this.basis) {
          if (employee.salary.time_interval === "Hourly") {
            tally += (employee.salary.unit * 40)
          }
          if (employee.salary.time_interval === "Daily") {
            tally += (employee.salary.unit * 14)
          }
          if (employee.salary.time_interval === "Monthly") {
            tally += (employee.salary.unit / 4)
          }
          if (employee.salary.time_interval === "Yearly") {
            tally += (employee.salary.unit / 52)
          }
        } else {
          tally += employee.salary.unit
        }
      });
      this.basisTally = tally;
    }
    // console.log(this.employees);
    this.expenseBreakdownForm = this.fb.group({
      entry_date: new FormControl(moment().format("YYYY-MM-DD"), [Validators.required])
    })
    this.inventoryCalculatoryForm = this.fb.group({

    })
    // this.minEntry =
    this.showTEModal = false;
    this.topExpenses = this.dlService.getTopExpenses(moment(), moment().diff(moment().startOf('year'), 'days'));
    this.inventory = this.dlService.getInventory();
    if (this.inventory.length) {
      this.inventory.forEach(item => {
        this.inventoryCalculatoryForm.addControl(item.label, new FormControl(0, [Validators.required, Validators.min(0)]))
      });
      this.inventoryCalculatoryForm.valueChanges.subscribe((changes) => {
        let tally = 0;
        this.inventory.forEach((inventoryItem, index) => {
          if (inventoryItem.label === this.objectKeys(changes)[index]) {
            let minTally = 0;
            minTally = inventoryItem.cost * changes[this.objectKeys(changes)[index]];
            tally += minTally;
          }
        })
        this.forecasttally = tally;
      })
    }



  }


  changeBasis(e) {
    this.basis = e.target.value;

    let tally = 0;
    this.employees.forEach(employee => {
      //TODO: redo after allowing for hours of operations!!
      if (employee.salary.time_interval !== this.basis) {
        if (this.basis === "Hourly") {
          if (employee.salary.time_interval === "Daily") {
            tally += (employee.salary.unit / 8)
          }
          if (employee.salary.time_interval === "Weekly") {
            tally += (employee.salary.unit / 40)
          }
          if (employee.salary.time_interval === "Monthly") {
            //off slightly
            tally += (employee.salary.unit / 173)
          }
          if (employee.salary.time_interval === "Yearly") {
            tally += (employee.salary.unit / 2080)
          }
        }
        if (this.basis === "Daily") {
          if (employee.salary.time_interval === "Hourly") {
            tally += (employee.salary.unit * 8)
          }
          if (employee.salary.time_interval === "Weekly") {
            //depends on hours of operation
            tally += (employee.salary.unit / 7)
          }
          if (employee.salary.time_interval === "Monthly") {
            //off slightly
            tally += (employee.salary.unit / 28)
          }
          if (employee.salary.time_interval === "Yearly") {
            tally += (employee.salary.unit / 365)
          }
        }
        if (this.basis === "Weekly") {
          if (employee.salary.time_interval === "Hourly") {
            tally += (employee.salary.unit * 40)
          }
          //depends on Hours of operation
          if (employee.salary.time_interval === "Daily") {
            tally += (employee.salary.unit * 7)
          }
          if (employee.salary.time_interval === "Monthly") {
            //off slightly
            tally += (employee.salary.unit / 4)
          }
          if (employee.salary.time_interval === "Yearly") {
            tally += (employee.salary.unit / 52)
          }
        }
        if (this.basis === "Monthly") {
          if (employee.salary.time_interval === "Hourly") {
            tally += (employee.salary.unit * 40 * 4)
          }
          if (employee.salary.time_interval === "Daily") {
            //this is off slightly
            tally += (employee.salary.unit * 28)
          }
          if (employee.salary.time_interval === "Weekly") {
            tally += (employee.salary.unit * 4)
          }
          if (employee.salary.time_interval === "Yearly") {
            tally += (employee.salary.unit / 12)
          }
        }
        if (this.basis === "Yearly") {
          if (employee.salary.time_interval === "Hourly") {
            tally += (employee.salary.unit * 2080)
          }
          if (employee.salary.time_interval === "Daily") {
            tally += (employee.salary.unit * 365)
          }
          if (employee.salary.time_interval === "Weekly") {
            tally += (employee.salary.unit * 52)
          }
          if (employee.salary.time_interval === "Monthly") {
            tally += (employee.salary.unit * 12)
          }
        }
      } else {
        tally += employee.salary.unit
      }
      // console.log(employee.salary.unit)
      // console.log(employee.salary.time_interval)
    });
    this.basisTally = tally;

    // console.log(e.target.value)
  }


  openTEChart(expenseName) {
    this.myChart1label = expenseName;
    let ExpenseEntriesByName = this.dlService.getAllExpenseEntriesByName(expenseName, moment().diff(moment().startOf('year'), 'days'));
    this.toggleTEModal();
    this.formatTEData(ExpenseEntriesByName);
  }

  toggleTEModal() {
    this.showTEModal = !this.showTEModal;
  }

  calculateAdjustment(e, employee) {

    const employeeList = this.dlService.getUserEmployees();

    const _employee = {
      "active": employee.active,
      "age": employee.age,
      "dob": employee.dob,
      "hired_date": employee.hired_date,
      "id": employee.id,
      "name": employee.name,
      "salary": {
        "time_interval": employee.salary.time_interval,
        "unit": 0
      },
      "title": employee.title
    };

    let newSalary = 0;

    let foundIndex = 0;

    let updatedEmployeeList = [];

    let key = [];

    for (let index = 0; index < this.employees.length; index++) {
      if (this.employees[index].id === _employee.id) {
        key.push(employeeList[index]);
        foundIndex = employeeList.indexOf(employee);
      }
    }

    if (key.length > 0) {
      newSalary = key[0].salary.unit * e.target.value;
    }

    // console.log(updatedEmployeeList);
    // console.log(foundIndex);
    _employee.salary.unit = newSalary;
    // console.log(_employee)
    // console.log(employeeList)

    // this.employeesDisplay.splice(foundIndex, 0, _employee);

    let tally = 0;
    // console.log(this.basis);
    this.employeesDisplay.forEach(employee => {
      if (employee.id === _employee.id) {
        employee = _employee
      }
      //TODO: redo after allowing for hours of operations!!
      if (employee.salary.time_interval !== this.basis) {
        if (this.basis === "Hourly") {
          if (employee.salary.time_interval === "Daily") {
            tally += (employee.salary.unit / 8)
          }
          if (employee.salary.time_interval === "Weekly") {
            tally += (employee.salary.unit / 40)
          }
          if (employee.salary.time_interval === "Monthly") {
            //off slightly
            tally += (employee.salary.unit / 173)
          }
          if (employee.salary.time_interval === "Yearly") {
            tally += (employee.salary.unit / 2080)
          }
        }
        if (this.basis === "Daily") {
          if (employee.salary.time_interval === "Hourly") {
            tally += (employee.salary.unit * 8)
          }
          if (employee.salary.time_interval === "Weekly") {
            //depends on hours of operation
            tally += (employee.salary.unit / 7)
          }
          if (employee.salary.time_interval === "Monthly") {
            //off slightly
            tally += (employee.salary.unit / 28)
          }
          if (employee.salary.time_interval === "Yearly") {
            tally += (employee.salary.unit / 365)
          }
        }
        if (this.basis === "Weekly") {
          //depends on Hours of operation
          if (employee.salary.time_interval === "Daily") {
            tally += (employee.salary.unit * 7)
          }
          if (employee.salary.time_interval === "Hourly") {
            console.log("hitting")
            tally += (employee.salary.unit * 40)
          }
          if (employee.salary.time_interval === "Monthly") {
            //off slightly
            tally += (employee.salary.unit / 4)
          }
          if (employee.salary.time_interval === "Yearly") {
            tally += (employee.salary.unit / 52)
          }
        }
        if (this.basis === "Monthly") {
          if (employee.salary.time_interval === "Hourly") {
            tally += (employee.salary.unit * 40 * 4)
          }
          if (employee.salary.time_interval === "Daily") {
            //this is off slightly
            tally += (employee.salary.unit * 28)
          }
          if (employee.salary.time_interval === "Weekly") {
            tally += (employee.salary.unit * 4)
          }
          if (employee.salary.time_interval === "Yearly") {
            tally += (employee.salary.unit / 12)
          }
        }
        if (this.basis === "Yearly") {
          if (employee.salary.time_interval === "Hourly") {
            tally += (employee.salary.unit * 2080)
          }
          if (employee.salary.time_interval === "Daily") {
            tally += (employee.salary.unit * 365)
          }
          if (employee.salary.time_interval === "Weekly") {
            tally += (employee.salary.unit * 52)
          }
          if (employee.salary.time_interval === "Monthly") {
            tally += (employee.salary.unit * 12)
          }
        }
      } else {
        tally += employee.salary.unit
      }
      // console.log(employee.salary.unit)
      // console.log(employee.salary.time_interval)
    });
    this.basisTally = tally;
  }

  searchForEntry() {
    let tally = 0;
    this.searching = true;
    this.ebLabels = [];
    this.ebValues = [];
    this.date = moment(this.expenseBreakdownForm.controls.entry_date.value, "YYYY-MM-DD").format("DD/MM");
    this.entry = this.dlService.getExpenseFromEntryDate(this.date);
    console.log(this.entry)
    if (this.entry !== undefined) {
      this.entry.forEach(element => {
        tally += element.value
      });
      this.entryDetails = {
        date: this.date,
        value: tally
      }
      // this.goToEntry();
      console.log(this.entry);

      for (var key in this.entry) {

        console.log(this.entry[key].label);
        console.log(this.entry[key].value)

        this.ebLabels.push(this.entry[key].label);
        this.ebValues.push(this.entry[key].value);

      }

      this.searching = false;
      this.message = "Choose a Day";
    } else {
      this.message = "No entry found!";
      this.searching = false;

    }

  }


  allowSearchForEntry() {
    let dpvalue: string;
    let thisyear: string;
    let today: string
    dpvalue = this.expenseBreakdownForm.controls.entry_date.value.toString();
    thisyear = moment().format("YYYY").toString();
    today = moment();
    // console.log(moment(dpvalue, "YYYY-MM-DD").isSame(today, 'day'))
    // console.log(moment(dpvalue, "YYYY-MM-DD").diff(today, 'days'))
    // today = moment().format("DD-MM")
    if (dpvalue.includes(thisyear) && (moment(dpvalue, "YYYY-MM-DD").diff(today, 'days') < 0 && !moment(dpvalue, "YYYY-MM-DD").isSame(today, 'day'))) {
      // myForm.setErrors({ 'invalid': true });
      this.expenseBreakdownForm.setErrors({ 'invalid': true })
      return false
    } else {
      this.expenseBreakdownForm.setErrors(null)
      return true
    }
  }

  formatTEData(ExpenseEntriesByName) {
    //console.log.log("suspect");
    this.lastXentries = ExpenseEntriesByName;

    console.log(this.lastXentries);

    // this.setMetrics(this.lastXentries)

    this.xEntryLabels = [];

    this.xEntryValues = [];

    this.minEntry = {
      date: "",
      value: 0
    }

    this.maxEntry = {
      date: "",
      value: 0
    }

    // this.removeData(this.chartComponent.myChart);

    for (var key in this.lastXentries) {
      if (key == "0") {
        this.minEntry.date = Object.keys(ExpenseEntriesByName[key])[0];
        this.minEntry.value = ExpenseEntriesByName[key][Object.keys(ExpenseEntriesByName[key])[0]].value;
        this.maxEntry.date = Object.keys(ExpenseEntriesByName[key])[0];
        this.maxEntry.value = ExpenseEntriesByName[key][Object.keys(ExpenseEntriesByName[key])[0]].value;

      }
      if (parseInt(key) > 0) {
        if (ExpenseEntriesByName[key][Object.keys(ExpenseEntriesByName[key])[0]].value < this.minEntry.value) {
          this.minEntry.date = Object.keys(ExpenseEntriesByName[key])[0];
          this.minEntry.value = ExpenseEntriesByName[key][Object.keys(ExpenseEntriesByName[key])[0]].value
        }
        if (ExpenseEntriesByName[key][Object.keys(ExpenseEntriesByName[key])[0]].value > this.maxEntry.value) {
          this.maxEntry.date = Object.keys(ExpenseEntriesByName[key])[0];
          this.maxEntry.value = ExpenseEntriesByName[key][Object.keys(ExpenseEntriesByName[key])[0]].value
        }
      }
      // console.log(ExpenseEntriesByName[key][Object.keys(ExpenseEntriesByName[key])[0]].value)
      // console.log(Object.keys(ExpenseEntriesByName))
      // console.log(Object.keys(ExpenseEntriesByName[key]))
      // console.log(Object.keys(Object.keys(ExpenseEntriesByName)))
      this.xEntryLabels.push(Object.keys(ExpenseEntriesByName[key]));
      this.xEntryValues.push(ExpenseEntriesByName[key][Object.keys(ExpenseEntriesByName[key])[0]].value);

      // this.addData(this.chartComponent.myChart, this.xEntryLabels, this.xEntryValues)
    }

    console.log(this.minEntry);
    console.log(this.maxEntry);

  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart) {
    //console.log("in remove");
    //console.log(chart.data.labels)
    if (chart !== undefined) {
      if (chart.data.labels !== undefined && chart.data.labels.length > 0) {
        chart.data.labels.splice(0, chart.data.labels.length)
      }
      if (chart.data.datasets !== undefined && chart.data.datasets.length > 0) {
        chart.data.datasets.forEach((dataset) => {
          dataset.data.splice(0, dataset.data.length);
        });
      }
    }
    //console.log(chart.data.datasets)

    chart.update();
  }


}
