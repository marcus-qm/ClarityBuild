import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DataloadService } from "../../../services/dataload.service";
import { DatasaveService } from "../../../services/datasave.service";
import { DatawriteService } from "../../../services/datawrite.service";


@Component({
  selector: 'app-editstep3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3EditComponent implements OnInit {

  @Input() finalSubmit;

  @Output() messageEvent5 = new EventEmitter();

  incomeArray;

  expensesArray;

  date;

  eodSummary;


  payload;



  loadingEntry;

  constructor(private dsService: DatasaveService, private dlService: DataloadService, private dwService: DatawriteService) {
    dsService.myBool$.subscribe((newBool: boolean) => { 
      console.log(newBool);
      this.loadingEntry = false;
      this.sendMessage();
      this.dwService.log(this.dwService.writeLog("EDIT", "ENTRY", this.payload), this.dlService.getLogs())
      // this.currentBool = newBool;
     });
  }
  ngOnInit() {
    this.date;

    this.loadingEntry = false;

    this.setupData(this.finalSubmit)

    console.log(this.finalSubmit)


  }

  setupData(data) {

    console.log(data);
    this.date = data['date'];
    console.log(this.date);


    this.eodSummary = data['data'][`${this.date}`];

        console.log(this.eodSummary)

    this.payload = data['data'];


    this.incomeArray = this.eodSummary['income'];

    this.expensesArray = this.eodSummary['expenses'];

    console.log(this.eodSummary)
    console.log(this.incomeArray)
    console.log(this.expensesArray)

  }

  sendMessage() {
    this.messageEvent5.emit("close")
  }

  addSummary() {
    this.loadingEntry = true;

    this.dwService.addPastEntryToJSON(this.payload, this.date);

    // this.dataSaved()
  }

}
