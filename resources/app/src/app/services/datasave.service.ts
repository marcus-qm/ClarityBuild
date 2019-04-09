import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { IpcRenderer } from "electron";
import { ElectronService } from 'ngx-electron';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatasaveService {
  incomeDefaultsSet;
  expenseDefaultsSet;
  entrySaved;

  myBool$: Observable<boolean>;
  myBool2$: Observable<boolean>;
  myBool3$: Observable<boolean>;
  myBool4$: Observable<boolean>;
  myBool5$: Observable<boolean>;
  myBool6$: Observable<boolean>;
  myBool7$: Observable<boolean>;






  private boolSubject: Subject<boolean>;
  private boolSubject2: Subject<boolean>;
  private boolSubject3: Subject<boolean>;
  private boolSubject4: Subject<boolean>;
  private boolSubject5: Subject<boolean>;
  private boolSubject6: Subject<boolean>;
  private boolSubject7: Subject<boolean>;

  




  constructor(private _electronService: ElectronService, private _ngZone: NgZone) {
    this.incomeDefaultsSet = false;
    this.expenseDefaultsSet = false;
    this.entrySaved = false;

    this.boolSubject = new Subject<boolean>();
    this.boolSubject2 = new Subject<boolean>();
    this.boolSubject3 = new Subject<boolean>();
    this.boolSubject4 = new Subject<boolean>();
    this.boolSubject5 = new Subject<boolean>();
    this.boolSubject6 = new Subject<boolean>();
    this.boolSubject7 = new Subject<boolean>();





    this.myBool$ = this.boolSubject.asObservable();
    this.myBool2$ = this.boolSubject2.asObservable();
    this.myBool3$ = this.boolSubject3.asObservable();
    this.myBool4$ = this.boolSubject4.asObservable();
    this.myBool5$ = this.boolSubject4.asObservable();


    this.myBool6$ = this.boolSubject6.asObservable();
    this.myBool7$ = this.boolSubject7.asObservable();





    this._electronService.ipcRenderer.on('incomeDefaultsSet', (event, arg) => {
      this._ngZone.run(() => {
        //console.log.log(arg);
        this.incomeDefaultsSet = arg;
      });
    });

    this._electronService.ipcRenderer.on('expenseDefaultsSet', (event, arg) => {
      this._ngZone.run(() => {
        //console.log.log(arg);
        this.expenseDefaultsSet = arg;
      });
    });


    this._electronService.ipcRenderer.on('entrySaved', (event, arg) => {
      this._ngZone.run(() => {
        //console.log.log(arg);
        this.entrySaved = arg;
        this.boolSubject.next(arg)
      });
    });

    this._electronService.ipcRenderer.on('businessDataModified', (event, arg) => {
      this._ngZone.run(() => {
        //console.log.log(arg);
        // this.entrySaved = arg;
        this.boolSubject2.next(arg)
      });
    });

    this._electronService.ipcRenderer.on('userDataModified', (event, arg) => {
      this._ngZone.run(() => {
        //console.log.log(arg);
        // this.entrySaved = arg;
        this.boolSubject3.next(arg)
      });
    });

    this._electronService.ipcRenderer.on('employeeListModified', (event, arg) => {
      this._ngZone.run(() => {
        //console.log.log(arg);
        // this.entrySaved = arg;
        this.boolSubject4.next(arg)
      });
    });

    this._electronService.ipcRenderer.on('accountIDSet', (event, arg) => {
      this._ngZone.run(() => {
        //console.log.log(arg);
        // this.entrySaved = arg;
        this.boolSubject5.next(arg)
      });
    });

    this._electronService.ipcRenderer.on('inventoryDataSet', (event, arg) => {
      this._ngZone.run(() => {
        //console.log.log(arg);
        // this.entrySaved = arg;
        this.boolSubject6.next(arg)
      });
    });

    this._electronService.ipcRenderer.on('logSet', (event, arg) => {
      this._ngZone.run(() => {
        //console.log.log(arg);
        // this.entrySaved = arg;
        console.log("Captured Log Save")
        this.boolSubject7.next(arg)
      });
    });
  }

  getExpenseDefaultsSet() {
    return this.expenseDefaultsSet;
  }

  setExpenseDefaultsValue() {
    this.expenseDefaultsSet = false;
  }

  getIncomeDefaultsSet() {
    return this.incomeDefaultsSet;
  }

  getEntrySave() {
    return this.entrySaved;
  }

  setEntrySave() {
    this.entrySaved = false;
  }

  setIncomeDefaultsValue() {
    this.incomeDefaultsSet = false;
  }

  setUserModified() {
    // this.boolSubject3.unsubscribe();
    // this.boolSubject3.next(false);
  }

  setBusinessModified() {
    // this.boolSubject2.unsubscribe();

    // this.boolSubject2.next(false);
  }


}
