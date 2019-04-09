import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DatawriteService } from '../../../services/datawrite.service';
import { DataloadService } from "../../../services/dataload.service";
import { DatasaveService } from "../../../services/datasave.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  loadingEntry;

  incomeArray;

  expensesArray;

  objectKeys = Object.keys;

  @Input() eodSubmitJSONValue;

  date;

  eodSummary;

  currentBool: boolean;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private dsService: DatasaveService, private dlService: DataloadService, private dwService: DatawriteService) {
    dsService.myBool$.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      this.loadingEntry = false;
      this.sendMessage();
      this.dwService.log(this.dwService.writeLog("ADD", "ENTRY", this.eodSubmitJSONValue), this.dlService.getLogs())
      // this.currentBool = newBool;
     });
  }

  sendMessage() {
    this.messageEvent.emit("close")
  }

  ngOnInit() {

    this.loadingEntry = false;

    this.date = this.dlService.getDate();

    this.eodSummary = this.eodSubmitJSONValue[this.date];

    this.incomeArray = this.eodSummary['income'];

    this.expensesArray = this.eodSummary['expenses'];

    console.log(this.incomeArray);

    console.log(this.expensesArray);


    console.log(this.eodSubmitJSONValue);

    // this.dwService.addEntryToJSON(eodSummary);

    // this.dwService.editEntryToJSON(this.eodSummary, "12/30")
  }

  addSummary() {
    this.loadingEntry = true;

    this.dwService.addEntryToJSON(this.eodSummary);

    // this.dataSaved()
  }

  // dataSaved() {
  //   //console.log.log(this.dsService.getEntrySave())
  //   if (this.dsService.getEntrySave()) {
  //     this.loadingEntry = false;
  //   } else {
  //     //console.log.log("didnt happen");
  //     // setTimeout(this.dataSaved(), 1000);
  //   }
  // }

  readyForSubmit() {
    if (this.incomeArray.length > 0 && this.expensesArray.length > 0) {
      return false
    } else {
      return true
    }
  }

}
