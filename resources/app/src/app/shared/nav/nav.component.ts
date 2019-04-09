import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';

// import { NotificationsService } from "../../services/jsonhelper/notifications.service";
import { DataloadService } from "../../services/dataload.service";
import { DatasaveService } from "../../services/datasave.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  hasAccountNotifications;
  hasLogsNotifications;

  userSubsription;

  userNotifications;
  businessNotifications;
  accountNotifications;

  logNotifications;

  loaded;

  userData;
  businessData;


  constructor(private dlService: DataloadService, private dsService: DatasaveService) {
    this.dsService.myBool7$.subscribe((val) => {
      if (val === true) {
        this.logNotifications = true;
      }
    })
    this.userNotifications = false;
    this.businessNotifications = false;
    this.accountNotifications = false;
    this.hasLogsNotifications = false;
    this.logNotifications = false;
  
    // dlService.someObservable.subscribe(value => this.doSomething(value));
  }

  ngOnInit() {
    // this.loaded = false;
    // this.hasAccountNotifications = this.run();
  }




  reCheckNotifications(message?) {
    if (message) {
      this.logNotifications = false;
    } else {
      this.hasAccountNotifications = this.getAccountNotifications();
    }
  }

  getAccountNotifications() {

    //console.log("hereeeeee");

    let x = this.getUserNotifications();

    let y = this.getBusinessNotifications();

    let z = this.getUserAccountSubNotifications();

    //console.log(x);

    //console.log(y);

    if (x || y ) {
      return true
    } else {
      return false
    }

  }

  getUserAccountSubNotifications() {
    let notification = false;

    console.log(this.dlService.getUserSubscription())
    // if (this.dlService.getUserSubscription)
  }

  getUserNotifications() {

    let notification = false;
    //console.log(notification);


    this.userNotifications = false;
    //console.log(this.userNotifications);


    let userData = this.dlService.getUserInformation();
    // let notifications = false;

    //console.log(userData);

    if (userData) {
      Object.keys(userData).forEach(function (key, index) {
        //console.log(userData[key]);
        //console.log(userData[key] === "" || userData[key] === null || userData[key] === undefined);
        if (userData[key] === "" || userData[key] === null || userData[key] === undefined) {
          notification = true;
          //console.log(notification);
          //console.log("in here");
          //console.log(this.userNotifications);
          // this.userNotifications = true;
        }
      });
    }

    this.userNotifications = notification;


    return this.userNotifications;

  }

  getBusinessNotifications() {

    let notification = false;

    let businessData = this.dlService.getBusinessInformation();

    this.businessNotifications = false;

    //console.log(userData);


    if (businessData) {
      Object.keys(businessData).forEach(function (key, index) {
        if (businessData[key] === "" || businessData[key] === null || businessData[key] === undefined) {
          notification = true;
        }
      });
    }

    this.businessNotifications = notification;


    return this.businessNotifications;

  }



}
