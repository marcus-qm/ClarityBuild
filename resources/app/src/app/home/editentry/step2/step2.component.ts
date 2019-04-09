import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DataloadService } from "../../../services/dataload.service";

@Component({
  selector: 'app-editstep2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2EditComponent implements OnInit {

  @Input() data;
  @Input() entrydate;

  @Output() messageEvent4 = new EventEmitter();


  add;
  edit;

  addFormIncome;
  addFormExpenses;

  editFormIncome;
  editFormExpenses;

  incomePresetsExist;
  expensePresetsExist;

  add_income_preset_labels;
  add_expense_preset_labels;

  edit_income_preset_labels;
  edit_expense_preset_labels;

  incomesAddJSON;
  expensesAddJSON;

  
  incomesEditJSON;
  expensesEditJSON;

  eodSubmitJSON;

  constructor(private fb: FormBuilder, private dlService: DataloadService) {

  }

  ngOnInit() {
    this.eodSubmitJSON = {
      [ this.entrydate ]: {
        "income" : {

        },
        "expenses": {

        }
      }
    }; 

    this.add = false;
    this.edit = false;

    this.addFormIncome = this.fb.group({

    })

    this.addFormExpenses = this.fb.group({

    })

    this.editFormIncome = this.fb.group({

    })

    this.editFormExpenses = this.fb.group({

    })


    this.addOrEdit(this.data);

    console.log(this.data);
  }

  addOrEdit(data) {
    console.log(data.length)
    if (data.length === 0) {
      console.log("eherer")
      this.add = true;
      this.runAdd();
    } else {
      console.log("ehereeeeeeeeer")

      this.edit = true;
      this.runEdit(data);
    }
  }

  runEdit(data) {
    this.edit_expense_preset_labels = [];
    this.edit_income_preset_labels = [];
    console.log(data);


    this.data['income'].forEach((label, index) => {
      //console.log.log(label);
      //fix for multiple incomes entered
      this.edit_income_preset_labels.push(label);
      this.editFormIncome.addControl(label.label, new FormControl(label.value, Validators.required))
    })

    this.data['expenses'].forEach((label, index) => {
      //console.log.log(label);
      //fix for multiple incomes entered
      this.edit_expense_preset_labels.push(label);

      this.editFormExpenses.addControl(label.label, new FormControl(label.value, Validators.required))
    })


    console.log(this.add);

    console.log(this.edit);

    console.log(this.edit_income_preset_labels);
    console.log(this.edit_expense_preset_labels);
        console.log(this.editFormExpenses);
            console.log(this.editFormIncome);


  }

  runAdd() {
    console.log("this")
    this.incomePresetsExist = this.dlService.incomePresetsExist();
    this.expensePresetsExist = this.dlService.expensePresetsExist();
    console.log(this.incomePresetsExist);

    if (this.incomePresetsExist && this.expensePresetsExist) {
      this.generateIncomePresetForm();
      this.generateExpensePresetForm();



      this.add_income_preset_labels.forEach((label, index) => {
        //console.log.log(label);
        //fix for multiple incomes entered
        this.addFormIncome.addControl(label.label, new FormControl(null, Validators.required))
      })

      this.add_expense_preset_labels.forEach((label, index) => {
        //console.log.log(label);
        //fix for multiple incomes entered
        this.addFormExpenses.addControl(label.label, new FormControl(null, Validators.required))
      })

      // console.log(this.addForm);
      // console.log(this.preset_labels);

    } else {
      this.setupNewForm();
    }



  }

  setupNewForm() {
    this.add_income_preset_labels = [];
    this.add_expense_preset_labels = [];

  }

  allowOverviewForAdd() {
    if (this.addFormIncome.valid && this.addFormExpenses.valid) {
      return true
    } else {
      return false
    }
  }

  allowOverviewForEdit() {
    if ((this.editFormIncome.valid && this.editFormIncome.touched && this.editFormIncome.dirty) || (this.editFormExpenses.valid && this.editFormExpenses.touched && this.editFormExpenses.dirty )) {
      return true
    } else {
      return false
    }
  }

  packageEditIncomes() {
    this.incomesEditJSON = [];
    Object.keys(this.editFormIncome.controls).forEach(key => {
      ////console.log.log(this.incomeForm.controls[key]);
      this.incomesEditJSON.push({
        'label': key,
        'value': this.editFormIncome.controls[key].value
      })
    });

  }

  packageEditExpenses() {
    this.expensesEditJSON = [];
    //console.log((this.expenseForm))
      Object.keys(this.editFormExpenses.controls).forEach(key => {
        this.expensesEditJSON.push({
          'label': key,
          'value': this.editFormExpenses.controls[key].value
        })
      });

  }

  packageAddIncomes() {
    this.incomesAddJSON = [];
    Object.keys(this.addFormIncome.controls).forEach(key => {
      ////console.log.log(this.incomeForm.controls[key]);
      this.incomesAddJSON.push({
        'label': key,
        'value': this.addFormIncome.controls[key].value
      })
    });

  }

  packageAddExpenses() {
    this.expensesAddJSON = [];
    //console.log((this.expenseForm))
      Object.keys(this.addFormExpenses.controls).forEach(key => {
        this.expensesAddJSON.push({
          'label': key,
          'value': this.addFormExpenses.controls[key].value
        })
      });

  }

  moveToOverview() {

    if (this.add) {
      this.packageAddExpenses();
      this.packageAddIncomes();
      this.eodSubmitJSON[`${this.entrydate}`].income = this.incomesAddJSON;
      this.eodSubmitJSON[`${this.entrydate}`].expenses = this.expensesAddJSON;

      this.messageEvent4.emit({"data": this.eodSubmitJSON, "step": 2, "date": this.entrydate});
      console.log(this.eodSubmitJSON);
    } else {
      this.packageEditExpenses();
      this.packageEditIncomes();
      this.eodSubmitJSON[`${this.entrydate}`].income = this.incomesEditJSON;
      this.eodSubmitJSON[`${this.entrydate}`].expenses = this.expensesEditJSON;

      this.messageEvent4.emit({"data": this.eodSubmitJSON, "step": 2, "date": this.entrydate});
      console.log(this.eodSubmitJSON);
    }
  }

  generateIncomePresetForm() {
    let labels = this.dlService.getIncomePresetLabels();
    //console.log.log(labels);

    this.add_income_preset_labels = labels.filter(label => label.value === true)

    // this.preset_labels = this.dlService.getIncomePresetLabels();

    //console.log.log(this.preset_labels);
  }

  generateExpensePresetForm() {
    let labels = this.dlService.getExpensePresetLabels();
    //console.log.log(labels);

    this.add_expense_preset_labels = labels.filter(label => label.value === true)
  }



}
