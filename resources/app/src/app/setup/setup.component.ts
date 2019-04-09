import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatasaveService } from "../services/datasave.service";
import { DatawriteService } from "../services/datawrite.service";
import { DataloadService } from '../services/dataload.service';
const uuidv4 = require('uuid/v4');



@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  showSetup;

  activestep;

  step1done;
  step2done;
  step3done;
  step4done;

  @Output() setupSetMessage = new EventEmitter();


  constructor(private dwService: DatawriteService, private dsService: DatasaveService, private router: Router, private dlService: DataloadService) {
    
  }

  ngOnInit() {
    this.step1done = false;
    this.step2done = false;
    this.step3done = false;
    this.step4done = false;
    this.showSetup = true;
    this.activestep = 1;
  }

  toggleSetupModal() {
    this.showSetup = !this.showSetup;
  }

  receiveMessage(step) {
    if (step === "Profile Set") {
      this.step1done = true;
      this.activestep = 2;
    } else if (step === "Defaults Set") {
      this.step2done = true;
      this.activestep = 3;
    } else if (step === "Inventory Set") {
      this.step3done = true;
      this.activestep = 4;
    } else if (step === "Employees Set") {
      this.step4done = true;
      this.showSetup = false;
      this.setupSetMessage.emit("Close");
    }
  }

}
