import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { DataloadService } from '../../services/dataload.service';
import { ChartComponent } from "../../home/quickview/chart/chart.component";
import { DatasaveService } from "../../services/datasave.service";
var moment = require('moment');

// import {  }

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.css']
})
export class QuickviewComponent implements OnInit, AfterViewInit {

  @ViewChild(ChartComponent)
  chartComponent: ChartComponent;

  myChartid = "myChart";

  myChartid2 = "myChart2";

  // myChartid3 = "myChart3";
  businessInfo;

  employeesCount;

  myChart1label = 'GHC Income';

  myChart2label = 'Top Expenses';

  yesterdaysEntry;

  yesterdaysEntryLabels;

  yesterdaysEntryValues;

  xEntryLabels;

  xEntryValues;

  update;

  topExpenses;

  topExpensesLabels;

  topExpensesValues;

  lastXentries;

  date;

  ngAfterViewInit() {

    //console.log.log(this.chartComponent);


  }

  constructor(private dsService: DatasaveService, private dlService: DataloadService, private cd: ChangeDetectorRef) {
    dlService.isMasterSet.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      if (newBool) {
        // this.updatingEmployees = false;
        // this.employeeList = this.dlService.getUserEmployees();
        // this.sendBusinessMessage();  
        // this.resetBusinessInformationForm();
        console.log('entry saved');
        this.ngOnInit();
      }
   })
   }

  ngOnInit() {

    //console.log.log("called again")

    this.update = [];

    this.date = this.dlService.getDate();

    this.businessInfo = this.dlService.getBusinessInformation();

    let employees = this.dlService.getUserEmployees()
    this.employeesCount = employees.length;
    // this.yesterdaysEntry = this.dlService.getEntryForDate(this.date);

    //console.log(this.dlService.getEntryForDate(this.date));

    this.yesterdaysEntryLabels = [];

    this.yesterdaysEntryValues = [];

    this.xEntryLabels = [];

    this.xEntryValues = [];


    //console.log(this.dlService.getAllEntries().length)

    //console.log.log(this.dlService.getAllEntries())


    if (this.dlService.getAllEntries() !== undefined) {

      //console.log(this.dlService.getAllEntries().length)

      let range = moment(this.dlService.getDate(), "DD/MM").diff(moment(this.dlService.findLastEntry(), "DD/MM"), 'days');

      if (range < 10) {
        range = 10
      } else if (range < 25) {
        range = 25
      } else if (range < 50) {
        range = 50
      } else {
        range = 100
      }
      
      this.lastXentries = this.dlService.getIncomesFromEntryRange(this.date, range);
  
      // console.log(this.lastXentries);
  
      for (var key in this.lastXentries) {
  
        this.xEntryLabels.push(this.lastXentries[key].date);

        // console.log(this.lastXentries[key].income.length)
        // this.lastXentries[key].income.forEach((incomeEntry) => {
        //   console.log(incomeEntry);
        // })
        this.xEntryValues.push(this.getIncomeTally(this.lastXentries[key].income));
  
      }



      // console.log(this.xEntryLabels)
      // console.log(this.xEntryValues)    
    } else {

      this.xEntryLabels = [];

      this.xEntryValues = [];

      // this.xEntryLabels.push(undefined);
      // this.xEntryValues.push(undefined);

  
      
    }

    
    if (this.dlService.getAllEntries() !== undefined) {

    this.topExpenses = [];

    this.topExpensesLabels = [];

    this.topExpensesValues = [];
    
    this.topExpenses = this.dlService.getTopExpenses(moment(), moment().diff(moment().startOf('year'), 'days'));

    for (var key in this.topExpenses) {

      //console.log(this.topExpenses[key][0]);
      //console.log(this.topExpenses[key][1]);

      this.topExpensesLabels.push(this.topExpenses[key][0]);
      this.topExpensesValues.push(this.topExpenses[key][1]);

    }

  } else {

    this.topExpenses = [];

    this.topExpensesLabels = [];

    this.topExpensesValues = [];

    // this.topExpensesLabels.push(this.topExpenses);
    // this.topExpensesValues.push(this.topExpenses);

  }
    this.cd.detectChanges();

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
    chart.data.labels.splice(0, chart.data.labels.length)
    // chart.data.labels.pop();
    //console.log("After pop");
    //console.log(chart.data.datasets)
    chart.data.datasets.forEach((dataset) => {
      dataset.data.splice(0, dataset.data.length);
    });
    //console.log(chart.data.datasets)

    chart.update();
  }

  getIncomeTally(data) {

    let sum = data.reduce(function(result,item) {
      // console.log(result)
      // console.log(item)
      return result + item.value;
     }, 0);

     return sum;

  }


  getIncomeEntries(event, forced?) {
    //console.log.log("suspect");
    if (forced) {
      this.lastXentries = this.dlService.getIncomesFromEntryRange(this.date, event);
    } else {
      this.lastXentries = this.dlService.getIncomesFromEntryRange(this.date, event.target.value);
    }

    //console.log(this.lastXentries);

    this.xEntryLabels = [];

    this.xEntryValues = [];

    this.removeData(this.chartComponent.myChart);

    //console.log(this.chartComponent.myChart);

    for (var key in this.lastXentries) {

      console.log(this.lastXentries[key]);
      this.xEntryLabels.push(this.lastXentries[key].date);
      this.xEntryValues.push(this.lastXentries[key].income[0].value);

      this.addData(this.chartComponent.myChart, this.lastXentries[key].date, this.lastXentries[key].income[0].value)

    }

    // this.removeData(this.chartComponent.myChart);

    // this.addData(this.chartComponent.myChart, this.xEntryLabels, this.xEntryValues)

    // this.chartComponent.data.datasets = [];
    // this.chartComponent.myChart.labels = [];

    // this.chartComponent.myChart.data.datasets = this.xEntryValues;
    // this.chartComponent.myChart.labels = this.xEntryLabels;

    // this.chartComponent.myChart.update();

    //console.log(this.chartComponent.myChart);

    // this.update(this.xEntryLabels, this.xEntryValues);

    //console.log(this.update);

  }


}
