import { Injectable } from '@angular/core';
var moment = require('moment');




@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  expensesMaster;

  topExpenses;

  masterReturn;

  masterReturn1;


  constructor() {
    // this.getExpenses();
  }

  // getExpenses() {
  //   this.expensesMaster = this.dlService.getAllEntries();
  // }

  getTopExpense(data) {

    ////console.log.log(data);

    let expenses = data;
    // let days = this.dlService.countBackDatesInterval(moment(this.date, 'DD/MM') , x);
    let masterExpenses = {};

    this.masterReturn = [];

    //console.log.log(expenses);

    expenses.forEach(expense => {
      let entry = expense.expenses;

      //console.log.log(entry.length);

      if (typeof entry === 'object' && entry !== null) {
        entry = Object.values(entry);
      }

      entry.forEach(e => {
        //console.log.log(e);
        this.masterReturn.push(e);
      })

    })

    this.masterReturn1 = this.masterReturn.reduce((a, b) => {
      a[b.label] = (a[b.label] || 0) + b.value;
      return a;
    }, {});

    // ////console.log.log(this.masterReturn1);

    return this.masterReturn1;

  }

  returnNullIncome() {

  }

  returnNullExpense() {
    let x = [
      // {
      //     "label": "Rent",
      //     "value": 0
      // },
      // {
      //     "label": "Gas",
      //     "value": 0
      // },
      // {
      //     "label": "Electricity",
      //     "value": 0
      // },
      // {
      //     "label": "Internet",
      //     "value": 0
      // },
      // {
      //     "label": "Wages",
      //     "value": 0
      // },
      // {
      //     "label": "Drawings",
      //     "value": 0
      // },
      // {
      //     "label": "Inventory",
      //     "value": 0
      // },
      // {
      //     "label": "Petrol",
      //     "value": 0
      // }
  ]
  return x;
  }


}
