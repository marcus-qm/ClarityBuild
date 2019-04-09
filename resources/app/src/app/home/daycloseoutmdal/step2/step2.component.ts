import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DataloadService } from "../../../services/dataload.service";


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  expensePresetsExist: boolean;
  preset_labels;
  expensesJSON;

  expenseForm: FormGroup;

  @Output() messageEvent2 = new EventEmitter();
  @Input() expense;

  constructor(private dlService: DataloadService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.expensePresetsExist = this.dlService.expensePresetsExist();
    if (this.expensePresetsExist) {
      this.generatePresetForm();

      this.expenseForm = this.fb.group({

      });

      //save data on back press
      ////console.log.log(this.expense);
      this.preset_labels.forEach((label, index) => {
        //console.log.log(label);
        this.expenseForm.addControl(label.label, new FormControl(this.expense === undefined ? 0 : this.expense[index].value, Validators.required))
      })

    } else {
      this.setupNewForm();
    }
  }

  goToSummary() {
    this.packageExpensesJSON();
    ////console.log.log(this.expensesJSON);
    this.messageEvent2.emit(this.expensesJSON);
  }

  packageExpensesJSON() {
    this.expensesJSON = [];
    //console.log((this.expenseForm))
    if (this.expenseForm !== undefined) {
      Object.keys(this.expenseForm.controls).forEach(key => {
        this.expensesJSON.push({
          'label': key,
          'value': this.expenseForm.controls[key].value
        })
      });
    } else {
      // this.expensesJSON.push()
    }
  }


  generatePresetForm() {
    let labels = this.dlService.getExpensePresetLabels();
    //console.log(labels);

    this.preset_labels = labels.filter(label => label.value === true)

    //console.log(this.preset_labels);
  }

  setupNewForm() {
    this.preset_labels = [];

  }

}
