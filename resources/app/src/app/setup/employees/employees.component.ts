import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataloadService } from "../../services/dataload.service";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { DatasaveService } from "../../services/datasave.service";
import { DatawriteService } from "../../services/datawrite.service";
var moment = require('moment');

const uuidv4 = require('uuid/v4');



@Component({
  selector: 'setup-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class SetupEmployeesComponent implements OnInit {
  addEmployeeForm;

  employeeList;

  updatingEmployeeList;

  @Output() employeeSetMessage = new EventEmitter();

  constructor(private dsService: DatasaveService, private dwService: DatawriteService, private fb: FormBuilder, private dlService: DataloadService) {
    dsService.myBool4$.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      if (newBool) {
        this.updatingEmployeeList = false;
        this.dwService.log(this.dwService.writeLog("ADD", "EMPLOYEES", this.employeeList), this.dlService.getLogs())
        this.employeeSetMessage.emit("Employees Set");
        // this.employeeList = this.dlService.getUserEmployees();
        // this.sendBusinessMessage();  
        // this.resetBusinessInformationForm();
      }
   })
  }

  ngOnInit() {
    this.updatingEmployeeList = false;

    this.employeeList = [];

    this.addEmployeeForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      position: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      dob: new FormControl(null, [Validators.required]),
      hired_on: new FormControl(moment().format("YYYY-MM-DD"), [Validators.required]),
      salary: new FormControl(0, [Validators.required, Validators.minLength(0), Validators.min(0)]),
      pay_period: new FormControl("Daily", [Validators.required])

    })

  }

  saveEmployee() {
    let employee = {};

    employee = {
      active: true,
      dob: moment(this.addEmployeeForm.controls.dob.value, "YYYY-MM-DD").format("MM-DD-YYYY"),
      hired_date: moment(this.addEmployeeForm.controls.hired_on.value, "YYYY-MM-DD").format("MM-DD-YYYY"),
      id: uuidv4(),
      name: this.addEmployeeForm.controls.name.value,
      salary: { 
        time_interval: this.addEmployeeForm.controls.pay_period.value, 
        unit: this.addEmployeeForm.controls.salary.value
      },
      title: this.addEmployeeForm.controls.position.value
    }

    // this.newEmployees.push(employee);


    this.employeeList.push(employee);


    // this.employeeListUpdated = true;
    
    // this.toggleEODModal();

    Object.keys(this.addEmployeeForm.controls).forEach(key => {
      this.addEmployeeForm.get(key).markAsUntouched();
      this.addEmployeeForm.get(key).markAsPristine();
    })

    this.addEmployeeForm.reset();


  }

  startClarity() {
    this.updatingEmployeeList = true;
    // this.newEmployees
    this.dwService.modifiyEmployeeList(this.employeeList);

  }

}
