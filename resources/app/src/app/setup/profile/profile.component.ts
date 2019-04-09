import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
var moment = require('moment');
import { DatawriteService } from "../../services/datawrite.service";
import { DatasaveService } from "../../services/datasave.service";
import { DataloadService } from "../../services/dataload.service";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
const uuidv4 = require('uuid/v4');


@Component({
  selector: 'setup-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class SetupProfileComponent implements OnInit {
  userInfo;
  businessInfo;
  personalInformationForm;
  businessInformationForm;

  loadingProfileEntry;

  loadingUserEntry;
  loadingBusinessEntry;

  setProfile;
  setBusiness;

  @Output() profileSetMessage = new EventEmitter();


  constructor(private dsService: DatasaveService, private dwService: DatawriteService, private dlService: DataloadService, private fb: FormBuilder) {
    dsService.myBool2$.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      if (newBool) {
        this.setProfile = true;
        this.dwService.log(this.dwService.writeLog("ADD", "PROFILE"), this.dlService.getLogs())
        this.checkForNext();
        // this.loadingBusinessEntry = false;
        // this.sendBusinessMessage();  
        // this.resetBusinessInformationForm();
      }
      // this.loadingUserEntry = false;
      // this.sendUserMessage();
      // this.currentBool = newBool;
     });

     dsService.myBool3$.subscribe((newBool: boolean) => { 
      //console.log.log(newBool);
      if (newBool) {
        this.setBusiness = true;
        this.dwService.log(this.dwService.writeLog("ADD", "BUSINESS"), this.dlService.getLogs())
        this.checkForNext();
        // this.loadingUserEntry = false;
        // this.sendUserMessage();
        // this.resetPersonalInformationForm();
      }
      // this.currentBool = newBool;
     });

   }

  ngOnInit() {

    this.setProfile = false;
    this.setBusiness = false;
    // this.businessInfo = this.dlService.getBusinessInformation();
    // this.userInfo = this.dlService.getUserInformation();

    this.loadingProfileEntry = false;

    // console.log(this.businessInfo);

    this.personalInformationForm = this.fb.group({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      date_of_birth: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ])
    });

    this.businessInformationForm = this.fb.group({
      business_name: new FormControl(null, [
        Validators.required
      ]),
      business_region: new FormControl(null, [
        Validators.required
      ]),
      business_city: new FormControl(null, [
        Validators.required
      ]),
      year_established: new FormControl(null, [
        Validators.required
      ])
    })


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

  checkForNext() {
    console.log(`${this.setBusiness} && ${this.setProfile}`)
    if (this.setBusiness && this.setProfile) {
      this.goToEntryDefaults()
    }
  }

  goToEntryDefaults() {
    this.profileSetMessage.emit("Profile Set");
  }

  sendUserMessage() {
    this.dsService.setUserModified();
  }

  sendBusinessMessage() {
    this.dsService.setBusinessModified();
  }

  setProfileData() {
    this.loadingProfileEntry = true;
    this.setPersonalData();
    this.setBusinessData();
  }

  setPersonalData() {

    // this.loadingUserEntry = true;

    let data = {
      "id": uuidv4(),
      "first_name": this.personalInformationForm.controls.first_name.value,
      "last_name": this.personalInformationForm.controls.last_name.value,
      "email": this.personalInformationForm.controls.email.value,
      "DOB": moment(this.personalInformationForm.controls.date_of_birth.value, "YYYY-MM-DD").format("MM-DD-YYYY")
    }

    this.dwService.modifyUserData(data);
    // this.userInfo = this.dlService.getUserInformation();
  }

  setBusinessData() {

    // this.loadingBusinessEntry = true;

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

  allowProfileSubmission() {
    return this.personalInformationForm.valid && this.personalInformationForm.dirty && this.personalInformationForm.touched && this.businessInformationForm.valid && this.businessInformationForm.dirty && this.businessInformationForm.touched
  }

  // allowPersonalSubmit() {
  //   return this.personalInformationForm.valid && this.personalInformationForm.dirty && this.personalInformationForm.touched
  // }

  // allowBusinessSubmit() {
  //   return this.businessInformationForm.valid && this.businessInformationForm.dirty && this.businessInformationForm.touched
  // }


}
