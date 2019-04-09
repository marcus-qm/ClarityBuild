import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataloadService } from '../services/dataload.service';
const uuidv4 = require('uuid/v4');
import { DatasaveService } from "../services/datasave.service";
import { DatawriteService } from "../services/datawrite.service";
import { AuthEnforcerService } from "../services/auth-enforcer.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})


export class AccountComponent implements OnInit {
    //refactor to a model, maybe?
    account_id;
    account_firstName;
    account_lastName;
    account_DOB;
    account_email;
    passedvalidation: boolean;
    data: any;
    subnav;

    loadingActivate;

    hideButton;

    currentBool2: boolean;
    currentBool3: boolean;

    accountActive;

    allowActivateProfile;


    constructor(private aeService: AuthEnforcerService, private dwService: DatawriteService, private dsService: DatasaveService, private router: Router, private dlService: DataloadService) {
        dsService.myBool5$.subscribe((newBool: boolean) => {
            this.allowActivateProfile = false;
            this.loadingActivate = false;
            this.accountActive = true;
            this.account_id = this.dlService.getUserID();
        });

    }

    ngOnInit() {
        this.hideButton = false;
        this.accountActive = false;
        this.account_id = this.dlService.getUserID();
        this.account_firstName = this.dlService.getUserFirstName();
        this.account_lastName = this.dlService.getUserLastName();
        this.account_DOB = this.dlService.getUserDOB();
        this.account_email = this.dlService.getUserEmail();
        this.allowActivateProfile = false;
        this.loadingActivate = false;

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.subnav = val.url;
            }
        });

        if (this.account_id.toString() === "") {
            this.allowActivateProfile = true;
            // this.activateProfile();
        } else {
            this.loadingActivate = false;
            this.accountActive = true;
            // this.hideButton = true;
        }

        this.subnav = '/account/profile'

    }
    activateProfile() {
        this.loadingActivate = true;
        let id = uuidv4();
        this.dwService.setAccountID(id);
    }

    rerun() {
        this.account_id = this.dlService.getUserID();
        this.account_firstName = this.dlService.getUserFirstName();
        this.account_lastName = this.dlService.getUserLastName();
        this.account_DOB = this.dlService.getUserDOB();
        this.account_email = this.dlService.getUserEmail();
    }

    tryReadMaster(event) {
        ////console.log.log(event);

        // var file = event.srcElement.files[0];
        // if (file) {
        //   let json;
        //   var reader = new FileReader();
        //   reader.readAsText(file, "UTF-8");
        //   reader.onload = function (evt: Event) {
        //     //perform a shitload of validation.
        //     json = JSON.parse(evt.target.result);
        //     // r        // this.passedvalidation = true;
        //     // runReload(data);
        //     // data = json;
        //   }
        //   // this.passedvalidation = true;
        //   this.dlService.reload(data);

        //   reader.onerror = function (evt) {
        //     ////console.log.log('error reading file');
        //   }
        // }
    }

    runReload(data) {
        this.dlService.reload(data);
    }
}
