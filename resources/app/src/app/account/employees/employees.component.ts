import { Component, OnInit } from '@angular/core';
import { DataloadService } from "../../services/dataload.service";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { DatasaveService } from "../../services/datasave.service";
import { DatawriteService } from "../../services/datawrite.service";
var moment = require('moment');
const uuidv4 = require('uuid/v4');


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employeeList;

  masterEmployeeList;

  showEODModal;
  showEODModal2;
  showEODModal3;

  addEmployeeForm;
  editEmployeeForm: FormGroup;

  searchingForEmployee;

  employeeListUpdated;

  newEmployees;

  updatingEmployees;


  constructor(private dsService: DatasaveService, private dwService: DatawriteService, private fb: FormBuilder, private dlService: DataloadService) {
    dsService.myBool4$.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      if (newBool) {
        this.updatingEmployees = false;
        this.employeeList = this.dlService.getUserEmployees();
        // this.sendBusinessMessage();  
        // this.resetBusinessInformationForm();
      }
   })
  }

  ngOnInit() {
    this.newEmployees = [];
    this.searchingForEmployee = false;
    this.employeeListUpdated = false;
    this.showEODModal = false;
    this.masterEmployeeList = this.dlService.getUserEmployees();
    this.employeeList = this.masterEmployeeList;

    this.addEmployeeForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      position: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      dob: new FormControl(null, [Validators.required]),
      hired_on: new FormControl(moment().format("YYYY-MM-DD"), [Validators.required]),
      salary: new FormControl(0, [Validators.required, Validators.minLength(0), Validators.min(0)]),
      pay_period: new FormControl("Daily", [Validators.required])

    })

    this.editEmployeeForm = this.fb.group({
      id: new FormControl(),
      name:  new FormControl ("", [Validators.required, Validators.minLength(1)]),
      position: new FormControl ("", [Validators.required, Validators.minLength(1)]),
      dob: new FormControl (null, [Validators.required]),
      hired_on: new FormControl (null, [Validators.required]),
      salary: new FormControl (null, [Validators.required, Validators.minLength(0), Validators.min(0)]),
      pay_period: new FormControl ("Daily", [Validators.required])

    })

    this.employeeList.forEach((employee) => {
      // console.log(employee.dob)
      let dob = moment(employee.dob, "MM-DD-YYYY")
      // console.log(dob)
      employee.age = moment().diff(dob, 'years' ,false);
      // console.log(employee.age)
    })


    // console.log(this.employeeList);

  }

  updateEmployeeDetails() {

    this.removeEmployee(this.editEmployeeForm.controls.id.value);

    let employee = {};

    employee = {
      active: true,
      dob: moment(this.editEmployeeForm.controls.dob.value, "YYYY-MM-DD").format("MM-DD-YYYY"),
      hired_date: moment(this.editEmployeeForm.controls.hired_on.value, "YYYY-MM-DD").format("MM-DD-YYYY"),
      id: this.editEmployeeForm.controls.id.value,
      name: this.editEmployeeForm.controls.name.value,
      salary: { 
        time_interval: this.editEmployeeForm.controls.pay_period.value, 
        unit: this.editEmployeeForm.controls.salary.value
      },
      title: this.editEmployeeForm.controls.position.value
    }

    // this.newEmployees.push(employee);


    this.employeeList.push(employee);

    
    this.employeeList.forEach((employee) => {
      // console.log(employee.dob)
      let dob = moment(employee.dob, "MM-DD-YYYY")
      // console.log(dob)
      employee.age = moment().diff(dob, 'years' ,false);
      // console.log(employee.age)
    })

    this.employeeListUpdated = true;
    
    this.toggleEODModal3();

    this.editEmployeeForm.reset();

  }

  updateEmployee(id) {

    this.toggleEODModal3();

    let key = [];
    this.employeeList.filter((employee) => {
      if (employee.id === id) {
        key.push(employee);
        // employee = key;
      }
    })

    console.log(key)

    // let nameControl: FormControl = new FormControl (key[0].name, [Validators.required, Validators.minLength(1)]);
    // let positionControl: FormControl = new FormControl (key[0].position, [Validators.required, Validators.minLength(1)]);
    // let dobControl: FormControl = new FormControl (key[0].dob, [Validators.required]);
    // let hired_onControl: FormControl = new FormControl (moment(key[0].hired_on, "MM-DD-YYYY").format("YYYY-MM-DD"), [Validators.required]);
    // let salaryControl: FormControl = new FormControl (key[0].salary, [Validators.required, Validators.minLength(0), Validators.min(0)]);
    // let pay_periodControl: FormControl = new FormControl (key[0].pay_period, [Validators.required]);

    this.editEmployeeForm.controls.id.setValue(id)
    this.editEmployeeForm.controls.name.setValue(key[0].name)
    this.editEmployeeForm.controls.position.setValue(key[0].title)
    this.editEmployeeForm.controls.dob.setValue(moment(key[0].dob, "MM-DD-YYYY").format("YYYY-MM-DD"))
    this.editEmployeeForm.controls.hired_on.setValue(moment(key[0].hired_date, "MM-DD-YYYY").format("YYYY-MM-DD"))
    this.editEmployeeForm.controls.salary.setValue(key[0].salary.unit)
    this.editEmployeeForm.controls.pay_period.setValue(key[0].salary.time_interval)
    //console.log.log(id);
  }

  addEmployee() {
    this.showEODModal = true;

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

    
    this.employeeList.forEach((employee) => {
      // console.log(employee.dob)
      let dob = moment(employee.dob, "MM-DD-YYYY")
      // console.log(dob)
      employee.age = moment().diff(dob, 'years' ,false);
      // console.log(employee.age)
    })

    this.employeeListUpdated = true;
    
    this.toggleEODModal();

    this.addEmployeeForm.reset();

  }

  toggleEODModal() {
    this.showEODModal = !this.showEODModal
  }

  toggleEODModal2() {
    this.showEODModal2 = !this.showEODModal2
  }

  toggleEODModal3() {
    this.showEODModal3 = !this.showEODModal3
  }

  removeEmployee(id) {
    let newList = [];
    this.employeeList.filter((employee) => {
      if (employee.id !== id) {
        newList.push(employee)
      }
      // console.log(employee)
      // console.log(employee.id === id)
      // employee.id !== id
    })

    this.employeeList = newList

    this.employeeListUpdated = true;

    // console.log(newList);
    // return newList;
  }


  allowEmployeeListUpdate() {
    if (this.employeeListUpdated) {
      return true
    } else {
      return false
    }
  }

  updateEmployeeList() {
    console.log(this.employeeList)
    // this.employeeList = [];
    this.updatingEmployees = true;
    // this.newEmployees
    this.dwService.modifiyEmployeeList(this.employeeList);

    this.employeeListUpdated = false;
    this.dwService.log(this.dwService.writeLog("EDIT", "EMPLOYEES", this.employeeList), this.dlService.getLogs())

  }

  findEmployeeMatch(string) {
    let match = [];
    string = string.toLowerCase();
    this.employeeList.forEach(employee => {
      // console.log(employee);
      // console.log(employee.name.includes(string))
      let master = employee.name.toLowerCase();
      if (master.includes(string)) {
        match.push(employee);
      }
    });
    return match;
  }



  searchForEmployee(event) {
    let employeeList = [];
    let employeeMatches;
    if (event.length > 2) {
      this.searchingForEmployee = true;
      employeeMatches = this.findEmployeeMatch(event);
      if (employeeMatches.length > 0) {
        this.employeeList = employeeMatches;
      } else {
        this.employeeList = this.dlService.getUserEmployees();
        this.searchingForEmployee = false;
      }
    } else {
      this.employeeList = this.dlService.getUserEmployees();
      this.searchingForEmployee = false;
    }

    // console.log(employeeMatches)
  }

  // employeeList = this.dlService.getUserEmployees()

}
