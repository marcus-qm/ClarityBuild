import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataloadService } from "../../services/dataload.service";
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
var moment = require('moment');
import { DatawriteService } from "../../services/datawrite.service";
import { DatasaveService } from "../../services/datasave.service";


@Component({
  selector: 'setup-defaults',
  templateUrl: './defaults.component.html',
  styleUrls: ['./defaults.component.css']
})
export class SetupDefaultsComponent implements OnInit {

  constructor(private dsService: DatasaveService, private fb: FormBuilder, private dlService: DataloadService, private dwService: DatawriteService) {  }
    expenseLabels;
    incomeLabels;
  
    loadingIncome;
    loadingExpense;
  
    expensePresetForm;
    incomePresetForm;
  
    expenseAddPresetForm;
    incomeAddPresetForm;
  
    incomeAddPresetFormListAdded;
    incomeAddPresetFormListRemoved;
  
    expenseAddPresetFormListAdded;
    expenseAddPresetFormListRemoved;

    @Output() defaultsSetMessage = new EventEmitter();


    moveToInventory;
  
    ngOnInit() {
      this.loadingIncome = false;
      this.loadingExpense = false;
      this.moveToInventory = false;
  
      this.expenseLabels = [];
      this.incomeLabels = [];
  
      //console.log.log(this.expenseLabels);
      //console.log.log(this.incomeLabels);
  
      this.expensePresetForm = this.fb.group({
  
      });
  
      this.incomePresetForm = this.fb.group({
  
      });
  
      this.expenseAddPresetForm = this.fb.group({
        expenseAdd: new FormControl(null, [
          Validators.required
        ])
      })
  
      this.incomeAddPresetForm = this.fb.group({
        incomeAdd: new FormControl(null, [
          Validators.required
        ])
      })
  
      this.populateExpenseForm();
  
      this.populateIncomeForm();
  
      //console.log.log(this.expensePresetForm);
  
      //console.log.log(this.incomePresetForm);
  
    }
  
    populateExpenseForm() {
      //console.log.log(this.expenseLabels)
  
      this.expensePresetForm = this.fb.group({
  
      });
  
      this.expenseLabels.forEach(label => {
        //console.log(label)
        this.expensePresetForm.addControl(label.label, new FormControl(label.value))
      });
    }
  
    populateIncomeForm() {
      this.incomePresetForm = this.fb.group({
  
      });
  
      this.incomeLabels.forEach(label => {
        //console.log.log(label)
        this.incomePresetForm.addControl(label.label, new FormControl(label.value))
      });
  
    }

    allowMoveToInventory() {
      if (this.allowExpensePresetSubmit && this.allowIncomePresetSubmit) {
        return true 
      } else {
        return false
      }
    }
  
    allowIncomePresetSubmit() {
      return ((this.incomePresetForm.dirty && this.incomePresetForm.touched) || (this.incomeAddPresetFormListAdded || this.incomeAddPresetFormListRemoved)) 
    }
  
    allowExpensePresetSubmit() {
      return ((this.expensePresetForm.dirty && this.expensePresetForm.touched) || (this.expenseAddPresetFormListAdded || this.expenseAddPresetFormListRemoved))
    }
  
    getControlName(c: AbstractControl): string | null {
      const formGroup = c.parent.controls;
      return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }
  
    addIncomeDefault() {
      let entry = {
        "label": this.incomeAddPresetForm.controls.incomeAdd.value,
        "value": true
      }
      
      this.incomeLabels.push(entry);
  
      this.incomeAddPresetFormListAdded = true;
  
      this.incomeAddPresetForm.controls.incomeAdd.setValue(null);
  
      this.populateIncomeForm();
  
    } 
  
    deleteExpenseLabel(label){
      let _expenseLabel;
      
      _expenseLabel = this.expenseLabels.filter(expenseLabel => {
        return expenseLabel.label !== label 
      })
  
      this.expenseLabels = _expenseLabel;
  
  
      this.expenseAddPresetFormListRemoved = true;
  
      this.populateExpenseForm();
  
      this.expensePresetForm.markAsTouched();
  
      this.expensePresetForm.markAsDirty();
  
    }
  
    deleteIncomeLabel(label){
      let _incomeLabel;
      
      _incomeLabel = this.incomeLabels.filter(incomeLabel => {
        return incomeLabel.label !== label 
      })
  
      this.incomeLabels = _incomeLabel;
  
      this.incomeAddPresetFormListRemoved = true;
  
      this.populateIncomeForm();
      
      this.incomePresetForm.markAsTouched();
  
      this.incomePresetForm.markAsDirty();
    
    }
  
    addExpenseDefault() {
      let entry = {
        "label": this.expenseAddPresetForm.controls.expenseAdd.value,
        "value": true
      }
  
      this.expenseLabels.push(entry);
  
      this.expenseAddPresetForm.controls.expenseAdd.setValue(null);
  
      this.expenseAddPresetFormListAdded = true;
  
      this.populateExpenseForm();
  
    }
  
    allowAddExpensePresetSubmit() {
     return this.expenseAddPresetForm.dirty && this.expenseAddPresetForm.touched && this.expenseAddPresetForm.valid
    }
    
    allowAddIncomePresetSubmit() {
      return this.incomeAddPresetForm.dirty && this.incomeAddPresetForm.touched && this.incomeAddPresetForm.valid
    }
  
    setExpenseDefaults() {
      this.loadingExpense = true;
  
      let data = [];
  
      Object.keys(this.expensePresetForm.controls).forEach(key => {
  
        data.push({
          "label": this.getControlName(this.expensePresetForm.get(key)),
          "value": this.expensePresetForm.get(key).value
        })
      });
  
      //console.log.log(data);
  
      this.dwService.setExpenseDefaults(data);
  
      this.checkExpenseFlag()
  
      this.expenseAddPresetFormListAdded = false;
      this.expenseAddPresetFormListRemoved = false;

      this.moveToInventory = true;
  
    }
  
    setIncomeDefaults() {
      this.loadingIncome = true;
      let data = [];
  
      Object.keys(this.incomePresetForm.controls).forEach(key => {
  
        data.push({
          "label": this.getControlName(this.incomePresetForm.get(key)),
          "value": this.incomePresetForm.get(key).value
        })
      });
  
      this.dwService.setIncomeDefaults(data);
  
      //console.log.log(this.dsService.getIncomeDefaultsSet())
  
  
      this.checkIncomeFlag()
  
      this.incomeAddPresetFormListAdded = false;
      this.incomeAddPresetFormListRemoved = false;

      this.moveToInventory = true;
  
    }
  
    clearIncomeForm() {
      Object.keys(this.incomePresetForm.controls).forEach(key => {
        this.incomePresetForm.get(key).markAsUntouched();
        this.incomePresetForm.get(key).markAsPristine();
      })
    }
  
    clearExpenseForm() {
      Object.keys(this.expensePresetForm.controls).forEach(key => {
        this.expensePresetForm.get(key).markAsUntouched();
        this.expensePresetForm.get(key).markAsPristine();
      })
    }
  
    checkExpenseFlag() {
      let x = this.dsService.getExpenseDefaultsSet();
      //console.log.log(x)
      if (!x) {
        //console.log.log("ok init ")
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.checkExpenseFlag();
        }, 1000);
        // window.setTimeout(this.checkFlag(), 100); /* this checks the flag every 100 milliseconds*/
      }
      else {
        this.loadingExpense = false;
        this.clearExpenseForm();
        this.dsService.setExpenseDefaultsValue();
      }
    }
  
  
    checkIncomeFlag() {
      let x = this.dsService.getIncomeDefaultsSet();
      //console.log.log(x)
      if (!x) {
        //console.log.log("ok init ")
  
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.checkIncomeFlag();
        }, 1000);
        // window.setTimeout(this.checkFlag(), 100); /* this checks the flag every 100 milliseconds*/
      }
      else {
        this.loadingIncome = false;
        this.clearIncomeForm();
        this.dsService.setIncomeDefaultsValue();
      }
    }
  

    goToInventory() {
      this.defaultsSetMessage.emit("Defaults Set");
      this.dwService.log(this.dwService.writeLog("ADD", "DEFAULTS"), this.dlService.getLogs())
    }
  
  }