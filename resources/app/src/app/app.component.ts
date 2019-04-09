import { Component, OnInit } from '@angular/core';
// import { NavComponent } from '../app/shared/nav/nav.component';
import { DataloadService } from "../app/services/dataload.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  show;

  setup;

  first_time;

  setupDone;


  constructor(private dlService: DataloadService) {
    this.first_time = false;
    this.setup = false;
    this.setupDone = false;
    dlService.isMasterSet.subscribe((newBool: boolean) => {
      if (newBool) {
        this.show = true;
        let userInfo = this.dlService.getUserInformation();
        if (userInfo !== undefined && userInfo.first_login === true) {
          // console.log("gyhujiko");
          this.setup = true;
        } else {
          this.setupDone = true;
        }
      }
    });

  }

  ngOnInit() {

  }

  receiveMessage(event) {
    this.setupDone = true
  }
}
