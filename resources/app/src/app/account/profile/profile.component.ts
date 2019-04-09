import { Component, OnInit } from '@angular/core';
import { DataloadService } from "../../services/dataload.service";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
var moment = require('moment');
import { DatawriteService } from "../../services/datawrite.service";
import { DatasaveService } from "../../services/datasave.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo;
  businessInfo;
  personalInformationForm;
  businessInformationForm;

  loadingUserEntry;
  loadingBusinessEntry;

  constructor(private dsService: DatasaveService, private dwService: DatawriteService, private dlService: DataloadService, private fb: FormBuilder) {
    dsService.myBool2$.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      if (newBool) {
        this.loadingBusinessEntry = false;
        this.sendBusinessMessage();  
        this.resetBusinessInformationForm();
        this.dwService.log(this.dwService.writeLog("EDIT", "BUSINESS"), this.dlService.getLogs())

      }
      // this.loadingUserEntry = false;
      // this.sendUserMessage();
      // this.currentBool = newBool;
     });

     dsService.myBool3$.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      if (newBool) {
        this.loadingUserEntry = false;
        this.sendUserMessage();
        this.resetPersonalInformationForm();
        this.dwService.log(this.dwService.writeLog("EDIT", "PERSONAL"), this.dlService.getLogs())

      }
      // this.currentBool = newBool;
     });

   }

  ngOnInit() {
    this.businessInfo = this.dlService.getBusinessInformation();
    this.userInfo = this.dlService.getUserInformation();

    console.log(this.businessInfo);

    this.personalInformationForm = this.fb.group({
      first_name: new FormControl(this.userInfo.first_name === "" ? null : this.userInfo.first_name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl(this.userInfo.last_name === "" ? null : this.userInfo.last_name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      date_of_birth: new FormControl(moment(this.userInfo.DOB, "MM-DD-YYYY").format('YYYY-MM-DD') === "" ? null : moment(this.userInfo.DOB, "MM-DD-YYYY").format('YYYY-MM-DD'), [
        Validators.required
      ]),
      email: new FormControl(this.userInfo.email === "" ? null : this.userInfo.email, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ])
    });

    this.businessInformationForm = this.fb.group({
      business_name: new FormControl(this.businessInfo.name === "" ? null : this.businessInfo.name, [
        Validators.required
      ]),
      business_region: new FormControl(this.businessInfo.location_region === "" ? null : this.businessInfo.location_region, [
        Validators.required
      ]),
      business_city: new FormControl(this.businessInfo.location_city === "" ? null : this.businessInfo.location_city, [
        Validators.required
      ]),
      year_established: new FormControl(moment(this.businessInfo.est, "MM-DD-YYYY").format('YYYY-MM-DD') === "" ? null : moment(this.businessInfo.est, "MM-DD-YYYY").format('YYYY-MM-DD'), [
        Validators.required
      ])
    })

    //console.log.log(this.businessInfo);
    //console.log(this.userInfo);
    
    //yy-mm-dd
  }

  resetBusinessInformationForm() {
    Object.keys(this.businessInformationForm.controls).forEach(key => {
      this.businessInformationForm.get(key).markAsUntouched();
      this.businessInformationForm.get(key).markAsPristine();
    })

  }

  resetPersonalInformationForm() {
    Object.keys(this.personalInformationForm.controls).forEach(key => {
      this.personalInformationForm.get(key).markAsUntouched();
      this.personalInformationForm.get(key).markAsPristine();
    })

  }

  sendUserMessage() {
    this.dsService.setUserModified();
  }

  sendBusinessMessage() {
    this.dsService.setBusinessModified();
  }

  allowPersonalSubmit() {
    return this.personalInformationForm.valid && this.personalInformationForm.dirty && this.personalInformationForm.touched
  }

  allowBusinessSubmit() {
    return this.businessInformationForm.valid && this.businessInformationForm.dirty && this.businessInformationForm.touched
  }

  setPersonalData() {

    this.loadingUserEntry = true;

    let data = {
      "id": this.userInfo.id,
      "first_name": this.personalInformationForm.controls.first_name.value,
      "last_name": this.personalInformationForm.controls.last_name.value,
      "email": this.personalInformationForm.controls.email.value,
      "DOB": moment(this.personalInformationForm.controls.date_of_birth.value, "YYYY-MM-DD").format("MM-DD-YYYY")
    }

    this.dwService.modifyUserData(data);
    // this.userInfo = this.dlService.getUserInformation();
  }

  setBusinessData() {

    this.loadingBusinessEntry = true;

    //console.log(this.businessInformationForm);

    let data = {
      "name": this.businessInformationForm.controls.business_name.value,
      "location_city": this.businessInformationForm.controls.business_region.value,
      "location_region": this.businessInformationForm.controls.business_city.value,
      "est": moment(this.businessInformationForm.controls.year_established.value, "YYYY-MM-DD").format("MM-DD-YYYY")
    }

    //console.log(data);

    this.dwService.modifyBusinessData(data);
    // this.businessInfo = this.dlService.getBusinessInformation();

  }

  // resetData(){
  //   this.businessInfo = this.dlService.getBusinessInformation();
  //   this.userInfo = this.dlService.getUserInformation();

  //   //console.log.log("works");
  // }

}
