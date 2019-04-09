import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataloadService } from '../services/dataload.service';
import { QuickviewComponent } from "../home/quickview/quickview.component";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
var moment = require('moment');


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  account_id: Promise<number>;
  account_firstName: Promise<string>;
  showEODModal: boolean;
  showEODModal2: boolean;
  activestep: number;
  message: string;
  incomeValue: any;
  expenseJSON: any;
  eodSubmitJSON;

  editEntryForm: FormGroup;
  modifyEntryForm: FormGroup;

  editEntry;
  newEntry;

  EntryDate;

  date;

  year = moment().format('YYYY');

  @ViewChild(QuickviewComponent)
  qvComponent: QuickviewComponent;

  step1;
  step2;
  step3;
  searching;

  editData;

  masterData;



  constructor(private fb: FormBuilder, private dlService: DataloadService, private cd: ChangeDetectorRef) {
    // ////console.log.log(drService.readfile());

  }



  ngAfterViewInit() {
    // this.cd.detectChanges();
    this.account_firstName = this.dlService.getUserFirstName();
    //console.log(this.account_firstName);
    // this.cd.detectChanges();
    // this.dlService.getUserFirstName().then(data => {
    //   console.log(data)
    // })

    // this.account_firstName = this.dlService.getUserFirstName();
    // this.account_id = this.dlService.getUserID();
    
    // this.getID();
    // this.getName();

  }


  receiveMessage($event) {
    if (this.activestep === 1) {
      this.updateIncomeNode($event);
      this.activestep++;
    } else if (this.activestep === 2) {
      this.updateExpensesNode($event);
      this.activestep++;
    }
    this.message = $event;
    ////console.log.log(this.message);
  }

  receiveEditMessage($event) {
    if ($event["data"] === undefined) {
      this.editData = [];
    } else {
      this.editData = $event["data"];
    }
    this.EntryDate = $event["date"]
    this.step1 = false;
    this.step2 = true;
    // $event["step"]
    // console.log($event);
  }

  closeEvent($event) {
    this.toggleEODModal2();
    
  }


  receiveClose($event) {
    this.toggleEODModal();
    // this.ngOnInit();
    // this.qvComponent.
    // this.qvComponent.
    this.qvComponent.ngOnInit();
    this.qvComponent.chartComponent.ngAfterViewInit();
    // this.qvComponent.detectChanges();
    // this.qvComponent.ngAfterViewInit();
  }


  updateExpensesNode(update) {
    this.eodSubmitJSON[`${this.date}`].expenses = update;
    ////console.log.log(this.eodSubmitJSON);
    this.expenseJSON = update;
  }

  updateIncomeNode(update) {
    ////console.log.log(this.eodSubmitJSON);
    //this will override entire node? is this a good idea? maybe refactor
    this.eodSubmitJSON[`${this.date}`].income = update;
    ////console.log.log(this.eodSubmitJSON);
    this.incomeValue = update;
  }


  receiveEditFinal($event) {
    this.step1 = false;
    this.step2 = false;
    this.step3 = true;

    this.masterData = $event;

  }

  ngOnInit() {

    // console.log("called get files")
    this.dlService.playPingPong("getFiles");

    this.date = this.dlService.getDate();
    //i guess check if there is already a date entry else
    this.eodSubmitJSON = {
      [this.date]: {
        "income": {

        },
        "expenses": {

        }
      }
    };
    this.activestep = 0;
    this.showEODModal = false;
    this.showEODModal2 = false;
    // this.account_id = this.dlService.getUserID();
    // this.account_firstName = this.dlService.getUserFirstName();
    ////console.log.log(this.eodSubmitJSON);

    this.editEntryForm = this.fb.group({
      entry_date: new FormControl(moment().format("YYYY-MM-DD"), [Validators.required])
    })

    this.modifyEntryForm = this.fb.group({

    });

    this.searching = false;
    this.step1 = true;

    this.newEntry = false;
    this.editEntry = false;

    this.cd.detectChanges();
  }

  // searchForEntry() {
  //   this.searching = true;
  //   let date = moment(this.editEntryForm.controls.entry_date.value, "YYYY-MM-DD").format("DD/MM");
  //   let entry = this.dlService.getEntryForDate(date);

  //   if (entry === undefined) {
  //     //new entry but in the past
  //     this.step1 = false;
  //     this.newEntry = true;
  //   } else {
  //     //old entry but needed editting
  //     this.step1 = false; 
  //     this.editEntry = true;
  //   }
  //   // console.log(moment(this.editEntryForm.controls.entry_date.value, "YYYY-MM-DD").format("DD/MM"))
  // }

  // allowSearchForEntry() {
  //   let dpvalue: string;
  //   let thisyear: string;
  //   let today: string
  //   dpvalue = this.editEntryForm.controls.entry_date.value.toString();
  //   thisyear = moment().format("YYYY").toString();
  //   // today = moment().format("DD-MM")
  //   if (dpvalue.includes(thisyear)){
  //     // myForm.setErrors({ 'invalid': true });
  //     this.editEntryForm.setErrors({'invalid': true})
  //     return false
  //   } else {
  //     this.editEntryForm.setErrors(null)
  //     return true
  //   }
  // }

  toggleEODModal() {
    this.showEODModal = !this.showEODModal;
    this.activestep = 1;
  }

  toggleEODModal2() {
    this.showEODModal2 = !this.showEODModal2;
    this.step1 = true;
    this.editEntryForm.reset();
    this.editEntryForm.controls.entry_date.setValue(moment().format("YYYY-MM-DD"));
    this.step2 = false;
    this.step3 = false;
  }

  triggerNext() {
    this.activestep++;
  }

  triggerPrevious() {
    this.activestep--;
  }

  jumptostep(step) {
    this.activestep = step;
  }

  jumptoeditstep(step) {

  }



}
