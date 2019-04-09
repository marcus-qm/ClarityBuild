import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
var moment = require('moment');
import { DataloadService } from '../../../services/dataload.service';


@Component({
  selector: 'app-editstep1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1EditComponent implements OnInit {
  @Output() messageEvent3 = new EventEmitter();

  editEntryForm: FormGroup;
  modifyEntryForm: FormGroup;

  editEntry;
  newEntry;
  
  date;

  year = moment().format('YYYY');

  searching;

  entry;



  constructor(private fb: FormBuilder, private dlService: DataloadService) {
    // ////console.log.log(drService.readfile());

  }

  ngOnInit() {

    this.editEntryForm = this.fb.group({
      entry_date: new FormControl(moment().format("YYYY-MM-DD") ,[Validators.required])
    })

    this.modifyEntryForm = this.fb.group({

    });

    this.searching = false;
    // this.step1 = true;

    this.newEntry = false;
    this.editEntry = false;

  }

  goToEntry() {
    // this.packageIncomeJSON();
    this.messageEvent3.emit({"data": this.entry, "step": 1, "date": this.date});
  }

  searchForEntry() {
    this.searching = true;
    this.date = moment(this.editEntryForm.controls.entry_date.value, "YYYY-MM-DD").format("DD/MM");
    this.entry = this.dlService.getEntryForDate(this.date);

    this.goToEntry();

    // console.log(moment(this.editEntryForm.controls.entry_date.value, "YYYY-MM-DD").format("DD/MM"))
  }

  allowSearchForEntry() {
    let dpvalue: string;
    let thisyear: string;
    let today: string
    dpvalue = this.editEntryForm.controls.entry_date.value.toString();
    thisyear = moment().format("YYYY").toString();
    today = moment();
    // console.log(moment(dpvalue, "YYYY-MM-DD").isSame(today, 'day'))
    // console.log(moment(dpvalue, "YYYY-MM-DD").diff(today, 'days'))
    // today = moment().format("DD-MM")
    if (dpvalue.includes(thisyear) && (moment(dpvalue, "YYYY-MM-DD").diff(today, 'days') < 0 && !moment(dpvalue, "YYYY-MM-DD").isSame(today, 'day'))){
      // myForm.setErrors({ 'invalid': true });
      this.editEntryForm.setErrors({'invalid': true})
      return false
    } else {
      this.editEntryForm.setErrors(null)
      return true
    }
  }

  



}
